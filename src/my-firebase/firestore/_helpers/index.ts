import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  type CollectionReference,
  type DocumentData,
  type DocumentReference,
  type QuerySnapshot,
} from "firebase/firestore/lite";

import { firestore_file_system_names } from "../../_static-data/collections-and-docs";

import { firestore } from "~/my-firebase/client";

export const getCollectionRef = (
  collectionName: keyof (typeof firestore_file_system_names)["collections"],
) =>
  collection(
    firestore,
    firestore_file_system_names.collections[collectionName],
  );

export function getDocRef<
  TCollectionName extends keyof (typeof firestore_file_system_names)["collections"],
>(
  collectionName: TCollectionName,
  docId: TCollectionName extends keyof (typeof firestore_file_system_names)["docs"]
    ? (typeof firestore_file_system_names)["docs"][TCollectionName][keyof (typeof firestore_file_system_names)["docs"][TCollectionName]]
    : string,
) {
  const collection = firestore_file_system_names.collections[collectionName];

  return doc(firestore, collection, docId);
}

export async function getDocData(docRef: DocumentReference) {
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();

  return data;
}

export async function getCollectionData(collectionRef: CollectionReference) {
  const querySnapshot = await getDocs(collectionRef);

  const data: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    const d = doc.data();
    data.push(d);
  });

  return data;
}

export const fetchFirestoreDocuments = async (
  collectionKey: keyof typeof firestore_file_system_names.collections,
  docIds: string[],
) => {
  const idBatches: string[][] = [[]];

  docIds.forEach((id, i) => {
    const num = i + 1;
    const batchIndex = Math.floor(num / 10);

    if (idBatches[batchIndex]) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      idBatches[batchIndex]!.push(id);
    } else {
      idBatches[batchIndex] = [id];
    }
  });

  const promises: Promise<QuerySnapshot<DocumentData>>[] = [];

  idBatches.forEach((idBatch) => {
    const docsRefs = query(
      collection(
        firestore,
        firestore_file_system_names.collections[collectionKey],
      ),
      where("id", "in", idBatch),
    );
    const getDocsSnap = getDocs(docsRefs);

    promises.push(getDocsSnap);
  });

  const docsSnapBatches = await Promise.all(promises);
  const data = docsSnapBatches
    .flatMap((docSnap) => docSnap.docs)
    .map((doc) => doc.data());

  return data;
};
