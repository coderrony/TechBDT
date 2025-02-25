// app/api/fb-capi/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";

const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const PIXEL_ID = process.env.FB_PIXEL_ID;

function sha256(data: string) {
  return crypto.createHash("sha256").update(data.trim().toLowerCase()).digest("hex");
}

function sanitizeUserData(userData: any) {
  return {
    em: userData.email ? sha256(userData.email) : undefined,
    ph: userData.phone ? sha256(userData.phone) : undefined,
    fn: userData.full_name ? sha256(userData.full_name.split(" ")[0]) : undefined,
    ln: userData.full_name ? sha256(userData.full_name.split(" ").slice(1).join(" ")) : undefined,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body.userData ", body.userData);

    const userData = sanitizeUserData(body.userData);

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              event_name: body.eventName,
              event_time: Math.floor(new Date().getTime() / 1000),
              user_data: userData,
            },
          ],
        }),
      }
    );

    const result = await response.json();
    console.log("result ", result);

    if (!response.ok) {
      return NextResponse.json({ success: false, error: result }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
