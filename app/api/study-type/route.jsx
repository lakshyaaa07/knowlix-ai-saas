import { db } from "@/configs/db";
import { CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { courseId, studyType } = await req.json();

    if (studyType == "ALL") {
        // Fetch notes
        const notes = await db
            .select()
            .from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

        // Fetch all other study type records
        const contentList = await db
            .select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId));

        // Extract Flashcards and update their status if applicable
        const flashcards = contentList?.find((content) => content.type === "Flashcards");
        if (flashcards && flashcards.status === "Generating") {
            // Update status in the database to "Ready"
            await db
                .update(STUDY_TYPE_CONTENT_TABLE)
                .set({ status: "Ready" })
                .where(eq(STUDY_TYPE_CONTENT_TABLE.id, flashcards.id));

            // Optionally, update the in-memory `flashcards` object to reflect the new status
            flashcards.status = "Ready";
        }

        // Extract Quiz content
        const quiz = contentList?.find((content) => content.type === "Quiz");

        // Extract QA content
        const qa = contentList?.find((content) => content.type === "QA");

        // Prepare the result
        const result = {
            notes: notes.length ? notes : null,
            Flashcards: flashcards?.content?.length ? flashcards.content : null,
            Quiz: quiz?.content?.questions?.length ? quiz.content.questions : null,
            qa: qa?.content?.length ? qa.content : null,
        };

        return NextResponse.json(result);
    } else if (studyType == "notes") {
        // Fetch and return notes
        const notes = await db
            .select()
            .from(CHAPTER_NOTES_TABLE)
            .where(eq(CHAPTER_NOTES_TABLE?.courseId, courseId));

        return NextResponse.json(notes);
    } else {
        const result = await db
            .select()
            .from(STUDY_TYPE_CONTENT_TABLE)
            .where(
                and(
                    eq(STUDY_TYPE_CONTENT_TABLE?.courseId, courseId),
                    eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
                )
            );

        return NextResponse.json(result[0]);
    }
}
