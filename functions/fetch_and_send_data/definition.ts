import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const FetchAndSendDataFunction = DefineFunction({
  callback_id: "fetch_and_send_data",
  title: "Fetch data from API",
  source_file: "functions/fetch_and_send_data/mod.ts",
  input_parameters: {
    properties: {
      recipient: {
        type: Schema.slack.types.user_id,
        description: "The recipient of your message",
      },
      start_date: {
        type: "slack#/types/date",
        description: "Time off start date",
      },
    },
    required: ["start_date"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});
