import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

/**
 * Custom function that sends a message to the user's manager asking for approval
 * for the time off request. The message includes some Block Kit with two interactive
 * buttons: one to approve, and one to deny.
 */
export const FetchAndSendDataFunction = DefineFunction({
  callback_id: "fetch_and_send_data",
  title: "Fetch data from API",
  description: "Sends your manager a time off request to approve or deny",
  source_file: "functions/fetch_and_send_data/mod.ts",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      employee: {
        type: Schema.slack.types.user_id,
        description: "The user requesting the time off",
      },
      manager: {
        type: Schema.slack.types.user_id,
        description: "The manager approving the time off request",
      },
      start_date: {
        type: "slack#/types/date",
        description: "Time off start date",
      },
    },
    required: [
      "employee",
      "manager",
      "start_date",
      "interactivity",
    ],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});
