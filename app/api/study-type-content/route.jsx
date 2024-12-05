import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {
        chapters,
        courseId,
        type,
    } = await req.json();

    const PROMPT = `Generate the flashcard on topic : ${chapters} in JSON format with front and back content, Maximum 15!`;

    // Insert Record to DB, Update the status to 'Generating...'
    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
        courseId: courseId,
        type: type,  
    }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id})


    // Trigger the Inngest function to generate study type content
    inngest.send({
        name: 'studyType.content',
        data: {
            studyType: type,
            prompt: PROMPT,
            courseId: courseId,
            recordId: result[0].id
        }
    })

    return NextResponse.json(result[0].id);
}