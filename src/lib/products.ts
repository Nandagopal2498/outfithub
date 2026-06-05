// Original assets
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

// New tees
import teePocketSand from "@/assets/products/tee-pocket-sand.jpg";
import teeBoxyBone from "@/assets/products/tee-boxy-bone.jpg";
import teeLongsleeveBlack from "@/assets/products/tee-longsleeve-black.jpg";
import teeGraphicStone from "@/assets/products/tee-graphic-stone.jpg";
import teeRingerCream from "@/assets/products/tee-ringer-cream.jpg";
import teeVneckWhite from "@/assets/products/tee-vneck-white.jpg";
import teeHenleyClay from "@/assets/products/tee-henley-clay.jpg";
import teeStripeNavy from "@/assets/products/tee-stripe-navy.jpg";
import teeRaglanCharcoal from "@/assets/products/tee-raglan-charcoal.jpg";
import teeOversizedOlive from "@/assets/products/tee-oversized-olive.jpg";

// New hoodies
import hoodieZipBlack from "@/assets/products/hoodie-zip-black.jpg";
import hoodieCroppedBone from "@/assets/products/hoodie-cropped-bone.png";
import hoodieOversizedCharcoal from "@/assets/products/hoodie-oversized-charcoal.jpg";
import hoodieTechOlive from "@/assets/products/hoodie-tech-olive.jpg";
import hoodieQuarterzipNavy from "@/assets/products/hoodie-quarterzip-navy-front.png";
import hoodieHeavyCream from "@/assets/products/hoodie-heavy-cream-front.png";
import hoodieLightSand from "@/assets/products/hoodie-light-sand.jpg";
import hoodieTerryRust from "@/assets/products/hoodie-terry-rust-front.png";
import hoodieSageGreen from "@/assets/products/hoodie-sage-green.png";
import hoodiePulloverForest from "@/assets/products/hoodie-pullover-forest.jpg";
import hoodieSherpaTan from "@/assets/products/hoodie-sherpa-tan.jpg";
import hoodieMinimalWhite from "@/assets/products/hoodie-minimal-white.jpg";
import hoodieLosAngeles from "@/assets/products/hoodie-los-angeles.png";
import hoodieJmcErl from "@/assets/products/hoodie-jmc-erl.png";

// New shoes
import shoeCourtWhite from "@/assets/products/shoe-court-white.jpg";
import shoeTrailSand from "@/assets/products/shoe-trail-sand.jpg";
import shoeChelseaBlack from "@/assets/products/shoe-chelsea-black.jpg";
import shoeDerbyTan from "@/assets/products/shoe-derby-tan.jpg";
import shoeSliponGrey from "@/assets/products/shoe-slipon-grey.jpg";
import shoeHikingBrown from "@/assets/products/shoe-hiking-brown.jpg";
import shoeLoaferOlive from "@/assets/products/shoe-loafer-olive.jpg";
import shoeHightopCream from "@/assets/products/shoe-hightop-cream.jpg";
import shoeRaceRed from "@/assets/products/shoe-race-red.jpg";
import shoeRunningGrey from "@/assets/products/shoe-running-grey.jpg";
import shoeBoatNavy from "@/assets/products/shoe-boat-navy.jpg";
import shoeSandalTan from "@/assets/products/shoe-sandal-tan.jpg";

// New watches
import watchDiverBlue from "@/assets/products/watch-diver-blue.jpg";
import watchPilotBlack from "@/assets/products/watch-pilot-black.jpg";
import watchDressGold from "@/assets/products/watch-dress-gold.jpg";
import watchGmtGreen from "@/assets/products/watch-gmt-green.jpg";
import watchDigitalGrey from "@/assets/products/watch-digital-grey.jpg";
import watchMoonCream from "@/assets/products/watch-moon-cream.jpg";
import watchSportOrange from "@/assets/products/watch-sport-orange.jpg";
import watchSkeletonSilver from "@/assets/products/watch-skeleton-silver.jpg";
import watchRacingWhite from "@/assets/products/watch-racing-white.jpg";
import watchMinimalTan from "@/assets/products/watch-minimal-tan.jpg";

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

