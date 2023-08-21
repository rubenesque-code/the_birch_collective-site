import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2023-08-16",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const payment_intent = await stripe.paymentIntents.retrieve(id as string);
  res.status(200).json({ payment_intent });
};
