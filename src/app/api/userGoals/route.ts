import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ onboardingComplete: false });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { onboardingComplete: true },
    });

    return NextResponse.json({
      onboardingComplete: user?.onboardingComplete || false,
    });
  } catch (err) {
    console.error("❌ Error checking onboarding status:", err);
    return NextResponse.json({ onboardingComplete: false });
  }
}
