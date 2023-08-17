import { produce } from "immer";

export function deepSortByIndex<TDoc extends { index: number }>(docs: TDoc[]) {
  return produce(docs, (draft) => draft.sort((a, b) => a.index - b.index));
}
