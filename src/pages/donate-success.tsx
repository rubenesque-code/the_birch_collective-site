import { type StaticData } from "~/components/+pages/donate/_static-data";
import Content from "~/components/+pages/donate/+Entry";

export { getStaticProps } from "~/components/+pages/donate/_static-data";

const Page = () => {
  <div>Donate Success</div>;
  // return <Content staticData={staticData} />;
};

export default Page;

// elements.submit() must be called before stripe.confirmPayment(). Call elements.submit() as soon as your customer presses pay, prior to any asynchronous work. Integration guide: https://stripe.com/docs/payments/accept-a-payment-deferred
