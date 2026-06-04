import tee1 from "@/assets/products/tee-1.jpg";
import tee2 from "@/assets/products/tee-2.jpg";
import hoodie1 from "@/assets/products/hoodie-1.jpg";
import hoodie2 from "@/assets/products/hoodie-2.jpg";
import shoe1 from "@/assets/products/shoe-1.jpg";
import shoe2 from "@/assets/products/shoe-2.jpg";
import watch1 from "@/assets/products/watch-1.jpg";
import watch2 from "@/assets/products/watch-2.jpg";
import teeVideo from "@/assets/products/tee-video.mp4.asset.json";
import hoodieVideo from "@/assets/products/hoodie-video.mp4.asset.json";
import shoeVideo from "@/assets/products/shoe-video.mp4.asset.json";
import watchVideo from "@/assets/products/watch-video.mp4.asset.json";

export type Category = "tees" | "hoodies" | "shoes" | "watches";

export interface ColorVariant {
  name: string;
  swatch: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  color: string;
  price: number;
  category: Category;
  image: string;
  altImage: string;
  video?: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  sizes: string[];
  variants: ColorVariant[];
}

const tshirtSizes = ["XS", "S", "M", "L", "XL"];
const hoodieSizes = ["S", "M", "L", "XL"];
const shoeSizes = ["8", "9", "10", "11", "12"];
const watchSizes = ["One Size"];

