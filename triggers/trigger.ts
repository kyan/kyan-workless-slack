import { Trigger } from "deno-slack-api/types.ts";
import { WorklessWithFormWorkflow } from "../workflows/WorklessWithFormWorkflow.ts";

const trigger: Trigger<typeof WorklessWithFormWorkflow.definition> = {
  type: "shortcut",
  name: "Who's workless",
  description: "Check to see who was available but has not been assigned work",
  workflow: "#/workflows/check_workless",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
  },
};

export default trigger;
