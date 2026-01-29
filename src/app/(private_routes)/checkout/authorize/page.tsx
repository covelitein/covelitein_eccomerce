import { Suspense } from "react";
import CheckoutAuthorizeClient from "@/sections/checkout/CheckoutAuthorizeClient";

export const dynamic = "force-dynamic";

export default function CheckoutAuthorizePage() {
  return (
    <section className="px-4 py-6">
      <Suspense fallback={<div className="text-gray-500">Loading checkout...</div>}>
        <CheckoutAuthorizeClient />
      </Suspense>
    </section>
  );
}
