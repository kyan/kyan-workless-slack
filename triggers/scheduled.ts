import { Trigger } from "deno-slack-api/types.ts";
import { WorklessManualWorkflow } from "../workflows/WorklessManualWorkflow.ts";

const trigger: Trigger<typeof WorklessManualWorkflow.definition> = {
  name: "Who's workless (scheduled)",
  type: "scheduled",
  description: "Check to see who was available but has not been assigned work",
  workflow: "#/workflows/manual_check_workless",
  schedule: {
    start_time: "2022-12-06T08:00:00Z",
    timezone: "UTC",
    frequency: {
      type: "daily",
    },
  },
};

export default trigger;
