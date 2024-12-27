import { Step } from "@/types";
import { PackageCheck, Star, Tag, Truck } from "lucide-react";
import { ReactNode } from "react";

export const loginSlides: { img: string; desc: string }[] = [
  {
    img: "/illustrations/hc.png",
    desc: "Welcome to Coveliteins Eccomerce collections! Shop the latest trends with ease and convenience.",
  },
  {
    img: "/illustrations/da.png",
    desc: "Enjoy fast and reliable delivery on every order. Get your products delivered to your doorsteps!",
  },
  {
    img: "/illustrations/discount.png",
    desc: "Don&apos;t miss out on exclusive discounts and unbeatable offers!",
  },
  {
    img: "/illustrations/cuc.png",
    desc: "Have questions? Our 24/7 customer support is here to help.",
  },
  {
    img: "/illustrations/cc.png",
    desc: "Shop with confidence—your payments are secure with us.",
  },
];

export const userStats: {
  icon: ReactNode;
  textColor: string;
  bgColor: string;
  title: string;
  count: number;
}[] = [
  {
    icon: <Truck />,
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "Orders in Transit",
    count: 2,
  },
  {
    icon: <PackageCheck />,
    textColor: "text-green-600",
    bgColor: "bg-green-50",
    title: "Delivered Orders",
    count: 12,
  },
  {
    icon: <Tag />,
    textColor: "text-yellow-600",
    bgColor: "bg-yellow-50",
    title: "Active Coupons",
    count: 3,
  },
  {
    icon: <Star />,
    textColor: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "Reward Points",
    count: 1200,
  },
];
