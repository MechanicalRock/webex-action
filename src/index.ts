import * as core from "@actions/core";
import * as github from "@actions/github";
import { markGithubActionToMarkdown } from "./mapGithubActionToMarkdown";
import { sendNotification } from "./webexAdapter";

const handler = async () => {
  try {
    const repoName = core.getInput("repoName");
    const payload = github.context.payload;
    console.log(
      `The event payload after being stringify: ${JSON.stringify(payload)} `
    );

    const commitUrl = JSON.stringify(payload.html.href);
    const author = JSON.stringify(payload.head_commit.author.name);
    const commitMessage = JSON.stringify(payload.head_commit.message);
    console.log(
      `Incoming payload `,
      commitUrl,
      author,
      commitMessage,
      repoName
    );
    // await sendNotification({
    //   markdown: markGithubActionToMarkdown(
    //     commitUrl,
    //     author,
    //     repoName,
    //     commitMessage
    //   ),
    //   roomId: process.env.WEBEX_ROOM || "",
    //   token: process.env.WEBEX_TOKEN || "",
    // });
  } catch (error) {
    core.setFailed(error.message);
  }
};
handler();
