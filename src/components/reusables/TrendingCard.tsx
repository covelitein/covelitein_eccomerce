import React from "react";
import { ChevronLeft, ChevronRight, DollarSign, Flame } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { StarRating } from "./StarRatings";

interface TrendingProductCardProps {
  product: Product;
}

export function TrendingCard({ product }: TrendingProductCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white">
            <Flame className="w-4 h-4" />
            {product.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge>
            <DollarSign className="w-4 h-4" />
            {product.price}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="mt-2 mb-3">
          <Button className="h-7 w-full">
            view
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
