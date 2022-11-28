import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { FetchAndSendDataFunction } from "../functions/fetch_and_send_data/definition.ts";

export const WhoDoesNotHaveAnyWorkWorkflow = DefineWorkflow({
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

// Step 1: opening a form for a user to select a date
const formData = WhoDoesNotHaveAnyWorkWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Who's got nothing to do",
    interactivity: WhoDoesNotHaveAnyWorkWorkflow.inputs.interactivity,
    submit_label: "Submit",
    description:
      "Enter a date for when you would like to check and also who you would like send the results to.",
    fields: {
      required: ["manager", "start_date"],
      elements: [
        {
          name: "manager",
          title: "Recipient",
          type: Schema.slack.types.user_id,
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

// Step 2: send time off request details along with approve/deny buttons to manager
WhoDoesNotHaveAnyWorkWorkflow.addStep(FetchAndSendDataFunction, {
  interactivity: formData.outputs.interactivity,
  employee: WhoDoesNotHaveAnyWorkWorkflow.inputs.interactivity.interactor.id,
  manager: formData.outputs.fields.manager,
  start_date: formData.outputs.fields.start_date,
});
