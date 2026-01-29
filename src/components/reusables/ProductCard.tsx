import React from "react";
import { ChevronRight, DollarSign, Flame, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  return (
    <Card className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image Section */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white flex items-center">
            <Flame className="w-4 h-4 mr-1" />
            {product.category}
          </Badge>
        </div>
        {/* Price Badge */}
        <div className="absolute bottom-3 right-3">
          <Badge className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {product.price}
          </Badge>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {product.name}
        </h3>

        {/* Product Actions */}
        <div className="mt-4 flex justify-between items-center">
          {/* Add to Cart Button */}
          <Button
            className="h-9 w-32 bg-green-500 text-white hover:bg-green-600 text-sm"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-1" />
            Add to Cart
          </Button>

          {/* View Details Button */}
          <Button
            variant="ghost"
            className="h-9 w-32 text-blue-500 hover:underline flex justify-center items-center text-sm"
            onClick={() => onViewDetails(product.id)}
          >
            View Details
            <ChevronRight className="ml-1" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
