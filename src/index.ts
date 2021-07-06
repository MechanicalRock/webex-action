import * as core from "@actions/core";
import * as github from "@actions/github";
import { markGithubActionToMarkdown } from "./mapGithubActionToMarkdown";
import { sendNotification } from "./webexAdapter";

const handler = async () => {
  try {
    const repoName = core.getInput("repoName");
    const payload = github.context.payload;
    console.log(`The event payload : ${JSON.stringify(payload)} `);
    console.log("pull request", JSON.stringify(payload.pull_request));
    const commitUrl = JSON.stringify(payload.pull_request?.html_url);
    const author = JSON.stringify(payload.pull_request?.user.login);
    const commitMessage2 = JSON.stringify(payload.pull_request?.head.label);
    const commitMessage = JSON.stringify(payload.head_commit.message);
    console.log(
      `Incoming payload `,
      commitUrl,
      author,
      commitMessage2,
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
