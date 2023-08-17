import { produce } from "immer";

export function deepSortByIndex<TDoc extends { index: number }>(docs: TDoc[]) {
  return produce(docs, (draft) => draft.sort((a, b) => a.index - b.index));
}

export function sortByIndex<TEntity extends { index: number }>(
  a: TEntity,
  b: TEntity,
) {
  return a.index - b.index;
}
