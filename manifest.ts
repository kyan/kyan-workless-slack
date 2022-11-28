import { Manifest } from "deno-slack-sdk/mod.ts";
import { WhoDoesNotHaveAnyWorkWorkflow } from "./workflows/WhoDoesNotHaveAnyWorkWorkflow.ts";
import { FetchAndSendDataFunction } from "./functions/fetch_and_send_data/definition.ts";

export default Manifest({
  name: "workless",
  description: "Who's not been assigned any work",
  icon: "assets/icon.png",
  workflows: [WhoDoesNotHaveAnyWorkWorkflow],
  functions: [FetchAndSendDataFunction],
  outgoingDomains: ["kyan-workless.deno.dev"],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "users:read",
  ],
});
