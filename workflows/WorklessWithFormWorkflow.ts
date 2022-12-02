import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FetchAndSendDataFunction } from "../functions/fetch_and_send_data/definition.ts";

export const WorklessWithFormWorkflow = DefineWorkflow({
  callback_id: "check_workless",
  title: "Who's not nothing to do",
  description: "Checks to see who hasn't been assigned any work",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
    },
    required: ["interactivity"],
  },
});

const formData = WorklessWithFormWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Who's got nothing to do",
    interactivity: WorklessWithFormWorkflow.inputs.interactivity,
    submit_label: "Submit",
    description:
      "Enter a date for when you would like to check and also who you would like send the results to.",
    fields: {
      required: ["start_date", "recipient"],
      elements: [
        {
          name: "recipient",
          title: "Recipient",
          type: Schema.slack.types.channel_id,
        },
        {
          name: "start_date",
          title: "Start Date",
          type: "slack#/types/date",
        },
      ],
    },
  },
);

WorklessWithFormWorkflow.addStep(FetchAndSendDataFunction, {
  recipient: formData.outputs.fields.recipient,
  start_date: formData.outputs.fields.start_date,
});
