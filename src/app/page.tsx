import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProductsWithFallback } from "@/serverUtils/catalog";
import Link from "next/link";

export default async function HomePage() {
  const products = await getProductsWithFallback();
  return (
    <main className="bg-white text-gray-900">
      <section className="px-6 py-16 sm:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="bg-blue-100 text-blue-700">New season drop</Badge>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Discover products that match your everyday essentials.
            </h1>
            <p className="mt-4 text-gray-600">
              CoveliteinsHub brings curated collections, fast delivery, and
              secure checkout—all in one seamless shopping experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/login">Start shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Create account</Link>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 sm:px-10 lg:px-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Fast, tracked delivery",
              description:
                "Get order updates in real time and enjoy reliable shipping.",
            },
            {
              title: "Secure payments",
              description:
                "Multiple payment options with end-to-end encryption.",
            },
            {
              title: "Personalized support",
              description:
                "Our team is ready to help you find the perfect items.",
            },
          ].map((feature) => (
            <Card key={feature.title} className="p-6">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
