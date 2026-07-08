import knotless from "@/assets/style-knotless.jpg";
import boho from "@/assets/style-boho.jpg";
import stitch from "@/assets/style-stitch.jpg";
import kids from "@/assets/style-kids.jpg";
import locs from "@/assets/style-locs.jpg";
import pony from "@/assets/style-ponytail.jpg";
import prodEdge from "@/assets/product-edge.jpg";
import prodHair from "@/assets/product-hair.jpg";
import prodBonnet from "@/assets/product-bonnet.jpg";
import prodOil from "@/assets/product-oil.jpg";

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  hairIncluded?: boolean;
};

export const SERVICE_CATEGORIES = [
  "All Services",
  "Knotless Braids",
  "Boho Braids",
  "Stitch Braids",
  "Feed-In Styles",
  "Kids Braids",
  "Loc Styles",
  "Ponytail Styles",
  "Add-Ons",
] as const;

export const services: Service[] = [
  { id: "knotless-medium", name: "Medium Knotless Braids", category: "Knotless Braids", description: "Lightweight, tension-free medium knotless braids. Waist length included.", price: 220, duration: "5–6 hrs", image: knotless, hairIncluded: true },
  { id: "knotless-small", name: "Small Knotless Braids", category: "Knotless Braids", description: "Delicate small knotless braids for a refined finish.", price: 280, duration: "7–8 hrs", image: knotless, hairIncluded: true },
  { id: "boho-braids", name: "Boho Braids", category: "Boho Braids", description: "Knotless braids with curly, wavy ends for that effortless boho glow.", price: 260, duration: "6–7 hrs", image: boho, hairIncluded: true },
  { id: "stitch-braids", name: "Stitch Braids", category: "Stitch Braids", description: "Crisp, clean stitch cornrows — up to 8 braids.", price: 120, duration: "2–3 hrs", image: stitch, hairIncluded: false },
  { id: "feed-in", name: "Feed-In Braids", category: "Feed-In Styles", description: "Classic sleek feed-ins with your choice of design.", price: 140, duration: "3 hrs", image: stitch, hairIncluded: true },
  { id: "kids-braids", name: "Kids Braids (12 & Under)", category: "Kids Braids", description: "Gentle, protective styles for little ones. Beads included.", price: 90, duration: "2 hrs", image: kids, hairIncluded: true },
  { id: "loc-retwist", name: "Loc Retwist & Style", category: "Loc Styles", description: "Retwist, condition, and finish your locs with a signature style.", price: 110, duration: "2 hrs", image: locs },
  { id: "braided-ponytail", name: "Braided Ponytail", category: "Ponytail Styles", description: "Sleek, snatched braided ponytail — event ready.", price: 130, duration: "2 hrs", image: pony, hairIncluded: true },
  { id: "addon-beads", name: "Add-On: Beads & Charms", category: "Add-Ons", description: "Personalize your style with beads, cuffs, or charms.", price: 20, duration: "20 min", image: kids },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

export const PRODUCT_CATEGORIES = [
  "All",
  "Braiding Hair",
  "Edge Control",
  "Hair Care",
  "Bonnets & Scarves",
  "Accessories",
  "Gift Cards",
] as const;

export const products: Product[] = [
  { id: "edge-control", name: "Signature Edge Control", price: 18, category: "Edge Control", image: prodEdge, description: "Non-flaking, all-day hold. Cast that lay from morning till after-party." },
  { id: "braiding-hair", name: "Premium Braiding Hair", price: 12, category: "Braiding Hair", image: prodHair, description: "Pre-stretched, itch-free braiding hair — 26 inches." },
  { id: "silk-bonnet", name: "Silk Sleep Bonnet", price: 24, category: "Bonnets & Scarves", image: prodBonnet, description: "100% mulberry silk. Protects your style while you sleep." },
  { id: "hair-oil", name: "Scalp & Braid Oil", price: 28, category: "Hair Care", image: prodOil, description: "Rosemary + jojoba blend to soothe your scalp between washes." },
  { id: "gift-card-50", name: "$50 Gift Card", price: 50, category: "Gift Cards", image: prodEdge, description: "The gift of good hair. Redeemable in-studio and online." },
  { id: "gift-card-100", name: "$100 Gift Card", price: 100, category: "Gift Cards", image: prodOil, description: "For the friend who deserves the full experience." },
];

export const lookbook = [
  { id: 1, image: knotless, category: "Knotless" },
  { id: 2, image: boho, category: "Boho" },
  { id: 3, image: stitch, category: "Stitch" },
  { id: 4, image: kids, category: "Kids" },
  { id: 5, image: pony, category: "Ponytails" },
  { id: 6, image: locs, category: "Locs" },
];

export const BOOKING_FEE = 50;
