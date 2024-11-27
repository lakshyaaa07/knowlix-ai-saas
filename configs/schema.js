import { pgTable, serial, boolean, varchar, json, integer, text } from "drizzle-orm/pg-core";

// Corrected schema definition
export const USER_TABLE = pgTable("users", {
  id: serial().primaryKey(),        // Auto-incrementing primary key
  name: varchar().notNull(),        // Name as a non-null string
  email: varchar().notNull(),       // Email corrected to a string type (varchar)
  isMember: boolean().default(false), // Boolean field with a default value of false
});


export const STUDY_MATERIAL_TABLE = pgTable("studyMaterial", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  courseType: varchar().notNull(),
  topic: varchar().notNull(),
  difficultyLevel: varchar().default("easy"),
  courseLayout: json(),
  createdBy: varchar().notNull(),
  status: varchar().default("Generating"),
})


export const CHAPTER_NOTES_TABLE = pgTable("chapterNotes", {
  id: serial().primaryKey(),
  courseId: varchar().notNull(),
  chapterId: integer().notNull(),
  notes: text(),
})