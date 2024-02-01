import axios from "axios";

import { isDevMode } from "~/static-data/process";

const postGetInTouchForm = async ({
  subject,
  ...formValues
}: {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}) => {
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const recipient = isDevMode
    ? "a.ruben00001@gmail.com"
    : "team@thebirchcollective.co.uk";

  await axios.post(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    `https://formsubmit.co/ajax/${recipient}`,
    {
      ...formValues,
      _subject: `New message from ${formValues.firstName} ${
        formValues.lastName ? formValues.lastName : ""
      }. Subject:  ${subject ? subject : "[not specified]"}`,
    },
  );
};

const notifySignUp = async ({ emails }: { emails: string[] }) => {
  axios.defaults.headers.post["Content-Type"] = "application/json";

  const recipients = isDevMode ? ["a.ruben00001@gmail.com"] : emails;

  const notifications = recipients.map((email) =>
    axios.post(
      `https://formsubmit.co/ajax/${email}`,

      {
        _subject: `New sign up for a programme(s) and/or workshop(s)`,
        spreadsheet: `The info can be found on the spreadsheet: ${
          process.env.NEXT_PUBLIC_SIGN_UP_SHEET_URL as string
        }`,
      },
    ),
  );

  await axios.all(notifications);
};

export const formsubmit = {
  postGetInTouchForm,
  notifySignUp,
};
