import { NextResponse } from "next/server";
import twilio from "twilio";
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phoneNumber = searchParams.get("phoneNumber");
  try {
    const verification = await client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    return NextResponse.json(verification.status);
  } catch (error) {
    console.error(error);
    return NextResponse.error("Something went wrong during verification.");
  }
}

export async function POST(request) {
  const { code, phoneNumber } = await request.json();
  console.log(code, phoneNumber);
  try {
    const verificationResult = await client.verify.v2
      .services(process.env.VERIFICATION_SID)
      .verificationChecks.create({ to: phoneNumber, code: code });

    return NextResponse.json(verificationResult.status);
  } catch (error) {
    console.error(error);
    return NextResponse.error("Something went wrong during verification.");
  }
}
