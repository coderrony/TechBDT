export async function sendServerEvent(eventName: string, userData: any) {
  await fetch("/api/fb-capi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventName,
      userData,
    }),
  });
}
