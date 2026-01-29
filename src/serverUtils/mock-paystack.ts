import crypto from "crypto";

export type MockPaystackInitializePayload = {
  email: string;
  amount: number;
  currency?: string;
  metadata?: Record<string, unknown>;
};

export const createMockPaystackReference = () =>
  `PSK_${Date.now()}_${crypto.randomBytes(6).toString("hex")}`;

export const buildMockPaystackResponse = (
  reference: string,
  payload: MockPaystackInitializePayload
) => {
  const amountInKobo = Math.round(payload.amount * 100);
  return {
    reference,
    authorizationUrl: `/checkout/authorize?reference=${reference}`,
    amount: payload.amount,
    amountInKobo,
    currency: payload.currency ?? "NGN",
  };
};
