import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { plan } = await request.json();

  // Mock Stripe checkout - return a fake session
  return NextResponse.json({
    sessionId: `mock_session_${Date.now()}`,
    url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/settings?upgrade=success&plan=${plan}`,
  });
}
