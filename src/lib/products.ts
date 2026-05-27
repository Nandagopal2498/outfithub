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
}

export const products: Product[] = [
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
    sizes: ["XS", "S", "M", "L", "XL"],
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
    sizes: ["XS", "S", "M", "L", "XL"],
  },
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
    sizes: ["S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL"],
  },
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
    sizes: ["8", "9", "10", "11", "12"],
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
    sizes: ["8", "9", "10", "11", "12"],
  },
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
    sizes: ["One Size"],
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
    sizes: ["One Size"],
  },
];

export const categories: { id: Category; label: string }[] = [
  { id: "tees", label: "Tees" },
  { id: "hoodies", label: "Hoodies" },
  { id: "shoes", label: "Shoes" },
  { id: "watches", label: "Watches" },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
