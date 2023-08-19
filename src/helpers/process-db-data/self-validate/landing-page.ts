import { produce } from "immer";

import type { MyDb } from "~/types/database";

export const landingPage = (input: MyDb["pages"]["landing"]) => {
  return produce(input, (draft) => {
    draft.aboutUs.entries = draft.aboutUs.entries.filter(
      (entry) => entry.text.length,
    );
  });
};
