
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
    ct: userData.address?.city ? sha256(userData.address.city) : undefined,
    st: userData.address?.state ? sha256(userData.address.state) : undefined,
    country:  sha256("BD"),
  };
}

function calculateTotalValue(contents: any[]) {
  return contents.reduce((total, item) => total + item.item_price * item.quantity, 0);
}

function prepareCustomData(eventName: string, customData: any) {
  const totalValue = calculateTotalValue(customData.contents || []);

  const baseData = {
    currency: "BDT",
    value: totalValue,
    content_type: "product",
  };

  if (["Purchase", "AddToCart", "ViewContent"].includes(eventName)) {
    return {
      ...baseData,
      content_ids: customData.content_ids || [],
      contents: customData.contents || [],
    };
  }
  return baseData;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userData = sanitizeUserData(body.userData);
    const customData = prepareCustomData(body.eventName, body.customData);


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
              custom_data: customData,
            },
          ],
        }),
      }
    );

    const result = await response.json();


    if (!response.ok) {
      return NextResponse.json({ success: false, error: result }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
