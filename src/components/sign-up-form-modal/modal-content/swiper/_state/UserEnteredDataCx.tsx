import React from "react";
import { useQuery } from "react-query";
import { useImmer, type Updater as ImmerUpdater } from "use-immer";

import { validateEmail, validatePhoneNumber } from "~/helpers/form";
import { myDb } from "~/my-firebase/firestore";

type DateOfBirth = { day: number; month: number; year: number };
type Address = {
  line1: string;
  line2: string;
  townOrcity: string;
  postcode: string;
};
type EmergencyContact = {
  name: string;
  phoneNumber: string;
  relationship: string;
};
type Identity = {
  label: string;
  isSelected: boolean;
};
type Gender = {
  label: string;
  isSelected: boolean;
};
type Event = {
  label: string;
  isSelected: boolean;
};
type Sources = {
  entries: {
    label: string;
    isSelected: boolean;
  }[];
  medicalProDetails: string;
  otherDetails: string;
};

type StateUpdater<T> = (newValue: T) => void;

type ContextValue = {
  name: {
    value: string;
    update: StateUpdater<string>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  dob: {
    value: DateOfBirth;
    update: ImmerUpdater<DateOfBirth>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  email: {
    value: string;
    update: StateUpdater<string>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  phoneNumber: {
    value: string;
    update: StateUpdater<string>;

    isRequired: boolean;
    isValid: boolean | null;
  };
  address: {
    value: Address;
    update: ImmerUpdater<Address>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  emergencyContact: {
    value: EmergencyContact;
    update: ImmerUpdater<EmergencyContact>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  identities: {
    value: Identity[];
    update: ImmerUpdater<Identity[]>;

    isRequired: boolean;
    isValid: boolean | null;
  };
  ethnicity: {
    value: string;
    update: StateUpdater<string>;

    isRequired: boolean;
    isValid: boolean | null;
  };
  genders: {
    value: Gender[];
    update: ImmerUpdater<Gender[]>;

    isRequired: boolean;
    isValid: boolean | null;
  };
  healthIssues: {
    value: string;
    update: StateUpdater<string>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  lifeSavingMedications: {
    value: string;
    update: StateUpdater<string>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  events: {
    value: Event[];
    update: ImmerUpdater<Event[]>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  hopeToGet: {
    value: string;
    update: StateUpdater<string>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  referralInfo: {
    value: string;
    update: StateUpdater<string>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  sources: {
    value: Sources;
    update: ImmerUpdater<Sources>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  receiveNewsLetter: {
    value: boolean | null;
    update: StateUpdater<boolean | null>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  imagePermission: {
    value: boolean | null;
    update: StateUpdater<boolean | null>;
    isRequired: boolean;
    isValid: boolean | null;
  };
  fresh_air_thursday_text_opt_in_Permission: {
    value: boolean | null;
    update: StateUpdater<boolean | null>;
    isRequired: boolean;
    isValid: boolean | null;
  };
};

const Context = React.createContext<ContextValue | null>(null);

const Provider = ({
  children,
}: {
  children: React.ReactNode | ((args: ContextValue) => React.ReactNode);
}) => {
  const name = React.useState("");
  const dob = useImmer<DateOfBirth>({
    day: 0,
    month: 0,
    year: 2000,
  });
  const email = React.useState("");
  const phoneNumber = React.useState("");
  const address = useImmer<Address>({
    line1: "",
    line2: "",
    townOrcity: "",
    postcode: "",
  });
  const emergencyContact = useImmer<EmergencyContact>({
    name: "",
    phoneNumber: "",
    relationship: "",
  });
  const identities = useImmer<Identity[]>([
    {
      label: "working class",
      isSelected: false,
    },

    {
      label: "someone with a disablity",
      isSelected: false,
    },

    {
      label: "male or male identifying",
      isSelected: false,
    },

    {
      label: "care experienced",
      isSelected: false,
    },

    {
      label: "lgbtq+",
      isSelected: false,
    },

    {
      label: "english as a second language",
      isSelected: false,
    },

    {
      label: "black or a person of colours",
      isSelected: false,
    },

    {
      label: "unemployed or not in education or training",
      isSelected: false,
    },

    {
      label: "none of the above",
      isSelected: false,
    },
  ]);
  const ethnicity = React.useState("");
  const genders = useImmer<Gender[]>([
    {
      label: "girl/woman/female",
      isSelected: false,
    },

    {
      label: "boy/man/male",
      isSelected: false,
    },

    {
      label: "non-binary",
      isSelected: false,
    },

    {
      label: "queer",
      isSelected: false,
    },

    {
      label: "other",
      isSelected: false,
    },

    {
      label: "prefer not to say",
      isSelected: false,
    },
  ]);
  const healthIssues = React.useState("");
  const lifeSavingMedications = React.useState("");
  const events = useImmer<Event[]>([]);
  const hopeToGet = React.useState("");
  const referralInfo = React.useState("");
  const sources = useImmer<Sources>({
    entries: [
      {
        label: "The Birch Collective social media",
        isSelected: false,
      },
      {
        label: "Other social media",
        isSelected: false,
      },
      {
        label: "Web search",
        isSelected: false,
      },
      {
        label: "Teacher",
        isSelected: false,
      },
      {
        label: "GP or other medical professional",
        isSelected: false,
      },
      {
        label: "Friend",
        isSelected: false,
      },
      {
        label: "Parent or carer",
        isSelected: false,
      },
      {
        label: "Other",
        isSelected: false,
      },
    ],
    medicalProDetails: "",
    otherDetails: "",
  });
  const receiveNewsLetter = React.useState<boolean | null>(null);
  const imagePermission = React.useState<boolean | null>(null);
  const fresh_air_thursday_text_opt_in_Permission = React.useState<
    boolean | null
  >(null);

  const programmesQuery = useQuery("programmes", myDb.programme.fetchAll);
  const workshopsQuery = useQuery("workshops", myDb.workshop.fetchAll);

  React.useEffect(() => {
    if (
      programmesQuery.isError ||
      !programmesQuery.data ||
      workshopsQuery.isError ||
      !workshopsQuery.data ||
      events[0].length
    ) {
      return;
    }

    const programmes = programmesQuery.data
      .filter((programme) => programme.title.length)
      .map((programme) => ({
        label: programme.title,
        isSelected: false,
      }));

    const workshops = workshopsQuery.data
      .filter((workshop) => workshop.type === "free" && workshop.title.length)
      .map((workshop) => ({
        label: workshop.title,
        isSelected: false,
      }));

    const myEvents = [...programmes, ...workshops];

    events[1](myEvents);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programmesQuery, workshopsQuery]);

  const value: ContextValue = {
    name: {
      value: name[0],
      update: name[1],
      isRequired: true,
      isValid: Boolean(name[0].length),
    },
    dob: {
      value: dob[0],
      update: dob[1],
      isRequired: true,
      isValid: Boolean(
        dob[0].day >= 1 &&
          dob[0].day <= 31 &&
          dob[0].month >= 1 &&
          dob[0].month <= 12 &&
          dob[0].year >= 1900 &&
          dob[0].year <= 3000,
      ),
    },
    email: {
      value: email[0],
      update: email[1],
      isRequired: true,
      isValid: Boolean(validateEmail(email[0])),
    },
    phoneNumber: {
      value: phoneNumber[0],
      update: phoneNumber[1],
      isRequired: true,
      isValid: Boolean(validatePhoneNumber(phoneNumber[0])),
    },
    address: {
      value: address[0],
      update: address[1],
      isRequired: true,
      isValid: Boolean(
        address[0].line1.length &&
          address[0].postcode.length &&
          address[0].townOrcity.length,
      ),
    },
    emergencyContact: {
      value: emergencyContact[0],
      update: emergencyContact[1],
      isRequired: true,
      isValid: Boolean(
        emergencyContact[0].name.length &&
          emergencyContact[0].phoneNumber.length &&
          emergencyContact[0].relationship.length,
      ),
    },
    identities: {
      value: identities[0],
      update: identities[1],
      isRequired: true,
      isValid: Boolean(identities[0].find((option) => option.isSelected)),
    },
    ethnicity: {
      value: ethnicity[0],
      update: ethnicity[1],
      isRequired: true,
      isValid: Boolean(ethnicity[0].length),
    },
    genders: {
      value: genders[0],
      update: genders[1],
      isRequired: true,
      isValid: Boolean(genders[0].find((gender) => gender.isSelected)),
    },
    healthIssues: {
      value: healthIssues[0],
      update: healthIssues[1],
      isRequired: false,
      isValid: Boolean(healthIssues[0].length),
    },
    lifeSavingMedications: {
      value: lifeSavingMedications[0],
      update: lifeSavingMedications[1],
      isRequired: true,
      isValid: Boolean(lifeSavingMedications[0].length),
    },
    events: {
      value: events[0],
      update: events[1],
      isRequired: true,
      isValid: Boolean(events[0].find((event) => event.isSelected)),
    },
    hopeToGet: {
      value: hopeToGet[0],
      update: hopeToGet[1],
      isRequired: false,
      isValid: Boolean(hopeToGet[0].length),
    },
    referralInfo: {
      value: referralInfo[0],
      update: referralInfo[1],
      isRequired: false,
      isValid: Boolean(referralInfo[0].length),
    },
    sources: {
      value: sources[0],
      update: sources[1],
      isRequired: false,
      isValid: null,
    },
    receiveNewsLetter: {
      value: receiveNewsLetter[0],
      update: receiveNewsLetter[1],
      isRequired: true,
      isValid: receiveNewsLetter[0] !== null,
    },
    imagePermission: {
      value: imagePermission[0],
      update: imagePermission[1],
      isRequired: true,
      isValid: imagePermission[0] !== null,
    },
    fresh_air_thursday_text_opt_in_Permission: {
      value: fresh_air_thursday_text_opt_in_Permission[0],
      update: fresh_air_thursday_text_opt_in_Permission[1],
      isRequired: true,
      isValid: fresh_air_thursday_text_opt_in_Permission[0] !== null,
    },
  };

  return (
    <Context.Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Context.Provider>
  );
};

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error("UserEnteredDataCx.use must be used within its provider!");
  }

  return context;
};

function UserEnteredDataCx() {
  throw new Error(
    "UserEnteredDataCx exists for naming purposes only and should not be used as a component",
  );
}

export { UserEnteredDataCx };

UserEnteredDataCx.Provider = Provider;
UserEnteredDataCx.use = useContext;
