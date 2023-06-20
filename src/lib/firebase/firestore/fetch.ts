import { doc, getDoc } from "firebase/firestore/lite";

import { firestore } from "~/firebase/client";
import { EditableLabels } from "~/types/database";

const fetchSectionLabels = async () => {
  const docRef = doc(firestore, "editableElements", "names");
  const docSnap = await getDoc(docRef);
  const data = docSnap.data() as EditableLabels["sections"];

  return data;
};

export const myDb = {
  fetch: {
    editableLabels: {
      sections: fetchSectionLabels,
    },
  },
};
