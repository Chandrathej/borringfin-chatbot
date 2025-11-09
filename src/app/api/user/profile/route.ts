import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// ✅ Create or update user profile (name, age, gender, terms)
export async function POST(req: NextRequest) {
  try {
    const { email, name, age, gender, acceptedTerms } = await req.json();

    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        age,
        gender,
        acceptedTerms,
      },
      create: {
        email,
        name,
        age,
        gender,
        acceptedTerms,
      },
    });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error("❌ Profile save error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Mark onboarding as complete when user finishes onboarding
export async function PATCH(req: NextRequest) {
  try {
    const { email, onboardingComplete } = await req.json();

    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user = await prisma.user.update({
      where: { email },
      data: { onboardingComplete: !!onboardingComplete },
    });

    return NextResponse.json({
      success: true,
      onboardingComplete: user.onboardingComplete,
    });
  } catch (err) {
    console.error("❌ Onboarding completion error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
