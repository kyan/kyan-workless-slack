import { parse } from "datetime";
import { FetchAndSendDataFunction } from "./definition.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";
import blocksHeader from "./blocks_header.ts";
import blocksUsers from "./blocks_users.ts";
import { fetchUsers } from "../users.ts";

interface Absence {
  date: string;
  userId: number;
  startType: string;
  endType: string;
  reason: string;
  status: string;
  leaveType: string;
}

export interface ForecastAssignment {
  id: number;
  start_date: string;
  end_date: string;
  allocation: number;
  notes: string | null;
  updated_at: string;
  updated_by_id: number;
  project_id: number;
  person_id: number;
  placeholder_id: number | null;
  repeated_assignment_set_id: number | null;
  active_on_days_off: boolean;
}

export interface User {
  workless: boolean;
  email: string;
  timetastic_id?: number;
  forecast_id?: number;
  harvest_id?: number;
  slackID?: string;
  first_name: string;
  last_name: string;
  absence?: Absence;
  assignment?: ForecastAssignment;
}

export default SlackFunction(
  FetchAndSendDataFunction,
  async ({ inputs, token, env }) => {
    console.log("Forwarding the Workless check:", inputs);

    // date from slack looks like 2022-11-30
    const date = inputs.start_date;
    const destination = inputs.recipient || env.POST_CHANNEL;
    const startDateFormatted = parse(date, "yyyy-MM-dd").toDateString();
    const apiUrl = env.API_URL;
    const apiToken = env.API_TOKEN;
    const client = SlackAPI(token, {});
    const users = await fetchUsers(client, apiUrl, apiToken, date);
    const blocks = blocksHeader(startDateFormatted).concat([
      ...blocksUsers(users),
      {
        type: "divider",
      },
    ]);
    const msgResponse = await client.chat.postMessage({
      channel: destination,
      blocks,
      text: `A new workless check has been generated for ${startDateFormatted}`,
    });

    if (!msgResponse.ok) {
      console.log("Error during request chat.postMessage!", msgResponse.error);
    }

    return { outputs: {} };
  },
);
