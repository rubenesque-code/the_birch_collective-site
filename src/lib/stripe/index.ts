import { loadStripe } from "@stripe/stripe-js";

const myLoadStripe = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const stripe = await loadStripe(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return stripe;
};

export { myLoadStripe };
