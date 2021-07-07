import * as core from "@actions/core";
import * as github from "@actions/github";
import { markGithubActionToMarkdown } from "./mapGithubActionToMarkdown";
import { sendNotification } from "./webexAdapter";

const handler = async () => {
  try {
    const repoName = core.getInput("repoName");
    const payload = github.context.payload;
    console.log(`The event payload : ${JSON.stringify(payload)} `);
    let commitUrl: string;
    let author: string;
    let commitMessage: string;
    if (payload.pull_request) {
      commitUrl = JSON.stringify(payload.pull_request?.html_url);
      author = JSON.stringify(payload.pull_request?.user.login);
      commitMessage = JSON.stringify(payload.pull_request?.head.label);
    } else if (payload.head_commit) {
      commitUrl = JSON.stringify(payload.head_commit?.url);
      author = JSON.stringify(payload.head_commit?.author?.name);
      commitMessage = JSON.stringify(payload.head_commit?.message);
    } else {
      commitUrl = JSON.stringify(payload.repository?.html_url);
      author = "";
      commitMessage = "From workflow_dispath trigger";
    }

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
