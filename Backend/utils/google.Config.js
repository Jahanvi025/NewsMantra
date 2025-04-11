import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const OAuth2 = google.auth.OAuth2;
const oauth2client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "postmessage"
)

export { oauth2client };