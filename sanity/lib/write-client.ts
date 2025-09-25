import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Only if you want to update content with the client
});

if (!writeClient.config().token) {
  throw new Error(
    "Missing write token for Sanity client. Please check your environment variables."
  );
}