export const products: Product[] = [
  // ───────── TEES (10) ─────────
  {
    id: "core-tee-white",
    name: "Core Heavyweight Tee",
    color: "Optic White",
    price: 65,
    category: "tees",
    image: tee1,
    altImage: tee2,
    video: teeVideo.url,
    rating: 5,
    reviews: 124,
    badge: "New",
    description:
      "A 260gsm garment-dyed cotton tee with a relaxed boxy silhouette and reinforced ribbed collar. Cut and sewn in Portugal.",
    sizes: tshirtSizes,
    variants: [
      { name: "Optic White", swatch: "#f5f3ee", image: tee1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee2 },
      { name: "Stone Grey", swatch: "#8a8780", image: tee1 },
    ],
  },
  {
    id: "core-tee-black",
    name: "Core Heavyweight Tee",
    color: "Onyx Black",
    price: 65,
    category: "tees",
    image: tee2,
    altImage: tee1,
    video: teeVideo.url,
    rating: 5,
    reviews: 88,
    description:
      "A 260gsm garment-dyed cotton tee with a relaxed boxy silhouette. The wardrobe foundation in true monochrome black.",
    sizes: tshirtSizes,
    variants: [
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee2 },
      { name: "Optic White", swatch: "#f5f3ee", image: tee1 },
    ],
  },
  {
    id: "pocket-tee-sand",
    name: "Pocket Tee",
    color: "Sand",
    price: 55,
    category: "tees",
    image: tee1,
    altImage: tee2,
    video: teeVideo.url,
    rating: 4,
    reviews: 62,
    description:
      "Lightweight 180gsm jersey with a chest pocket and clean topstitching. Everyday cut.",
    sizes: tshirtSizes,
    variants: [
      { name: "Sand", swatch: "#c9b99a", image: tee1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee2 },
    ],
  },
  {
    id: "boxy-tee-bone",
    name: "Boxy Crew",
    color: "Bone",
    price: 70,
    category: "tees",
    image: tee2,
    altImage: tee1,
    rating: 5,
    reviews: 41,
    description:
      "Dropped shoulder boxy crew with a dense rib collar. Built to hold shape after years of wear.",
    sizes: tshirtSizes,
    variants: [
      { name: "Bone", swatch: "#e8e3da", image: tee2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee1 },
    ],
  },
  {
    id: "long-sleeve-tee-black",
    name: "Long Sleeve Tee",
    color: "Onyx Black",
    price: 85,
    category: "tees",
    image: tee2,
    altImage: tee1,
    rating: 5,
    reviews: 73,
    badge: "New",
    description:
      "Heavy cotton long sleeve with cuffed wrists. Designed to be layered or worn alone.",
    sizes: tshirtSizes,
    variants: [
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee2 },
      { name: "Optic White", swatch: "#f5f3ee", image: tee1 },
    ],
  },
  {
    id: "graphic-tee-stone",
    name: "Vantage Graphic Tee",
    color: "Stone Grey",
    price: 75,
    category: "tees",
    image: tee1,
    altImage: tee2,
    rating: 4,
    reviews: 57,
    description:
      "Garment-dyed cotton with a discreet rubberized chest print. Subtle branding done right.",
    sizes: tshirtSizes,
    variants: [
      { name: "Stone Grey", swatch: "#8a8780", image: tee1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee2 },
    ],
  },
  {
    id: "ringer-tee-cream",
    name: "Ringer Tee",
    color: "Cream",
    price: 60,
    category: "tees",
    image: tee2,
    altImage: tee1,
    rating: 4,
    reviews: 38,
    description:
      "Retro contrast ribbing at the collar and cuffs on a soft combed cotton body.",
    sizes: tshirtSizes,
    variants: [
      { name: "Cream", swatch: "#f0ebe0", image: tee2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee1 },
    ],
  },
  {
    id: "v-neck-tee-white",
    name: "Essential V-Neck",
    color: "Optic White",
    price: 50,
    category: "tees",
    image: tee1,
    altImage: tee2,
    rating: 4,
    reviews: 29,
    description:
      "Mid-weight pima cotton v-neck. Refined, breathable, made for warmer days.",
    sizes: tshirtSizes,
    variants: [
      { name: "Optic White", swatch: "#f5f3ee", image: tee1 },
      { name: "Stone Grey", swatch: "#8a8780", image: tee2 },
    ],
  },
  {
    id: "henley-tee-clay",
    name: "Henley Tee",
    color: "Clay",
    price: 80,
    category: "tees",
    image: tee2,
    altImage: tee1,
    rating: 5,
    reviews: 51,
    description:
      "Three-button placket with a rib-knit collar. A classic warm-weather staple in muted clay.",
    sizes: tshirtSizes,
    variants: [
      { name: "Clay", swatch: "#b07a5a", image: tee2 },
      { name: "Optic White", swatch: "#f5f3ee", image: tee1 },
    ],
  },
  {
    id: "striped-tee-navy",
    name: "Mariner Stripe Tee",
    color: "Deep Navy",
    price: 70,
    category: "tees",
    image: tee1,
    altImage: tee2,
    rating: 5,
    reviews: 44,
    description:
      "Heritage breton stripe in dense cotton jersey. Effortless, year-round.",
    sizes: tshirtSizes,
    variants: [
      { name: "Deep Navy", swatch: "#1b2a4a", image: tee1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: tee2 },
    ],
  },

  // ───────── HOODIES (6) ─────────
  {
    id: "fleece-hoodie-black",
    name: "Core Fleece Hoodie",
    color: "Onyx Black",
    price: 145,
    category: "hoodies",
    image: hoodie1,
    altImage: hoodie2,
    video: hoodieVideo.url,
    rating: 5,
    reviews: 212,
    badge: "Best Seller",
    description:
      "Heavyweight 450gsm brushed-back fleece with double-lined hood and ribbed cuffs. Engineered for daily layering.",
    sizes: hoodieSizes,
    variants: [
      { name: "Onyx Black", swatch: "#0d0d0d", image: hoodie1 },
      { name: "Stone Grey", swatch: "#8a8780", image: hoodie2 },
      { name: "Bone", swatch: "#e8e3da", image: hoodie2 },
    ],
  },
  {
    id: "fleece-hoodie-stone",
    name: "Garment-Dyed Hoodie",
    color: "Stone Grey",
    price: 165,
    category: "hoodies",
    image: hoodie2,
    altImage: hoodie1,
    video: hoodieVideo.url,
    rating: 4,
    reviews: 47,
    description:
      "Garment-dyed for a softer, lived-in feel. Mid-weight loopback cotton with structured shoulder line.",
    sizes: hoodieSizes,
    variants: [
      { name: "Stone Grey", swatch: "#8a8780", image: hoodie2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: hoodie1 },
    ],
  },
  {
    id: "zip-hoodie-black",
    name: "Full-Zip Hoodie",
    color: "Onyx Black",
    price: 175,
    category: "hoodies",
    image: hoodie1,
    altImage: hoodie2,
    rating: 5,
    reviews: 96,
    badge: "New",
    description:
      "Brushed-back fleece full-zip with YKK hardware and kangaroo pockets. The everyday layer.",
    sizes: hoodieSizes,
    variants: [
      { name: "Onyx Black", swatch: "#0d0d0d", image: hoodie1 },
      { name: "Stone Grey", swatch: "#8a8780", image: hoodie2 },
    ],
  },
  {
    id: "cropped-hoodie-bone",
    name: "Cropped Hoodie",
    color: "Bone",
    price: 135,
    category: "hoodies",
    image: hoodie2,
    altImage: hoodie1,
    rating: 4,
    reviews: 33,
    description:
      "Shortened hem and boxy fit. Soft loopback cotton in warm bone.",
    sizes: hoodieSizes,
    variants: [
      { name: "Bone", swatch: "#e8e3da", image: hoodie2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: hoodie1 },
    ],
  },
  {
    id: "oversized-hoodie-charcoal",
    name: "Oversized Hoodie",
    color: "Charcoal",
    price: 155,
    category: "hoodies",
    image: hoodie1,
    altImage: hoodie2,
    rating: 5,
    reviews: 78,
    description:
      "Drop-shoulder oversized fit, 500gsm brushed fleece. Built like outerwear.",
    sizes: hoodieSizes,
    variants: [
      { name: "Charcoal", swatch: "#36363a", image: hoodie1 },
      { name: "Stone Grey", swatch: "#8a8780", image: hoodie2 },
    ],
  },
  {
    id: "tech-hoodie-olive",
    name: "Tech Pullover",
    color: "Olive",
    price: 190,
    category: "hoodies",
    image: hoodie2,
    altImage: hoodie1,
    rating: 5,
    reviews: 52,
    badge: "Limited",
    description:
      "Water-resistant technical shell with a fleece-lined hood. For unpredictable city weather.",
    sizes: hoodieSizes,
    variants: [
      { name: "Olive", swatch: "#4a5040", image: hoodie2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: hoodie1 },
    ],
  },

  // ───────── SHOES (11) ─────────
  {
    id: "nexus-trainer-white",
    name: "Nexus Trainer v1",
    color: "Arctic White",
    price: 185,
    category: "shoes",
    image: shoe1,
    altImage: shoe2,
    video: shoeVideo.url,
    rating: 5,
    reviews: 312,
    badge: "Limited",
    description:
      "Full-grain leather upper on a sculpted EVA midsole. Built for movement, refined for the city.",
    sizes: shoeSizes,
    variants: [
      { name: "Arctic White", swatch: "#f5f3ee", image: shoe1 },
      { name: "Stealth Black", swatch: "#0d0d0d", image: shoe2 },
      { name: "Sand", swatch: "#c9b99a", image: shoe1 },
    ],
  },
  {
    id: "nexus-trainer-black",
    name: "Nexus Runner",
    color: "Stealth Black",
    price: 210,
    category: "shoes",
    image: shoe2,
    altImage: shoe1,
    video: shoeVideo.url,
    rating: 5,
    reviews: 96,
    description:
      "All-black mesh-and-leather runner with cushioned air sole unit. Quiet performance, monochrome attitude.",
    sizes: shoeSizes,
    variants: [
      { name: "Stealth Black", swatch: "#0d0d0d", image: shoe2 },
      { name: "Arctic White", swatch: "#f5f3ee", image: shoe1 },
    ],
  },
  {
    id: "court-low-white",
    name: "Court Low",
    color: "Optic White",
    price: 160,
    category: "shoes",
    image: shoe1,
    altImage: shoe2,
    rating: 4,
    reviews: 87,
    description:
      "Minimal court silhouette in soft tumbled leather. A clean modern classic.",
    sizes: shoeSizes,
    variants: [
      { name: "Optic White", swatch: "#f5f3ee", image: shoe1 },
      { name: "Stealth Black", swatch: "#0d0d0d", image: shoe2 },
    ],
  },
  {
    id: "trail-runner-sand",
    name: "Trail Runner GT",
    color: "Sand",
    price: 225,
    category: "shoes",
    image: shoe2,
    altImage: shoe1,
    rating: 5,
    reviews: 64,
    badge: "New",
    description:
      "Lugged Vibram outsole and abrasion-resistant ripstop upper. From trail to terminal.",
    sizes: shoeSizes,
    variants: [
      { name: "Sand", swatch: "#c9b99a", image: shoe2 },
      { name: "Stealth Black", swatch: "#0d0d0d", image: shoe1 },
    ],
  },
  {
    id: "chelsea-boot-black",
    name: "Chelsea Boot",
    color: "Onyx Black",
    price: 295,
    category: "shoes",
    image: shoe1,
    altImage: shoe2,
    rating: 5,
    reviews: 41,
    description:
      "Italian leather chelsea boot on a stacked leather sole. A wardrobe cornerstone.",
    sizes: shoeSizes,
    variants: [
      { name: "Onyx Black", swatch: "#0d0d0d", image: shoe1 },
      { name: "Sand", swatch: "#c9b99a", image: shoe2 },
    ],
  },
  {
    id: "derby-shoe-tan",
    name: "Derby Shoe",
    color: "Tan",
    price: 270,
    category: "shoes",
    image: shoe2,
    altImage: shoe1,
    rating: 4,
    reviews: 28,
    description:
      "Hand-finished tan leather derby with blake-stitched construction. Quiet dress sophistication.",
    sizes: shoeSizes,
    variants: [
      { name: "Tan", swatch: "#a17048", image: shoe2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: shoe1 },
    ],
  },
  {
    id: "slip-on-canvas-grey",
    name: "Canvas Slip-On",
    color: "Stone Grey",
    price: 95,
    category: "shoes",
    image: shoe1,
    altImage: shoe2,
    rating: 4,
    reviews: 55,
    description:
      "Heavy canvas upper, vulcanized rubber sole. The summer essential.",
    sizes: shoeSizes,
    variants: [
      { name: "Stone Grey", swatch: "#8a8780", image: shoe1 },
      { name: "Optic White", swatch: "#f5f3ee", image: shoe2 },
    ],
  },
  {
    id: "hiking-boot-brown",
    name: "Alpine Hiker",
    color: "Walnut",
    price: 320,
    category: "shoes",
    image: shoe2,
    altImage: shoe1,
    rating: 5,
    reviews: 36,
    badge: "Limited",
    description:
      "Waxed nubuck upper with Gore-Tex lining and lugged sole. Tested in alpine conditions.",
    sizes: shoeSizes,
    variants: [
      { name: "Walnut", swatch: "#6b4a32", image: shoe2 },
      { name: "Stealth Black", swatch: "#0d0d0d", image: shoe1 },
    ],
  },
  {
    id: "loafer-suede-olive",
    name: "Penny Loafer",
    color: "Olive Suede",
    price: 240,
    category: "shoes",
    image: shoe1,
    altImage: shoe2,
    rating: 4,
    reviews: 22,
    description:
      "Italian suede penny loafer with hand-stitched apron. Easy elegance.",
    sizes: shoeSizes,
    variants: [
      { name: "Olive Suede", swatch: "#4a5040", image: shoe1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: shoe2 },
    ],
  },
  {
    id: "high-top-cream",
    name: "Studio High-Top",
    color: "Cream",
    price: 180,
    category: "shoes",
    image: shoe2,
    altImage: shoe1,
    rating: 4,
    reviews: 47,
    description:
      "Mid-cut leather high-top with padded collar and gum sole.",
    sizes: shoeSizes,
    variants: [
      { name: "Cream", swatch: "#f0ebe0", image: shoe2 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: shoe1 },
    ],
  },
  {
    id: "race-flat-red",
    name: "Race Flat 02",
    color: "Signal Red",
    price: 205,
    category: "shoes",
    image: shoe1,
    altImage: shoe2,
    rating: 5,
    reviews: 31,
    badge: "New",
    description:
      "Carbon-plated race flat with responsive foam midsole. Race day ready.",
    sizes: shoeSizes,
    variants: [
      { name: "Signal Red", swatch: "#c0392b", image: shoe1 },
      { name: "Stealth Black", swatch: "#0d0d0d", image: shoe2 },
    ],
  },

  // ───────── WATCHES (11) ─────────
  {
    id: "sector-04-watch",
    name: "Sector 04 Chronograph",
    color: "Stealth Matte",
    price: 340,
    category: "watches",
    image: watch1,
    altImage: watch2,
    video: watchVideo.url,
    rating: 5,
    reviews: 28,
    badge: "Limited",
    description:
      "42mm PVD-coated case with sapphire crystal and a Swiss chronograph movement. Built for measured precision.",
    sizes: watchSizes,
    variants: [
      { name: "Stealth Matte", swatch: "#1a1a1a", image: watch1 },
      { name: "Brushed Steel", swatch: "#b8b8bd", image: watch2 },
    ],
  },
  {
    id: "field-watch-02",
    name: "Field Watch 02",
    color: "Brushed Steel",
    price: 280,
    category: "watches",
    image: watch2,
    altImage: watch1,
    video: watchVideo.url,
    rating: 4,
    reviews: 41,
    description:
      "Automatic 38mm field watch with full-grain leather strap. A daily companion built to outlast trends.",
    sizes: watchSizes,
    variants: [
      { name: "Brushed Steel", swatch: "#b8b8bd", image: watch2 },
      { name: "Stealth Matte", swatch: "#1a1a1a", image: watch1 },
    ],
  },
  {
    id: "diver-200-blue",
    name: "Diver 200",
    color: "Abyss Blue",
    price: 420,
    category: "watches",
    image: watch1,
    altImage: watch2,
    rating: 5,
    reviews: 67,
    badge: "New",
    description:
      "200m water-resistant diver with unidirectional ceramic bezel and lumed indices.",
    sizes: watchSizes,
    variants: [
      { name: "Abyss Blue", swatch: "#0c2340", image: watch1 },
      { name: "Stealth Matte", swatch: "#1a1a1a", image: watch2 },
    ],
  },
  {
    id: "pilot-chrono-black",
    name: "Pilot Chronograph",
    color: "Onyx Black",
    price: 380,
    category: "watches",
    image: watch2,
    altImage: watch1,
    rating: 5,
    reviews: 39,
    description:
      "Aviation-inspired 44mm chronograph with oversized crown and matte black dial.",
    sizes: watchSizes,
    variants: [
      { name: "Onyx Black", swatch: "#0d0d0d", image: watch2 },
      { name: "Brushed Steel", swatch: "#b8b8bd", image: watch1 },
    ],
  },
  {
    id: "dress-watch-gold",
    name: "Dress Watch Slim",
    color: "Champagne Gold",
    price: 510,
    category: "watches",
    image: watch1,
    altImage: watch2,
    rating: 5,
    reviews: 22,
    badge: "Limited",
    description:
      "7.2mm ultra-thin case with sunburst champagne dial and dauphine hands.",
    sizes: watchSizes,
    variants: [
      { name: "Champagne Gold", swatch: "#c9a84c", image: watch1 },
      { name: "Brushed Steel", swatch: "#b8b8bd", image: watch2 },
    ],
  },
  {
    id: "gmt-traveler-green",
    name: "GMT Traveler",
    color: "Forest Green",
    price: 460,
    category: "watches",
    image: watch2,
    altImage: watch1,
    rating: 5,
    reviews: 48,
    description:
      "Dual time zone GMT with 24-hour bezel. Made for cross-meridian living.",
    sizes: watchSizes,
    variants: [
      { name: "Forest Green", swatch: "#1f3d2b", image: watch2 },
      { name: "Stealth Matte", swatch: "#1a1a1a", image: watch1 },
    ],
  },
  {
    id: "digital-quartz-grey",
    name: "Quartz Digital",
    color: "Graphite",
    price: 145,
    category: "watches",
    image: watch1,
    altImage: watch2,
    rating: 4,
    reviews: 84,
    description:
      "Modern digital quartz with sapphire-coated glass and a resin-bonded case.",
    sizes: watchSizes,
    variants: [
      { name: "Graphite", swatch: "#3a3a3d", image: watch1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: watch2 },
    ],
  },
  {
    id: "moonphase-cream",
    name: "Moonphase Classic",
    color: "Cream",
    price: 590,
    category: "watches",
    image: watch2,
    altImage: watch1,
    rating: 5,
    reviews: 19,
    description:
      "Hand-finished moonphase complication on a warm cream dial. Heirloom-grade.",
    sizes: watchSizes,
    variants: [
      { name: "Cream", swatch: "#f0ebe0", image: watch2 },
      { name: "Champagne Gold", swatch: "#c9a84c", image: watch1 },
    ],
  },
  {
    id: "sport-rubber-orange",
    name: "Sport Rubber",
    color: "Signal Orange",
    price: 230,
    category: "watches",
    image: watch1,
    altImage: watch2,
    rating: 4,
    reviews: 53,
    badge: "New",
    description:
      "Lightweight titanium-on-rubber sport with luminous markers. Built for motion.",
    sizes: watchSizes,
    variants: [
      { name: "Signal Orange", swatch: "#e85d3a", image: watch1 },
      { name: "Stealth Matte", swatch: "#1a1a1a", image: watch2 },
    ],
  },
  {
    id: "skeleton-automatic-silver",
    name: "Skeleton Automatic",
    color: "Polished Silver",
    price: 640,
    category: "watches",
    image: watch2,
    altImage: watch1,
    rating: 5,
    reviews: 26,
    badge: "Limited",
    description:
      "Open-heart skeleton dial revealing a Swiss automatic movement. Engineering on display.",
    sizes: watchSizes,
    variants: [
      { name: "Polished Silver", swatch: "#d9d9dc", image: watch2 },
      { name: "Stealth Matte", swatch: "#1a1a1a", image: watch1 },
    ],
  },
  {
    id: "racing-chrono-white",
    name: "Racing Chrono",
    color: "Panda White",
    price: 410,
    category: "watches",
    image: watch1,
    altImage: watch2,
    rating: 5,
    reviews: 34,
    description:
      "Motorsport-inspired panda dial with tachymeter scale and pump pushers.",
    sizes: watchSizes,
    variants: [
      { name: "Panda White", swatch: "#f5f3ee", image: watch1 },
      { name: "Onyx Black", swatch: "#0d0d0d", image: watch2 },
    ],
  },
];

export const categories: { id: Category; label: string }[] = [
  { id: "tees", label: "Tees" },
  { id: "hoodies", label: "Hoodies" },
  { id: "shoes", label: "Shoes" },
  { id: "watches", label: "Watches" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
