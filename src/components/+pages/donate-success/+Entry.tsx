import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { BannerImage, Head } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import Body from "./body/+Entry";

import { PageFrame } from "~/frames";

const DonateSuccessPage = ({
  staticData: { footer, header, linkLabels, logoImage, orgDetails, page },
}: {
  staticData: StaticData;
}) => {
  return (
    <PageFrame
      head={<Head />}
      footer={footer}
      header={header}
      linkLabels={linkLabels}
      logoImage={logoImage}
      orgDetails={orgDetails}
    >
      <AwaitRouter>
        {({ routerQuery }) => (
          <HandleRouteParams routerQuery={routerQuery}>
            {({ payment_intent }) => (
              <HandlePayment payment_intent={payment_intent}>
                {({ donationAmount }) => (
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
                        donationAmount={donationAmount}
                      />
                    </Ui.Page.HorizontalSpace>
                  </>
                )}
              </HandlePayment>
            )}
          </HandleRouteParams>
        )}
      </AwaitRouter>
    </PageFrame>
  );
};

export default DonateSuccessPage;

function checkObjectHasField<T extends Record<string, unknown>>(obj: T) {
  const hasAKey = Object.keys(obj).length;

  return Boolean(hasAKey);
}

const AwaitRouter = ({
  children,
}: {
  children: (arg0: {
    routerQuery: Record<string, unknown>;
  }) => React.ReactElement;
}) => {
  const router = useRouter();

  if (!router.isReady) {
    return (
      <Ui.Page.HorizontalSpace>
        <Ui.Page.VerticalSpace />

        <p>Loading...</p>
      </Ui.Page.HorizontalSpace>
    );
  }

  return children({ routerQuery: router.query });
};

const HandleRouteParams = ({
  children,
  routerQuery,
}: {
  routerQuery: Record<string, unknown>;
  children: (arg0: { payment_intent: string }) => React.ReactElement;
}) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!routerQuery.payment_intent) {
      void router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerQuery]);

  if (!checkObjectHasField(router.query)) {
    return (
      <Ui.Page.HorizontalSpace>
        <Ui.Page.VerticalSpace />

        <p>Redirecting...</p>
      </Ui.Page.HorizontalSpace>
    );
  }

  if (!routerQuery.payment_intent) {
    return (
      <Ui.Page.HorizontalSpace>
        <Ui.Page.VerticalSpace />

        <p>Loading...</p>
      </Ui.Page.HorizontalSpace>
    );
  }

  return children({ payment_intent: routerQuery.payment_intent as string });
};

function convert(pennies: number) {
  return (
    "£" +
    (Number(pennies / 100) || 0)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}

const HandlePayment = ({
  payment_intent,
  children,
}: {
  payment_intent: string;
  children: (arg0: { donationAmount: string }) => React.ReactElement;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, error, isLoading } = useSWR(
    payment_intent ? `/api/payment_intents/${payment_intent}` : null,
    (url: string) => fetch(url).then((res) => res.json()),
  );

  if (error) {
    return (
      <Ui.Page.HorizontalSpace>
        <Ui.Page.VerticalSpace />

        <p>Something went wrong...</p>
        <p className="mt-sm">
          If you made a payment, it may or may not have gone through.
        </p>
        <p className="mt-sm">
          Any questions, please don&apos;t hesitate to send us an email.
        </p>
      </Ui.Page.HorizontalSpace>
    );
  }

  if (isLoading || !data) {
    return (
      <Ui.Page.HorizontalSpace>
        <Ui.Page.VerticalSpace />

        <p>Loading payment data...</p>
      </Ui.Page.HorizontalSpace>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!data?.payment_intent?.amount) {
    return (
      <Ui.Page.HorizontalSpace>
        <Ui.Page.VerticalSpace />

        <p>Something went wrong...</p>
        <p className="mt-sm">
          If you made a payment, it may or may not have gone through.
        </p>
        <p className="mt-sm">
          Any questions, please don&apos;t hesitate to send us an email.
        </p>
      </Ui.Page.HorizontalSpace>
    );
  }

  return children({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    donationAmount: convert(data.payment_intent.amount as number),
  });
};
