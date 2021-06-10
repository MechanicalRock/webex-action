import fetch from "node-fetch";

export type WebexNotification = {
  roomId: string;
  token: string;
  markdown: string;
};

export type WebexNotifier = (notification: WebexNotification) => Promise<void>;

export const sendNotification: WebexNotifier = ({
  markdown,
  roomId,
  token,
}: WebexNotification): Promise<void> =>
  fetch("https://webexapis.com/v1/messages", {
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