const rawProducts: Product[] = [
  // ───────── TEES (12) ─────────
  {
    id: "core-tee-white",
    name: "Core Heavyweight Tee",
    color: "Optic White",
    price: 65,
    category: "tees",
    image: tee1,
    altImage: tee1,
    video: teeVideo.url,
    rating: 5,
    reviews: 124,
    badge: "New",
    description:
      "A 260gsm garment-dyed cotton tee with a relaxed boxy silhouette and reinforced ribbed collar. Cut and sewn in Portugal.",
    sizes: tshirtSizes,
    variants: [{ name: "Optic White", swatch: "#f5f3ee", image: tee1 }],
  },
  {
    id: "midnight-tee-black",
    name: "Midnight Jersey Tee",
    color: "Onyx Black",
    price: 65,
    category: "tees",
    image: tee2,
    altImage: tee2,
    video: teeVideo.url,
    rating: 5,
    reviews: 88,
    description:
      "Pigment-dyed 240gsm jersey with a softly tapered hem and a slightly elongated body. The wardrobe foundation in true monochrome black.",
    sizes: tshirtSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: tee2 }],
  },

  {
    id: "pocket-tee-sand",
    name: "Pocket Tee",
    color: "Sand",
    price: 55,
    category: "tees",
    image: teePocketSand,
    altImage: teePocketSand,
    rating: 4,
    reviews: 62,
    description:
      "Lightweight 180gsm jersey with a chest pocket and clean topstitching. Everyday cut.",
    sizes: tshirtSizes,
    variants: [{ name: "Sand", swatch: "#e8d8b8", image: teePocketSand }],
  },
  {
    id: "boxy-tee-bone",
    name: "Boxy Crew",
    color: "Bone",
    price: 70,
    category: "tees",
    image: teeBoxyBone,
    altImage: teeBoxyBone,
    rating: 5,
    reviews: 41,
    description:
      "Dropped shoulder boxy crew with a dense rib collar. Built to hold shape after years of wear.",
    sizes: tshirtSizes,
    variants: [{ name: "Bone", swatch: "#f1eadb", image: teeBoxyBone }],
  },
  {
    id: "long-sleeve-tee-black",
    name: "Long Sleeve Tee",
    color: "Onyx Black",
    price: 85,
    category: "tees",
    image: teeLongsleeveBlack,
    altImage: teeLongsleeveBlack,
    rating: 5,
    reviews: 73,
    badge: "New",
    description:
      "Heavy cotton long sleeve with cuffed wrists. Designed to be layered or worn alone.",
    sizes: tshirtSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: teeLongsleeveBlack }],
  },
  {
    id: "graphic-tee-stone",
    name: "Vantage Graphic Tee",
    color: "Stone Grey",
    price: 75,
    category: "tees",
    image: teeGraphicStone,
    altImage: teeGraphicStone,
    rating: 4,
    reviews: 57,
    description:
      "Garment-dyed cotton with a discreet rubberized chest print. Subtle branding done right.",
    sizes: tshirtSizes,
    variants: [{ name: "Stone Grey", swatch: "#cfcabe", image: teeGraphicStone }],
  },
  {
    id: "ringer-tee-cream",
    name: "Ringer Tee",
    color: "Cream",
    price: 60,
    category: "tees",
    image: teeRingerCream,
    altImage: teeRingerCream,
    rating: 4,
    reviews: 38,
    description: "Retro contrast ribbing at the collar and cuffs on a soft combed cotton body.",
    sizes: tshirtSizes,
    variants: [{ name: "Cream", swatch: "#f5ebd6", image: teeRingerCream }],
  },
  {
    id: "v-neck-tee-white",
    name: "Essential V-Neck",
    color: "Optic White",
    price: 50,
    category: "tees",
    image: teeVneckWhite,
    altImage: teeVneckWhite,
    rating: 4,
    reviews: 29,
    description: "Mid-weight pima cotton v-neck. Refined, breathable, made for warmer days.",
    sizes: tshirtSizes,
    variants: [{ name: "Optic White", swatch: "#f5f3ee", image: teeVneckWhite }],
  },
  {
    id: "henley-tee-clay",
    name: "Henley Tee",
    color: "Clay",
    price: 80,
    category: "tees",
    image: teeHenleyClay,
    altImage: teeHenleyClay,
    rating: 5,
    reviews: 51,
    description:
      "Three-button placket with a rib-knit collar. A classic warm-weather staple in muted clay.",
    sizes: tshirtSizes,
    variants: [{ name: "Clay", swatch: "#a85a3e", image: teeHenleyClay }],
  },
  {
    id: "striped-tee-navy",
    name: "Mariner Stripe Tee",
    color: "Deep Navy",
    price: 70,
    category: "tees",
    image: teeStripeNavy,
    altImage: teeStripeNavy,
    rating: 5,
    reviews: 44,
    description: "Heritage breton stripe in dense cotton jersey. Effortless, year-round.",
    sizes: tshirtSizes,
    variants: [{ name: "Deep Navy", swatch: "#1b2a4a", image: teeStripeNavy }],
  },
  {
    id: "raglan-tee-charcoal",
    name: "Raglan Baseball Tee",
    color: "Charcoal",
    price: 72,
    category: "tees",
    image: teeRaglanCharcoal,
    altImage: teeRaglanCharcoal,
    rating: 4,
    reviews: 26,
    description:
      "Heather charcoal body with contrast black raglan sleeves. A nod to dugout classics.",
    sizes: tshirtSizes,
    variants: [{ name: "Charcoal", swatch: "#5a5a5e", image: teeRaglanCharcoal }],
  },
  {
    id: "oversized-tee-olive",
    name: "Oversized Drop-Shoulder Tee",
    color: "Olive",
    price: 78,
    category: "tees",
    image: teeOversizedOlive,
    altImage: teeOversizedOlive,
    rating: 5,
    reviews: 64,
    badge: "New",
    description: "Drop-shoulder oversized fit in heavy garment-washed cotton.",
    sizes: tshirtSizes,
    variants: [{ name: "Olive", swatch: "#828c5a", image: teeOversizedOlive }],
  },

  // ───────── HOODIES (16) ─────────
  {
    id: "fleece-hoodie-black",
    name: "Core Fleece Zip Hoodie",
    color: "Onyx Black",
    price: 145,
    category: "hoodies",
    image: hoodie1,
    altImage: hoodie1,
    video: hoodieVideo.url,
    rating: 5,
    reviews: 212,
    badge: "Best Seller",
    description: "A premium heavy fleece zip-up hoodie featuring a grey-and-white striped hood lining, double-lined hood, and deep side pockets.",
    sizes: hoodieSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: hoodie1 }],
  },
  {
    id: "cobalt-zip-hoodie",
    name: "Cobalt Loopback Zip",
    color: "Cobalt Blue",
    price: 165,
    category: "hoodies",
    image: hoodie2,
    altImage: hoodie2,
    video: hoodieVideo.url,
    rating: 4,
    reviews: 47,
    description:
      "A vibrant cobalt blue zip-up hoodie in a structured loopback cotton fit, complete with a clean front zipper and ribbed cuffs.",
    sizes: hoodieSizes,
    variants: [{ name: "Cobalt Blue", swatch: "#106ebe", image: hoodie2 }],
  },

  {
    id: "zip-hoodie-black",
    name: "Full-Zip Hoodie",
    color: "Onyx Black",
    price: 175,
    category: "hoodies",
    image: hoodieZipBlack,
    altImage: hoodieZipBlack,
    rating: 5,
    reviews: 96,
    badge: "New",
    description:
      "Brushed-back fleece full-zip with YKK hardware and kangaroo pockets. The everyday layer.",
    sizes: hoodieSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: hoodieZipBlack }],
  },
  {
    id: "cropped-hoodie-bone",
    name: "Cropped Hoodie",
    color: "Bone",
    price: 135,
    category: "hoodies",
    image: hoodieCroppedBone,
    altImage: hoodieCroppedBone,
    rating: 4,
    reviews: 33,
    description: "Shortened hem and boxy fit. Soft loopback cotton in warm bone.",
    sizes: hoodieSizes,
    variants: [{ name: "Bone", swatch: "#f1eadb", image: hoodieCroppedBone }],
  },
  {
    id: "oversized-hoodie-charcoal",
    name: "Oversized Hoodie",
    color: "Charcoal",
    price: 155,
    category: "hoodies",
    image: hoodieOversizedCharcoal,
    altImage: hoodieOversizedCharcoal,
    rating: 5,
    reviews: 78,
    description: "Drop-shoulder oversized fit, 500gsm brushed fleece. Built like outerwear.",
    sizes: hoodieSizes,
    variants: [{ name: "Charcoal", swatch: "#36363a", image: hoodieOversizedCharcoal }],
  },
  {
    id: "tech-hoodie-olive",
    name: "Nothing Graphic Hoodie",
    color: "Navy",
    price: 190,
    category: "hoodies",
    image: hoodieTechOlive,
    altImage: hoodieTechOlive,
    rating: 5,
    reviews: 52,
    badge: "Limited",
    description:
      "A premium heavyweight navy pullover hoodie featuring a bold 'NOTHING' graphic intersected by a clean vertical white line.",
    sizes: hoodieSizes,
    variants: [{ name: "Navy", swatch: "#141f36", image: hoodieTechOlive }],
  },
  {
    id: "quarter-zip-navy",
    name: "Quarter-Zip Pullover",
    color: "Deep Navy",
    price: 150,
    category: "hoodies",
    image: hoodieQuarterzipNavy,
    altImage: hoodieQuarterzipNavy,
    rating: 4,
    reviews: 31,
    description:
      "Stand-collar quarter-zip in dense loopback cotton. A refined alternative to the pullover.",
    sizes: hoodieSizes,
    variants: [{ name: "Deep Navy", swatch: "#1b2a4a", image: hoodieQuarterzipNavy }],
  },
  {
    id: "heavyweight-hoodie-cream",
    name: "Heavyweight Pullover",
    color: "Cream",
    price: 180,
    category: "hoodies",
    image: hoodieHeavyCream,
    altImage: hoodieHeavyCream,
    rating: 5,
    reviews: 42,
    description: "500gsm brushed fleece pullover with a dense rib hem. Built to last decades.",
    sizes: hoodieSizes,
    variants: [{ name: "Cream", swatch: "#f5ebd6", image: hoodieHeavyCream }],
  },
  {
    id: "lightweight-hoodie-sand",
    name: "Lightweight Hoodie",
    color: "Sand",
    price: 120,
    category: "hoodies",
    image: hoodieLightSand,
    altImage: hoodieLightSand,
    rating: 4,
    reviews: 28,
    description: "Featherweight jersey pullover. Perfect transitional layer for warmer months.",
    sizes: hoodieSizes,
    variants: [{ name: "Sand", swatch: "#e8d8b8", image: hoodieLightSand }],
  },
  {
    id: "terry-hoodie-rust",
    name: "French Terry Hoodie",
    color: "Rust",
    price: 140,
    category: "hoodies",
    image: hoodieTerryRust,
    altImage: hoodieTerryRust,
    rating: 4,
    reviews: 37,
    badge: "New",
    description:
      "Looped french terry interior on a structured cotton body. Garment-dyed in rich rust.",
    sizes: hoodieSizes,
    variants: [{ name: "Rust", swatch: "#c45a2a", image: hoodieTerryRust }],
  },
  {
    id: "sage-green-hoodie",
    name: "Sage Green Hoodie",
    color: "Sage Green",
    price: 160,
    category: "hoodies",
    image: hoodieSageGreen,
    altImage: hoodieSageGreen,
    rating: 5,
    reviews: 56,
    description: "A premium cotton pullover hoodie in a relaxed sage green colorway, offering understated style and ultimate comfort.",
    sizes: hoodieSizes,
    variants: [{ name: "Sage Green", swatch: "#829c7d", image: hoodieSageGreen }],
  },
  {
    id: "pullover-hoodie-forest",
    name: "Embroidered Pullover",
    color: "Forest Green",
    price: 155,
    category: "hoodies",
    image: hoodiePulloverForest,
    altImage: hoodiePulloverForest,
    rating: 5,
    reviews: 44,
    description: "Mid-weight pullover with a tonal embroidered chest mark in forest green.",
    sizes: hoodieSizes,
    variants: [{ name: "Forest Green", swatch: "#1f3d2b", image: hoodiePulloverForest }],
  },
  {
    id: "sherpa-hoodie-tan",
    name: "Sherpa-Lined Hoodie",
    color: "Tan",
    price: 220,
    category: "hoodies",
    image: hoodieSherpaTan,
    altImage: hoodieSherpaTan,
    rating: 5,
    reviews: 38,
    badge: "Limited",
    description: "Cozy sherpa-lined hood and shoulders. Heavy cotton shell, built for winter.",
    sizes: hoodieSizes,
    variants: [{ name: "Tan", swatch: "#b97a3e", image: hoodieSherpaTan }],
  },
  {
    id: "minimal-hoodie-white",
    name: "Essential Pullover",
    color: "Optic White",
    price: 130,
    category: "hoodies",
    image: hoodieMinimalWhite,
    altImage: hoodieMinimalWhite,
    rating: 4,
    reviews: 49,
    description: "Unbranded pullover in mid-weight loopback cotton. Quiet, considered, daily.",
    sizes: hoodieSizes,
    variants: [{ name: "Optic White", swatch: "#f5f3ee", image: hoodieMinimalWhite }],
  },
  {
    id: "vintage-wash-hoodie-green",
    name: "Los Angeles Hoodie",
    color: "Beige",
    price: 160,
    category: "hoodies",
    image: hoodieLosAngeles,
    altImage: hoodieLosAngeles,
    rating: 5,
    reviews: 14,
    badge: "New",
    description: "A relaxed-fit heavy cotton hoodie featuring a classic arched Los Angeles graphic.",
    sizes: hoodieSizes,
    variants: [{ name: "Beige", swatch: "#eae4d9", image: hoodieLosAngeles }],
  },
  {
    id: "zip-hoodie-navy",
    name: "JMC ERL Hoodie",
    color: "Onyx Black",
    price: 180,
    category: "hoodies",
    image: hoodieJmcErl,
    altImage: hoodieJmcErl,
    rating: 4,
    reviews: 23,
    description:
      "A structured black fleece hoodie featuring a left chest utility pocket and screen-printed graphic details.",
    sizes: hoodieSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: hoodieJmcErl }],
  },

  // ───────── SHOES (14) ─────────
  {
    id: "nexus-trainer-white",
    name: "Nexus Trainer v1",
    color: "Arctic White",
    price: 185,
    category: "shoes",
    image: shoe1,
    altImage: shoe1,
    video: shoeVideo.url,
    rating: 5,
    reviews: 312,
    badge: "Limited",
    description:
      "Full-grain leather upper on a sculpted EVA midsole. Built for movement, refined for the city.",
    sizes: shoeSizes,
    variants: [{ name: "Arctic White", swatch: "#f5f3ee", image: shoe1 }],
  },
  {
    id: "stealth-runner-black",
    name: "Stealth Runner 02",
    color: "Stealth Black",
    price: 210,
    category: "shoes",
    image: shoe2,
    altImage: shoe2,
    video: shoeVideo.url,
    rating: 5,
    reviews: 96,
    description:
      "All-black mesh-and-leather runner with a cushioned air sole unit and reflective heel pull. Quiet performance, monochrome attitude.",
    sizes: shoeSizes,
    variants: [{ name: "Stealth Black", swatch: "#0d0d0d", image: shoe2 }],
  },

  {
    id: "court-low-white",
    name: "Court Low",
    color: "Optic White",
    price: 160,
    category: "shoes",
    image: shoeCourtWhite,
    altImage: shoeCourtWhite,
    rating: 4,
    reviews: 87,
    description: "Minimal court silhouette in soft tumbled leather. A clean modern classic.",
    sizes: shoeSizes,
    variants: [{ name: "Optic White", swatch: "#f5f3ee", image: shoeCourtWhite }],
  },
  {
    id: "trail-runner-sand",
    name: "Trail Runner GT",
    color: "Sand",
    price: 225,
    category: "shoes",
    image: shoeTrailSand,
    altImage: shoeTrailSand,
    rating: 5,
    reviews: 64,
    badge: "New",
    description: "Lugged outsole and abrasion-resistant ripstop upper. From trail to terminal.",
    sizes: shoeSizes,
    variants: [{ name: "Sand", swatch: "#c9b99a", image: shoeTrailSand }],
  },
  {
    id: "chelsea-boot-black",
    name: "Chelsea Boot",
    color: "Onyx Black",
    price: 295,
    category: "shoes",
    image: shoeChelseaBlack,
    altImage: shoeChelseaBlack,
    rating: 5,
    reviews: 41,
    description: "Italian leather chelsea boot on a stacked leather sole. A wardrobe cornerstone.",
    sizes: shoeSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: shoeChelseaBlack }],
  },
  {
    id: "derby-shoe-tan",
    name: "Derby Shoe",
    color: "Tan",
    price: 270,
    category: "shoes",
    image: shoeDerbyTan,
    altImage: shoeDerbyTan,
    rating: 4,
    reviews: 28,
    description:
      "Hand-finished tan leather derby with blake-stitched construction. Quiet dress sophistication.",
    sizes: shoeSizes,
    variants: [{ name: "Tan", swatch: "#a17048", image: shoeDerbyTan }],
  },
  {
    id: "slip-on-canvas-grey",
    name: "Canvas Slip-On",
    color: "Stone Grey",
    price: 95,
    category: "shoes",
    image: shoeSliponGrey,
    altImage: shoeSliponGrey,
    rating: 4,
    reviews: 55,
    description: "Heavy canvas upper, vulcanized rubber sole. The summer essential.",
    sizes: shoeSizes,
    variants: [{ name: "Stone Grey", swatch: "#8a8780", image: shoeSliponGrey }],
  },
  {
    id: "hiking-boot-brown",
    name: "Alpine Hiker",
    color: "Walnut",
    price: 320,
    category: "shoes",
    image: shoeHikingBrown,
    altImage: shoeHikingBrown,
    rating: 5,
    reviews: 36,
    badge: "Limited",
    description: "Waxed nubuck upper with a lugged sole. Tested in alpine conditions.",
    sizes: shoeSizes,
    variants: [{ name: "Walnut", swatch: "#6b4a32", image: shoeHikingBrown }],
  },
  {
    id: "loafer-suede-olive",
    name: "Penny Loafer",
    color: "Olive Suede",
    price: 240,
    category: "shoes",
    image: shoeLoaferOlive,
    altImage: shoeLoaferOlive,
    rating: 4,
    reviews: 22,
    description: "Italian suede penny loafer with hand-stitched apron. Easy elegance.",
    sizes: shoeSizes,
    variants: [{ name: "Olive Suede", swatch: "#4a5040", image: shoeLoaferOlive }],
  },
  {
    id: "high-top-cream",
    name: "Studio High-Top",
    color: "Cream",
    price: 180,
    category: "shoes",
    image: shoeHightopCream,
    altImage: shoeHightopCream,
    rating: 4,
    reviews: 47,
    description: "Mid-cut leather high-top with padded collar and gum sole.",
    sizes: shoeSizes,
    variants: [{ name: "Cream", swatch: "#f0ebe0", image: shoeHightopCream }],
  },
  {
    id: "race-flat-red",
    name: "Race Flat 02",
    color: "Signal Red",
    price: 205,
    category: "shoes",
    image: shoeRaceRed,
    altImage: shoeRaceRed,
    rating: 5,
    reviews: 31,
    badge: "New",
    description: "Carbon-plated race flat with responsive foam midsole. Race day ready.",
    sizes: shoeSizes,
    variants: [{ name: "Signal Red", swatch: "#c0392b", image: shoeRaceRed }],
  },
  {
    id: "running-knit-grey",
    name: "Knit Runner",
    color: "Heather Grey",
    price: 195,
    category: "shoes",
    image: shoeRunningGrey,
    altImage: shoeRunningGrey,
    rating: 4,
    reviews: 58,
    description: "Engineered knit upper and chunky cushioned midsole. Daily-mile comfort.",
    sizes: shoeSizes,
    variants: [{ name: "Heather Grey", swatch: "#a3a3a8", image: shoeRunningGrey }],
  },
  {
    id: "boat-shoe-navy",
    name: "Deck Shoe",
    color: "Deep Navy",
    price: 175,
    category: "shoes",
    image: shoeBoatNavy,
    altImage: shoeBoatNavy,
    rating: 4,
    reviews: 33,
    description: "Hand-sewn moccasin construction with 360 lacing and a siped white sole.",
    sizes: shoeSizes,
    variants: [{ name: "Deep Navy", swatch: "#1b2a4a", image: shoeBoatNavy }],
  },
  {
    id: "sandal-leather-tan",
    name: "Cork Slide Sandal",
    color: "Tan",
    price: 110,
    category: "shoes",
    image: shoeSandalTan,
    altImage: shoeSandalTan,
    rating: 4,
    reviews: 24,
    description: "Veg-tan leather straps on a cork-latex footbed. Summer-ready.",
    sizes: shoeSizes,
    variants: [{ name: "Tan", swatch: "#b97a3e", image: shoeSandalTan }],
  },

  // ───────── WATCHES (12) ─────────
  {
    id: "sector-04-watch",
    name: "Sector 04 Chronograph",
    color: "Stealth Matte",
    price: 340,
    category: "watches",
    image: watch1,
    altImage: watch1,
    video: watchVideo.url,
    rating: 5,
    reviews: 28,
    badge: "Limited",
    description: "42mm PVD-coated case with sapphire crystal and a Swiss chronograph movement.",
    sizes: watchSizes,
    variants: [{ name: "Stealth Matte", swatch: "#1a1a1a", image: watch1 }],
  },
  {
    id: "field-watch-02",
    name: "Field Watch 02",
    color: "Brushed Steel",
    price: 280,
    category: "watches",
    image: watch2,
    altImage: watch2,
    video: watchVideo.url,
    rating: 4,
    reviews: 41,
    description:
      "Automatic 38mm field watch with full-grain leather strap and a brushed steel case. A daily companion built to outlast trends.",
    sizes: watchSizes,
    variants: [{ name: "Brushed Steel", swatch: "#b8b8bd", image: watch2 }],
  },

  {
    id: "diver-200-blue",
    name: "Diver 200",
    color: "Abyss Blue",
    price: 420,
    category: "watches",
    image: watchDiverBlue,
    altImage: watchDiverBlue,
    rating: 5,
    reviews: 67,
    badge: "New",
    description: "200m water-resistant diver with unidirectional bezel and lumed indices.",
    sizes: watchSizes,
    variants: [{ name: "Abyss Blue", swatch: "#0c2340", image: watchDiverBlue }],
  },
  {
    id: "pilot-chrono-black",
    name: "Pilot Chronograph",
    color: "Onyx Black",
    price: 380,
    category: "watches",
    image: watchPilotBlack,
    altImage: watchPilotBlack,
    rating: 5,
    reviews: 39,
    description: "Aviation-inspired chronograph with oversized crown and matte black dial.",
    sizes: watchSizes,
    variants: [{ name: "Onyx Black", swatch: "#0d0d0d", image: watchPilotBlack }],
  },
  {
    id: "dress-watch-gold",
    name: "Dress Watch Slim",
    color: "Champagne Gold",
    price: 510,
    category: "watches",
    image: watchDressGold,
    altImage: watchDressGold,
    rating: 5,
    reviews: 22,
    badge: "Limited",
    description: "Ultra-thin case with sunburst champagne dial and dauphine hands.",
    sizes: watchSizes,
    variants: [{ name: "Champagne Gold", swatch: "#c9a84c", image: watchDressGold }],
  },
  {
    id: "gmt-traveler-green",
    name: "GMT Traveler",
    color: "Forest Green",
    price: 460,
    category: "watches",
    image: watchGmtGreen,
    altImage: watchGmtGreen,
    rating: 5,
    reviews: 48,
    description: "Dual time zone GMT with 24-hour bezel. Made for cross-meridian living.",
    sizes: watchSizes,
    variants: [{ name: "Forest Green", swatch: "#1f3d2b", image: watchGmtGreen }],
  },
  {
    id: "digital-quartz-grey",
    name: "Quartz Digital",
    color: "Graphite",
    price: 145,
    category: "watches",
    image: watchDigitalGrey,
    altImage: watchDigitalGrey,
    rating: 4,
    reviews: 84,
    description: "Modern digital quartz with sapphire-coated glass and a resin-bonded case.",
    sizes: watchSizes,
    variants: [{ name: "Graphite", swatch: "#3a3a3d", image: watchDigitalGrey }],
  },
  {
    id: "moonphase-cream",
    name: "Moonphase Classic",
    color: "Cream",
    price: 590,
    category: "watches",
    image: watchMoonCream,
    altImage: watchMoonCream,
    rating: 5,
    reviews: 19,
    description: "Hand-finished moonphase complication on a warm cream dial. Heirloom-grade.",
    sizes: watchSizes,
    variants: [{ name: "Cream", swatch: "#f0ebe0", image: watchMoonCream }],
  },
  {
    id: "sport-rubber-orange",
    name: "Sport Rubber",
    color: "Signal Orange",
    price: 230,
    category: "watches",
    image: watchSportOrange,
    altImage: watchSportOrange,
    rating: 4,
    reviews: 53,
    badge: "New",
    description: "Lightweight titanium-on-rubber sport with luminous markers. Built for motion.",
    sizes: watchSizes,
    variants: [{ name: "Signal Orange", swatch: "#e85d3a", image: watchSportOrange }],
  },
  {
    id: "skeleton-automatic-silver",
    name: "Skeleton Automatic",
    color: "Polished Silver",
    price: 640,
    category: "watches",
    image: watchSkeletonSilver,
    altImage: watchSkeletonSilver,
    rating: 5,
    reviews: 26,
    badge: "Limited",
    description:
      "Open-heart skeleton dial revealing a Swiss automatic movement. Engineering on display.",
    sizes: watchSizes,
    variants: [{ name: "Polished Silver", swatch: "#d9d9dc", image: watchSkeletonSilver }],
  },
  {
    id: "racing-chrono-white",
    name: "Racing Chrono",
    color: "Panda White",
    price: 410,
    category: "watches",
    image: watchRacingWhite,
    altImage: watchRacingWhite,
    rating: 5,
    reviews: 34,
    description: "Motorsport-inspired panda dial with tachymeter scale and pump pushers.",
    sizes: watchSizes,
    variants: [{ name: "Panda White", swatch: "#f5f3ee", image: watchRacingWhite }],
  },
  {
    id: "minimal-watch-tan",
    name: "Minimal Dress Watch",
    color: "Tan Strap",
    price: 220,
    category: "watches",
    image: watchMinimalTan,
    altImage: watchMinimalTan,
    rating: 4,
    reviews: 37,
    description: "Pared-back white dial with baton hands on a tan leather strap. Quiet design.",
    sizes: watchSizes,
    variants: [{ name: "Tan Strap", swatch: "#b97a3e", image: watchMinimalTan }],
  },
];

// Ensure all products have unique IDs. If duplicate IDs are detected, they are filtered out and a warning/error is logged.
const seenIds = new Set<string>();
export const products: Product[] = rawProducts.filter((p) => {
  if (seenIds.has(p.id)) {
    console.warn(
      `Duplicate product ID detected and ignored: "${p.id}". Ensure all product IDs are unique.`,
    );
    return false;
  }
  seenIds.add(p.id);
  return true;
});

export const categories: { id: Category; label: string }[] = [
  { id: "tees", label: "Tees" },
  { id: "hoodies", label: "Hoodies" },
  { id: "shoes", label: "Shoes" },
  { id: "watches", label: "Watches" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
