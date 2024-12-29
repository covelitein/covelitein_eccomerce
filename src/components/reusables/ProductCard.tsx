import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function TrendingProductCard() {
  return (
    <Card className="">
      <CardHeader className="p-0 overflow-hidden border-0 relative">
        <img
          src="https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/76/1629283/1.jpg?8194"
          alt=""
          className="h-40 rounded-md object-contain"
        />
        <div className="absolute bg-white p-2 rounded-md bottom-5 left-5 right-5 border">
            Samsung Galaxy A12
        </div>
      </CardHeader>
    </Card>
  );
}
