import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  name: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  emergencyContact: string;
  identities: string;
  ethnicity: string;
  genders: string;
  healthIssues: string;
  lifeSavingMedications: string;
  events: string;
  hopeToGet: string;
  sources: string;
  newsletterOptIn: string;
  imageOptIn: string;
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

    formData.append("dateOfEntry", dateNow.toUTCString());

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
