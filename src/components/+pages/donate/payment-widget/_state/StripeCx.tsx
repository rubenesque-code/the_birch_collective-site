import React from "react";
import { type PaymentIntent, type Stripe } from "@stripe/stripe-js";
import {
  useMutation,
  useQuery,
  type UseMutationResult,
  type UseQueryResult,
} from "react-query";

import { fetchPostJSON } from "~/helpers/api";
import { myLoadStripe } from "~/lib/stripe";

type ContextValue = {
  paymentIntentMutation: UseMutationResult<
    PaymentIntent,
    unknown,
    { amount: number }
  >;
  loadStripeQuery: UseQueryResult<Stripe | null, unknown>;
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
}) => {
  const paymentIntentMutation = useMutation(
    async (input: { amount: number }) =>
      (await fetchPostJSON("/api/payment_intents", {
        amount: input.amount,
      })) as Promise<PaymentIntent>,
    {},
  );

  const loadStripeQuery = useQuery("load-stripe", myLoadStripe);

  React.useEffect(() => {
    // · initiate
    if (!paymentIntentMutation.isIdle) {
      return;
    }

    paymentIntentMutation.mutate({ amount: 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: ContextValue = {
    paymentIntentMutation: paymentIntentMutation,
    loadStripeQuery,
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("StripeCx.use must be used within its provider!");
  }

  return context;
};

function StripeCx() {
  throw new Error(
    "StripeCx exists for naming purposes only and should not be used as a component",
  );
}

export { StripeCx };

StripeCx.Provider = Provider;
StripeCx.use = useContext;