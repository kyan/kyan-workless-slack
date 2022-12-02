import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const FetchAndSendDataFunction = DefineFunction({
  callback_id: "fetch_and_send_data",
  title: "Fetch data from API",
  source_file: "functions/fetch_and_send_data/mod.ts",
  input_parameters: {
    properties: {
      recipient: {
        type: Schema.slack.types.channel_id,
        description: "The channel for your message",
      },
      start_date: {
        type: "slack#/types/date",
        description: "Time off start date",
      },
    },
    required: ["start_date", "recipient"],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});
