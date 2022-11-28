import { Trigger } from "deno-slack-api/types.ts";

const trigger: Trigger = {
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
