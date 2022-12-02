import { format } from "datetime";
import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import { FetchAndSendDataFunction } from "../functions/fetch_and_send_data/definition.ts";

export const WorklessManualWorkflow = DefineWorkflow({
  callback_id: "manual_check_workless",
  title: "Manually check worklessness",
  description: "Manually check to see who hasn't been assigned any work",
});

WorklessManualWorkflow.addStep(FetchAndSendDataFunction, {
  recipient: "<TODO>",
  start_date: format(new Date(), "yyyy-MM-dd"),
});
