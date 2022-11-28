// deno-lint-ignore no-explicit-any
export default function blocksHeader(startDate: string): any[] {
  return [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text:
          `The following people don't appear to be assigned any work for: *${startDate}*`,
      },
    },
    {
      type: "divider",
    },
  ];
}
