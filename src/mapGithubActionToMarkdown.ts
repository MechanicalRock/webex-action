export const markGithubActionToMarkdown = (
  commitUrl: string,
  author: string,
  repoName: string,
  commitMessage: string
): string => {
  return `🚨: Build failed on ${repoName}- ${commitUrl} for ${commitMessage}. Last change by ${author} `;
};
