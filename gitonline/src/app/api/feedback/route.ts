import { Feedback } from "../../utils/models";
import connectDB from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const name = body.name || "Anonymous";
    const email = body.email || "Anonymous";
    const feature = body.feature || "Anonymous";
    const message = body.message || "Anonymous";

    const feedback = new Feedback({
        name,
        email,
        feature,
        message,
    });

    try {
        const add = await Feedback.create(feedback);
        add.save();
        console.log("Feedback added successfully");
        return NextResponse.json(add);
    } catch (e) {
        return NextResponse.json({ error: e });
    }
}