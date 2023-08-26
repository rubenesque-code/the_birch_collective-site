import React from "react";

import { SwiperApiCx } from "../swiper-base/_state";

type DonationAmount = "not-selected" | number;

type ContextValue = {
  donationAmount: DonationAmount;
  setDonationAmount: (arg0: DonationAmount) => void;
  handleGoToSlide2: () => void;
  showAmountNotSelectedError: boolean;
  setShowAmountNotSelectedError: (arg0: boolean) => void;
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
}) => {
  const [donationAmount, setDonationAmount] =
    React.useState<DonationAmount>("not-selected");
  const [showAmountNotSelectedError, setShowAmountNotSelectedError] =
    React.useState(false);

  const { goToSlide } = SwiperApiCx.use();

  const handleGoToSlide2 = () => {
    if (donationAmount === "not-selected") {
      setShowAmountNotSelectedError(true);
      return;
    }

    goToSlide(1);
  };

  const value: ContextValue = {
    donationAmount,
    setDonationAmount,
    handleGoToSlide2,
    showAmountNotSelectedError,
    setShowAmountNotSelectedError,
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
    throw new Error("ComponentCx.use must be used within its provider!");
  }

  return context;
};

function ComponentCx() {
  throw new Error(
    "ComponentCx exists for naming purposes only and should not be used as a component",
  );
}

export { ComponentCx as ComponentCx };

ComponentCx.Provider = Provider;
ComponentCx.use = useContext;
