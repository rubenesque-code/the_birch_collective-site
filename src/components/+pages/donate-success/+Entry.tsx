import { useRouter } from "next/router";
import useSWR from "swr";

import { BannerImage, Head } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import Body from "./body/+Entry";

import { PageFrame } from "~/frames";

function convert(pennies: number) {
  return (
    "£" +
    (Number(pennies / 100) || 0)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

const DonateSuccessPage = ({
  staticData: { footer, header, linkLabels, logoImage, orgDetails, page },
}: {
  staticData: StaticData;
}) => {
  const router = useRouter();

  const { payment_intent } = router.query;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSWR(
    payment_intent ? `/api/payment_intents/${payment_intent as string}` : null,
    (url: string) => fetch(url).then((res) => res.json()),
  );

  return (
    <PageFrame
      head={<Head />}
      footer={footer}
      header={header}
      linkLabels={linkLabels}
      logoImage={logoImage}
      orgDetails={orgDetails}
    >
      {error ? (
        <Ui.Page.HorizontalSpace>
          <Ui.Page.VerticalSpace />

          <p>Something went wrong...</p>
        </Ui.Page.HorizontalSpace>
      ) : isLoading || !data ? (
        <Ui.Page.HorizontalSpace>
          <Ui.Page.VerticalSpace />

          <p>Loading payment data...</p>
        </Ui.Page.HorizontalSpace>
      ) : (
        <>
          {page.bannerImage === "not in use" ? null : (
            <div className="relative">
              <BannerImage data={page.bannerImage} />

              <div className="absolute bottom-0 top-1/2">
                <Ui.Page.HorizontalSpace>
                  <Ui.Page.Heading className="text-white">
                    {page.heading}
                  </Ui.Page.Heading>
                </Ui.Page.HorizontalSpace>
              </div>
            </div>
          )}

          {page.bannerImage === "not in use" ? (
            <>
              <Ui.Section.VerticalSpace />

              <Ui.Page.HorizontalSpace>
                <Ui.Page.Heading className="text-brandGreen">
                  {page.heading}
                </Ui.Page.Heading>
              </Ui.Page.HorizontalSpace>
            </>
          ) : null}

          <Ui.Page.VerticalSpace />

          <Ui.Page.HorizontalSpace>
            <Body
              {...page.body}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              donationAmount={convert(data.payment_intent.amount as number)}
            />
          </Ui.Page.HorizontalSpace>
        </>
      )}
    </PageFrame>
  );
};

export default DonateSuccessPage;
