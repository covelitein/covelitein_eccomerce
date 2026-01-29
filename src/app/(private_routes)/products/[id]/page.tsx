import { products } from "@/constants/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <section className="px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">Product Details</p>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-blue-100 text-blue-700">{product.category}</Badge>
            <Badge className="bg-green-100 text-green-700">
              ${product.price.toFixed(2)}
            </Badge>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="rounded-xl border bg-gray-50 p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              What&apos;s included
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li>• Premium quality assurance check</li>
              <li>• Fast delivery within 2-4 business days</li>
              <li>• 30-day return policy</li>
              <li>• Dedicated customer support</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-green-500 text-white hover:bg-green-600">
              Add to Cart
            </Button>
            <Button variant="outline" asChild>
              <Link href="/checkout">Buy now</Link>
            </Button>
            <Button variant="outline">Save to Wishlist</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
