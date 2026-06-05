import { Jimp, loadFont, measureText, measureTextHeight } from 'jimp';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { pathToFileURL } from 'url';

// Mock fetch to support local files (undici does not implement file: URL scheme)
const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  const urlStr = url.toString();
  if (urlStr.startsWith('file:') || urlStr.includes('file:') || (!urlStr.startsWith('http:') && !urlStr.startsWith('https:'))) {
    let filePath = urlStr;
    const fileIndex = filePath.indexOf('file:');
    if (fileIndex !== -1) {
      filePath = filePath.substring(fileIndex + 5);
    }

    // Find the last drive letter (e.g. C:\) on Windows to clean up nested paths
    const driveMatch = filePath.match(/[a-zA-Z]:[\\\/]/g);
    if (driveMatch) {
      const lastDriveIndex = filePath.lastIndexOf(driveMatch[driveMatch.length - 1]);
      filePath = filePath.substring(lastDriveIndex);
    }

    filePath = decodeURIComponent(filePath);
    const absolutePath = path.resolve(filePath);
    console.log(`[Mock Fetch] Loading local file: ${absolutePath}`);
    const data = await fs.promises.readFile(absolutePath);
    return {
      ok: true,
      status: 200,
      text: async () => data.toString('utf-8'),
      arrayBuffer: async () => {
        const ab = new ArrayBuffer(data.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < data.length; ++i) {
          view[i] = data[i];
        }
        return ab;
      },
      json: async () => JSON.parse(data.toString('utf-8')),
    };
  }
  return originalFetch(url, options);
};

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function main() {
  console.log("Starting image processing...");

  // 1. Process Black Hoodie (Local PNG -> JPG)
  const localBlackPng = "C:\\Users\\nanda\\.gemini\\antigravity-ide\\brain\\dbcd6e84-20cc-412c-a7c9-7f06f3ecefaf\\hoodie_black_zip_1780579109803.png";
  if (fs.existsSync(localBlackPng)) {
    console.log("Found generated black zip hoodie image. Converting to JPG...");
    const image = await Jimp.read(localBlackPng);
    await image.write("src/assets/products/hoodie-1.jpg");
    console.log("Successfully saved hoodie-1.jpg!");
  } else {
    console.error("Local black hoodie image not found!");
  }

  // 2. Download and save Blue Zip Hoodie
  const blueUrl = "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop";
  const tempBlue = "scratch/temp-blue.jpg";
  console.log("Downloading blue zip hoodie...");
  await download(blueUrl, tempBlue);
  const blueImg = await Jimp.read(tempBlue);
  await blueImg.write("src/assets/products/hoodie-2.jpg");
  console.log("Successfully saved hoodie-2.jpg!");
  fs.unlinkSync(tempBlue);

  // 3. Download, tint, and draw NOTHING graphic on Navy Hoodie
  const flatLayUrl = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop";
  const tempFlatLay = "scratch/temp-flatlay.jpg";
  console.log("Downloading flat lay hoodie...");
  await download(flatLayUrl, tempFlatLay);

  const hoodieImg = await Jimp.read(tempFlatLay);

  // Color tint to premium dark navy blue using pixel-level mix
  console.log("Tinting hoodie to dark navy blue via pixel-level loop...");
  const width = hoodieImg.width;
  const height = hoodieImg.height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const color = hoodieImg.getPixelColor(x, y);

      const r = (color >> 24) & 0xff;
      const g = (color >> 16) & 0xff;
      const b = (color >> 8) & 0xff;
      const a = color & 0xff;

      const nr = Math.floor(r * 0.45 + 16 * 0.55);
      const ng = Math.floor(g * 0.45 + 28 * 0.55);
      const nb = Math.floor(b * 0.45 + 51 * 0.55);

      const newColor = ((nr & 0xff) << 24) | ((ng & 0xff) << 16) | ((nb & 0xff) << 8) | (a & 0xff);
      hoodieImg.setPixelColor(newColor, x, y);
    }
  }

  // Now draw the graphic!
  console.log("Drawing NOTHING graphic...");

  const centerX = Math.floor(width / 2);
  const lineThickness = 6;
  const lineStartY = Math.floor(height * 0.32);
  const lineEndY = Math.floor(height * 0.68);

  const whiteColor = 0xffffffff;

  for (let y = lineStartY; y < lineEndY; y++) {
    for (let x = centerX - Math.floor(lineThickness / 2); x < centerX + Math.ceil(lineThickness / 2); x++) {
      hoodieImg.setPixelColor(whiteColor, x, y);
    }
  }

  // Load font locally using pathToFileURL and mock fetch
  const absoluteFontPath = path.resolve("node_modules/@jimp/plugin-print/fonts/open-sans/open-sans-64-white/open-sans-64-white.fnt");
  const fontUrl = pathToFileURL(absoluteFontPath).href;
  console.log(`Loading font from file URL: ${fontUrl}`);
  const font = await loadFont(fontUrl);

  const text = "NOTHING";

  let textWidth = 300;
  let textHeight = 64;
  try {
    textWidth = measureText(font, text) || 300;
    textHeight = font.common && font.common.lineHeight ? font.common.lineHeight : 64;
  } catch (e) {
    console.warn("Could not measure text, using defaults", e);
  }

  const textX = Math.floor((width - textWidth) / 2);
  const textY = Math.floor((lineStartY + lineEndY - textHeight) / 2);

  hoodieImg.print({
    font: font,
    x: textX,
    y: textY,
    text: text
  });

  // Save the resulting image
  await hoodieImg.write("src/assets/products/hoodie-tech-olive.jpg");
  console.log("Successfully saved hoodie-tech-olive.jpg!");
  fs.unlinkSync(tempFlatLay);

  console.log("All images processed successfully!");
}

main().catch(console.error);
