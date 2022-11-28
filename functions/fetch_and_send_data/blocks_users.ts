import { User } from "./mod.ts";

// deno-lint-ignore no-explicit-any
export default function blocksUsers(users: User[]): any[] {
  return users.map(
    (user: User) => {
      return {
        block_id: `user_block_${user.slackID}`,
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*${user.first_name} ${user.last_name} <@${user.slackID}>*\n${user.email}`,
        },
      };
    },
  );
}
