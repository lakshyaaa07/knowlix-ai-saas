import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, generatStudyTypeContentAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);


export const  createNewUser = inngest.createFunction(
  { id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {
    const {user} = event.data;
    // get event data
    const result = await step.run('Check User and create New if not exist', async () => {
      // Check if the user is already existed  
      const result = await db.select().from(USER_TABLE)
        .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

      console.log(result);

      if (result?.length == 0) {
        // If not, create a new user and add to DB

        const userResp = await db.insert(USER_TABLE).values({
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          // Add other necessary fields here
        }).returning({ id: USER_TABLE.id });
        return userResp;
      }
      return result;
    })

    return 'Success';
  }

  // Step is to Send Email Welcome notification


  //Step to Send Email notifications after 3 days once user join it
);


export const generateNotes = inngest.createFunction(
  { id: 'generate-course' },
  { event: 'notes.generate' },
  async ({ event, step }) => {
    const { course } = event.data;

    // Generate notes for each chapter with AI
    const notesResult = await step.run('Generate Notes for each chapter', async () => {
      const Chapters = course?.courseLayout?.chapters || [];
      let index = 0;

      for (const chapter of Chapters) {
        const PROMPT = `
          Generate detailed study material for the provided chapter. 
          - The output should ONLY be in plain HTML format
          - Exclude <html>, <head>, <title>, or <body> tags.
          - Content structure:
            1. Brief introduction to the topic.
            2. Clear headings and subheadings with relatable emoji for each chapter title to look it more like GenZ (like Notion).
            3. Detailed explanations with examples and properly formatted code blocks (<pre><code>).
            4. Key takeaways or summary at the end.
          - Follow the style of professional documentation (e.g., MDN or React Docs).

          Chapter Information:
          Title: ${chapter.chapter_title}
          Summary: ${chapter.chapter_summary}
          Content Topics: ${JSON.stringify(chapter.topics || [])}
        `;



        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = await result.response.text();

        // Ensure the response is clean and contains no <html>, <head>, <title>, or <body> tags
        const sanitizedHtml = aiResp
          .replace(/<html.*?>|<\/html>/g, '')  // Remove <html> and </html>
          .replace(/<head.*?>.*?<\/head>/gs, '') // Remove <head>...</head>
          .replace(/<title.*?>.*?<\/title>/gs, '') // Remove <title>...</title>
          .replace(/<body.*?>|<\/body>/g, '')  // Remove <body> and </body>;

        // Insert the sanitized content into the database
        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: sanitizedHtml.trim(), // Store the sanitized HTML
        });

        index++;
      }

      return 'Success';
    });

    // Update Status to 'Ready' 
    const updateCourseStatusResult = await step.run('Update Course Status to Ready', async () => {
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status: 'Ready',
      }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return 'Success';
    });
  }
)

// Used to generate FlashCard, Quiz, and other study materials
export const generateStudyTypeContent = inngest.createFunction(
  { id: 'generate-study-type-content' },
  { event: 'studyType.content' },

  async({event, step})=>{
    const {studyType, prompt, courseId, recordId} = event.data;

    const flashCardAIResult = await step.run('Generating Flashcard using AI', async()=>{
      const result = await generatStudyTypeContentAiModel.sendMessage(prompt);
      const AIResult = JSON.parse(result.response.text());
      return AIResult;
    });

    // Save the result to the database

    const dbResult = await step.run('Save result to database', async()=>{
      const result = await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content: flashCardAIResult,
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id, recordId));
      

      return 'Data Inserted';
    })
  }
)