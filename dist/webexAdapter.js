"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const sendNotification = ({ markdown, roomId, token, }) => node_fetch_1.default("https://webexapis.com/v1/messages", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        roomId,
        markdown,
    }),
})
    .then((response) => {
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response.json();
})
    .then(console.log);
exports.sendNotification = sendNotification;
