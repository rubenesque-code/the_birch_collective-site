import axios from "axios";

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

  await axios.post(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    `https://formsubmit.co/ajax/team@thebirchcollective.co.uk`,
    // `https://formsubmit.co/ajax/${process.env.NEXT_PUBLIC_FORMSUBMIT_KEY!}`,
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

  const notifications = emails.map((email) =>
    axios.post(
      // `https://formsubmit.co/ajax/${"rub4sev@gmail.com"}`,
      `https://formsubmit.co/ajax/${email}`,

      {
        _subject: `New sign up for a programme(s) and/or workshop(s)`,
        spreadsheet:
          "The info can be found on the spreadsheet: https://docs.google.com/spreadsheets/d/11PUoA5JZXjt1T8C7JBnjP1CUV9jQPehqbrDAJYeLMU8/edit#gid=0",
      },
    ),
  );

  await axios.all(notifications);
};

export const formsubmit = {
  getInTouch: postGetInTouchForm,
  notifySignUp,
};
