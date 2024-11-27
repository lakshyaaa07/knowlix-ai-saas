import { db } from "@/configs/db";
import { inngest } from "./client";
import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, USER_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel } from "@/configs/AiModel";

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
  { id: 'generate-course'},
  { event: 'notes.generate'},
  async ({ event, step }) => {
    const { course } = event.data;

    // Generate notes for each chapter with AI
    const notesResult = await step.run('Generate Notes for each chapter', async () => {
      const Chapters = course?.courseLayout?.chapters || [];
      let index = 0;
      Chapters.forEach(async(chapter) => {
        const PROMPT = `Generate study preparation material for the provided chapters. Each chapter should include comprehensive content based on its title and difficulty level. Make sure to address all relevant topics thoroughly, structured for effective study. Make sure generated content should be in valid HTML format strictly (Do not include <html>, <head>, <body>, or <title> tags). The chapters data is: ${JSON.stringify(chapter)}`;
        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text();

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId: index,
          courseId: course?.courseId,
          notes: aiResp,
        })
        index = index + 1;
      });

      return 'Success';
    })

    // Update Status to 'Ready' 
    const updateCourseStatusResult = await step.run('Update Course Status to Ready', async () => {
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status: 'Ready',
      }).where(eq(STUDY_MATERIAL_TABLE.courseId, course?.courseId));
      return 'Success';
    });
  }
)