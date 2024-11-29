import { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){

    const{
        courseId,
        topic,
        courseType,
        difficultyLevel,
        createdBy
    } = await req.json();

    // const PROMPT = `Generate a study material for ${topic} in the ${courseType} format at ${difficultyLevel} difficulty. Include "course_title", "difficulty", "summary", and "chapters" (array) with "chapter_title", "chapter_summary", and "topics" (list). Provide the result as structured JSON.`
    const PROMPT = "Generate a study material for "+topic+" for " +courseType+" and level of difficulty should be "+difficultyLevel+" with summary of course, also along with dedicated or similar a valid emoji icon for each chapter, Include course_title, difficulty, summary, and chapters (array) with chapter_title, chapter_summary, emoji and topics (list). Provide the result as structured JSON. "

    // Generate course outline using AI model
    const aiResponse = await courseOutline.sendMessage(PROMPT);
    const aiResult = JSON.parse(aiResponse.response.text());

    // Save the result along with User Input to DB
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        topic:topic,
        difficultyLevel:difficultyLevel,
        courseLayout: aiResult,
        createdBy:createdBy
    }).returning({resp:STUDY_MATERIAL_TABLE})

    console.log(dbResult)

    // Trigger the Inngest function to generate chapter notes 

    const result = await inngest.send({
        name: 'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    });
    console.log(result);

    return NextResponse.json({result:dbResult[0]})
}