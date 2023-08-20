import type { GetStaticProps } from "next";

import processDbData from "~/helpers/process-db-data";
import { myDb } from "~/my-firebase/firestore";
import type { MyDb } from "~/types/database";

export type StaticData = {
  footer: MyDb["singles"]["footer"];
  header: MyDb["singles"]["header"];
  linkLabels: MyDb["singles"]["linkLabels"];
  orgDetails: MyDb["singles"]["orgDetails"];
  logoImage: MyDb["image"] | null;

  page: ReturnType<(typeof processDbData)["testimonialsPage"]["crossProcess"]>;

  participantTestimonials: ReturnType<
    (typeof processDbData)["participantTestimonial"]["crossProcess"]["many"]
  >;
  professionalTestimonials: ReturnType<
    (typeof processDbData)["professionalTestimonial"]["crossProcess"]["many"]
  >;
};

export const getStaticProps: GetStaticProps<StaticData> = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  const page = await myDb.pages.testimonials.fetch();

  const connectedDocsFetched = {
    participantTestimonials: await myDb["participant-testimonial"].fetchAll(),
    professionalTestimonials: await myDb["professional-testimonial"].fetchAll(),
  };

  const connectedDocsSelfValidated = {
    participantTestimonials:
      processDbData.participantTestimonial.selfValidate.many(
        connectedDocsFetched.participantTestimonials,
      ),
    professionalTestimonials:
      processDbData.professionalTestimonial.selfValidate.many(
        connectedDocsFetched.professionalTestimonials,
      ),
  };

  const connectedImageIds = [
    orgDetails.logoImage.dbConnections.imageId,

    page.bannerImage.dbConnections.imageId,

    ...connectedDocsSelfValidated.participantTestimonials.map(
      (doc) => doc.image.dbConnect.imageId,
    ),

    ...connectedDocsSelfValidated.professionalTestimonials.map(
      (doc) => doc.image.dbConnections.imageId,
    ),
  ].flatMap((i) => (i ? [i] : []));

  const connectedImages = await myDb.image.fetchMany(connectedImageIds);

  const connectedDocsProcessed = {
    participantTestimonials:
      processDbData.participantTestimonial.crossProcess.many(
        connectedDocsSelfValidated.participantTestimonials,
        { images: connectedImages },
      ),
    professionalTestimonials:
      processDbData.professionalTestimonial.crossProcess.many(
        connectedDocsSelfValidated.professionalTestimonials,
        { images: connectedImages },
      ),
  };

  const pageCrossProcessed = processDbData.testimonialsPage.crossProcess(page, {
    images: connectedImages,
  });

  const logoImage =
    connectedImages.find(
      (image) => image.id === orgDetails.logoImage.dbConnections.imageId,
    ) || null;

  const data: StaticData = {
    footer,
    header,
    linkLabels,
    orgDetails,
    logoImage,

    page: pageCrossProcessed,

    participantTestimonials: connectedDocsProcessed.participantTestimonials,
    professionalTestimonials: connectedDocsProcessed.professionalTestimonials,
  };

  return {
    props: data,
  };
};
