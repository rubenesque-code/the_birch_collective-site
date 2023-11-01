import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  name: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  emergency_contact: string;
  identities: string;
  ethnicity: string;
  genders: string;
  health_issues: string;
  life_saving_medications: string;
  events: string;
  hope_to_get: string;
  sources: string;
  newsletter_opt_in: string;
  image_opt_in: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Only POST requests allowed" });
    }

    const body = JSON.parse(req.body as string) as Body;

    const formData = new FormData();

    const dateNow = new Date();

    formData.append("date_of_entry", dateNow.toUTCString());

    for (const [key, value] of Object.entries(body)) {
      formData.append(key, value);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await fetch(process.env.SHEET_SCRIPT_URL!, {
      method: "POST",
      body: formData,
    });

    res.status(200);

    return "good";
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
    return;
  }
}
