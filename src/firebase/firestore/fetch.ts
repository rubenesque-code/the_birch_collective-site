import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore/lite";

import { firestore } from "~/firebase/client";
import { EditableLabels, OrgDetails } from "~/types/database";

const fetchSectionLabels = async () => {
  const docRef = doc(firestore, "editableElements", "names");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as EditableLabels["sections"];

  return data;
};

// td: restucture db?

const fetchOrgDetails = async () => {
  const collectionRef = collection(firestore, "orgDetails");
  const docsSnap = await getDocs(collectionRef);

  const data: DocumentData[] = [];
  docsSnap.forEach((doc) => {
    const d = doc.data();
    data.push(d);
  });

  return data[0] as OrgDetails;
};

export const myDb = {
  fetch: {
    editableLabels: {
      sections: fetchSectionLabels,
    },
    orgDetails: fetchOrgDetails,
  },
};
