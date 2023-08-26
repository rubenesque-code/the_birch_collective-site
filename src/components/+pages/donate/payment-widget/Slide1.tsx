import { Icon } from "~/components/icons";

import { ComponentCx } from "./_state";

const donationAmounts = [5, 10, 25, 50, 100, 250];

const Slide1 = () => {
  const { showAmountNotSelectedError, handleGoToSlide2 } = ComponentCx.use();

  return (
    <div className="grid columns-1 place-items-center rounded-sm border border-gray-300 pb-8 sm:pb-16">
      <div>
        <div className="mt-8 w-full">
          <p className="inline-block rounded-sm  bg-brandGreen p-2 text-white ">
            One-time
          </p>
        </div>
        <div className="mb-4 mt-8 grid grid-cols-3 gap-3">
          {donationAmounts.map((amount) => (
            <DonationButton amount={amount} key={`donation-amount_${amount}`} />
          ))}
        </div>
        <div>
          <CustomDonationInput />
        </div>
        <p
          className={`mt-xs text-red-500 transition-opacity ease-in-out ${
            showAmountNotSelectedError ? "opacity-100" : "opacity-0"
          }`}
        >
          Please select or enter an amount
        </p>
      </div>
      <button
        className="mt-5 flex items-center gap-1 rounded-sm bg-displayGreen px-6 py-2 text-xl font-bold text-white sm:px-10 sm:py-5"
        type="button"
        onClick={handleGoToSlide2}
      >
        <span>Continue</span>
        <Icon.ArrowRight weight="bold" />
      </button>
    </div>
  );
};

export default Slide1;

const DonationButton = ({ amount }: { amount: number }) => {
  const {
    donationAmount: selectedDonationAmount,
    setDonationAmount,
    setShowAmountNotSelectedError,
  } = ComponentCx.use();

  return (
    <button
      className={`rounded-md border-2 border-gray-300 px-6 py-2 text-xl font-semibold text-displayGreen transition-all ease-in-out sm:px-8 sm:py-4 ${
        amount === selectedDonationAmount ? "bg-gray-100" : ""
      }`}
      onClick={() => {
        setDonationAmount(amount);
        setShowAmountNotSelectedError(false);
      }}
      type="button"
    >
      £{amount}
    </button>
  );
};

const CustomDonationInput = () => {
  const {
    donationAmount: selectedDonationAmount,
    setDonationAmount,
    setShowAmountNotSelectedError,
  } = ComponentCx.use();

  return (
    <div className="relative flex flex-col">
      <label className="text-gray-400">Enter amount</label>

      <div className="relative">
        <input
          className="w-[300px] rounded-md border-2 border-gray-300 px-6 py-2 text-xl font-semibold text-displayGreen sm:px-10 sm:py-5"
          type="number"
          min={1}
          step={1}
          value={
            selectedDonationAmount === "not-selected"
              ? ""
              : selectedDonationAmount
          }
          onChange={(e) => {
            const value = Math.round(Number(e.target.value));

            setDonationAmount(value);

            setShowAmountNotSelectedError(false);
          }}
          placeholder="Custom amount"
        />
        <p className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-bold text-displayGreen">
          £
        </p>
      </div>
    </div>
  );
};
