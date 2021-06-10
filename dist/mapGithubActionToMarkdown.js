"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markGithubActionToMarkdown = void 0;
const markGithubActionToMarkdown = (commitUrl, author, repoName, commitMessage) => {
    return `🚨: Build failed on ${repoName}- ${commitUrl} for ${commitMessage}. Last change by ${author} `;
};
exports.markGithubActionToMarkdown = markGithubActionToMarkdown;
