import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

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

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.SIGN_UP_SHEET_CLIENT_EMAIL,
        private_key: process.env.SIGN_UP_SHEET_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n",
        ),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const dateNow = new Date().toUTCString();

    const body = JSON.parse(req.body as string) as Body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SIGN_UP_SHEET_SPREADSHEET_ID,
      range: "A2:AR",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[dateNow, ...Object.values(body)]],
      },
    });

    res.status(200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
    return;
  }
}
