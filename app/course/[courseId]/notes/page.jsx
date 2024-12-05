"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function ViewNotes() {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    getNotes();
    // Attach the copy function to the global window object
    window.copyToClipboard = (elementId) => {
      const code = document.getElementById(elementId)?.innerText || "";
      if (code) {
        navigator.clipboard.writeText(code).then(
          () => alert("Code copied to clipboard!"),
          (err) => console.error("Failed to copy text: ", err)
        );
      }
    };
  }, []);

  const getNotes = async () => {
    try {
      const result = await axios.post("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      setNotes(result?.data || []); // Set an empty array as fallback
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const formatNotes = (note) => {
    if (!note) return ""; // Fallback if note is undefined or null
    return note
      .replaceAll(/[\u4e00-\u9fff]/g, " ") // Removes Chinese characters
      // .replaceAll(/[\ud800-\udfff]/g, " ") // Removes invalid or unwanted emojis
      .replaceAll("```html", "") // Remove unnecessary formatting tags
      .replaceAll("```", "")
      .replaceAll("<h1>", '<h1 class="text-4xl font-bold mt-5 mb-2">')
      .replaceAll("<h2>", '<h2 class="text-2xl font-semibold mt-4 mb-2">')
      .replaceAll("<h3>", '<h3 class="text-xl font-medium mt-3 mb-1">')
      .replaceAll("<ul>", '<ul class="list-disc pl-6 mt-2">')
      .replaceAll(
        "<pre>",
        '<pre class="relative bg-gray-900 text-white p-4 rounded-lg font-mono overflow-auto">'
      )
      .replaceAll(
        "<code>",
        `<code class="whitespace-pre-wrap" id="code-block-${stepCount}">`
      )
      .replaceAll(
        "<table>",
        '<table class="table-auto w-full border-collapse border border-gray-300 my-4">'
      )
      .replaceAll(
        "<th>",
        '<th class="bg-gray-200 text-left p-2 border border-gray-300">'
      )
      .replaceAll(
        "<td>",
        '<td class="p-2 border border-gray-300 text-gray-700">'
      )
      .replaceAll(
        "<tr>",
        '<tr class="even:bg-gray-100 hover:bg-gray-200">'
      );
  };
  

  return (
    notes.length > 0 && (
      <div className="p-5">
        {/* Progress bar */}
        <div className="flex gap-5 items-center">
          {stepCount !== 0 && (
            <Button variant="outline" size="sm" onClick={() => setStepCount(stepCount - 1)}>
              Previous
            </Button>
          )}
          {notes?.map((item, index) => (
            <div
              key={index}
              className={`w-full h-2 rounded-full ${
                index < stepCount ? "bg-primary" : "bg-gray-200"
              }`}
            ></div>
          ))}
          {stepCount < notes.length && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStepCount(stepCount + 1)}
            >
              Next
            </Button>
          )}
        </div>

        {/* Notes content */}
        <div className="mt-10">
          {stepCount === notes.length ? (
            <div className="flex items-center gap-10 flex-col justify-center">
              <h2>End of Notes</h2>
              <Button onClick={() => router.back()}>Go to Course Page</Button>
            </div>
          ) : (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: formatNotes(notes[stepCount]?.notes),
              }}
            />
          )}
        </div>
      </div>
    )
  );
}

export default ViewNotes;
