import { BannerImage, Head } from "~/components/sections";
import Ui from "~/components/ui-elements";

import { type StaticData } from "./_static-data";
import Body from "./body/+Entry";
import PaymentWidget from "./payment-widget/+Entry";

import { PageFrame } from "~/frames";

const DonatePage = ({
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

      <Ui.Section.VerticalSpace />

      <Ui.Page.HorizontalSpace>
        <PaymentWidget />
      </Ui.Page.HorizontalSpace>

      <Ui.Section.VerticalSpace />

      <Ui.Page.HorizontalSpace>
        <Body {...page.body} />
      </Ui.Page.HorizontalSpace>
    </PageFrame>
  );
};

export default DonatePage;
