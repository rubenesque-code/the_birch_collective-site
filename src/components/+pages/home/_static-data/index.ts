import type { GetStaticProps } from "next";

import dbData from "~/helpers/static-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

export type StaticData = {
  staticData: {
    footer: MyDb["singles"]["footer"];
    header: MyDb["singles"]["header"];
    linkLabels: MyDb["singles"]["linkLabels"];
    orgDetails: MyDb["singles"]["orgDetails"];

    page: ReturnType<(typeof dbData)["crossProcess"]["landingPage"]>;

    participantTestimonials: MyDb["participant-testimonial"][];
    partners: MyDb["partner"][];
    programmes: MyDb["programme"][];
    supporters: MyDb["supporter"][];

    images: MyDb["image"][];
  };
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  const page = await myDb.pages.landing.fetch();

  const participantTestimonials = await myDb[
    "participant-testimonial"
  ].fetchAll();
  const participantTestimonialsSelfValidated = participantTestimonials.filter(
    dbData.selfValidate.participantTestimonial,
  );

  const pagePartnerIds = page.partners.entries.map(
    (entry) => entry.dbConnections.partnerId,
  );
  const partners = await myDb.partner.fetchMany(pagePartnerIds);
  const partnersSelfValidated = partners.filter(dbData.selfValidate.partner);

  const pageProgrammeIds = page.programmes.entries.map(
    (entry) => entry.dbConnections.programmeId,
  );
  const programmes = await myDb.programme.fetchMany(pageProgrammeIds);
  const programmesSelfValidated = programmes.filter(
    dbData.selfValidate.programme,
  );

  const pageSupporterIds = page.supporters.entries.map(
    (entry) => entry.dbConnections.supporterId,
  );
  const supporters = await myDb.supporter.fetchMany(pageSupporterIds);
  const supportersSelfValidated = supporters.filter(
    dbData.selfValidate.supporter,
  );

  const pageImageIds = [
    orgDetails.logoImage.dbConnections.imageId,
    page.bannerImage.dbConnections.imageId,
    page.workshops.image.dbConnections.imageId,
    page.supportUs.donate.image.dbConnections.imageId,
    page.supportUs.volunteer.image.dbConnections.imageId,
    ...partnersSelfValidated.map(
      (partner) => partner.image.dbConnections.imageId,
    ),
    ...programmesSelfValidated.map(
      (programme) => programme.bannerImage.dbConnections.imageId,
    ),
    ...programmesSelfValidated.map(
      (programme) => programme.summary.image.dbConnections.imageId,
    ),
    ...supportersSelfValidated.map(
      (supporter) => supporter.image.dbConnections.imageId,
    ),
  ].flatMap((i) => (i ? [i] : []));

  const pageImages = await myDb.image.fetchMany(pageImageIds);

  const participantTestimonialsValid =
    participantTestimonialsSelfValidated.filter((partcipantTestimonial) =>
      dbData.crossValidate.participantTestimonial({
        partcipantTestimonial,
        connectedDocs: { images: pageImages },
      }),
    );
  const partnersValid = partnersSelfValidated.filter((partner) =>
    dbData.crossValidate.partner({
      partner,
      connectedDocs: { images: pageImages },
    }),
  );
  const programmesValid = programmesSelfValidated.filter((programme) =>
    dbData.crossValidate.programme({
      programme,
      connectedDocs: { images: pageImages },
    }),
  );
  const supportersValid = supportersSelfValidated.filter((supporter) =>
    dbData.crossValidate.supporter({
      supporter,
      connectedDocs: { images: pageImages },
    }),
  );

  const pageSelfProcessed = dbData.selfProcess.landingPage(page);
  const pageCrossProcessed = dbData.crossProcess.landingPage({
    landingPage: pageSelfProcessed,
    connectedDocs: {
      images: pageImages,
      partners: partnersValid,
      programmes: programmesValid,
      supporters: supportersValid,
    },
  });

  const data: StaticData["staticData"] = {
    footer,
    header,
    linkLabels,
    orgDetails,

    page: pageCrossProcessed,

    participantTestimonials: participantTestimonialsValid,
    partners: partnersValid,
    programmes: programmesValid,
    supporters: supportersValid,

    images: pageImages,
  };

  return {
    props: {
      staticData: data,
    },
  };
};
