import { type MyExclude } from "~/types/utilities";

export type DocPartialWithId<TDoc extends { id: string }> = {
  id: string;
} & Partial<TDoc>;

export type ExcludeNotInUse<TData extends string | Record<string, unknown>> =
  MyExclude<TData, "not in use">;
