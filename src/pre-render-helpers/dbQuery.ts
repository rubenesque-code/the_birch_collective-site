import { myDb } from "~/my-firebase/firestore";

export const queryForCommonData = async () => {
  const footer = await myDb.footer.fetch();
  const header = await myDb.header.fetch();
  const linkLabels = await myDb.linkLabels.fetch();
  const orgDetails = await myDb.orgDetails.fetch();

  return { footer, header, linkLabels, orgDetails };
};
