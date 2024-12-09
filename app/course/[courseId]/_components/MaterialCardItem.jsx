import { Button } from '@/components/ui/button'
import axios from 'axios'
import { RefreshCcw } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

function MaterialCardItem({ item, studyTypeContent, course, refreshData }) {
  const [loading, setLoading] = useState(false);
  const [contentReady, setContentReady] = useState(studyTypeContent?.[item.type] || false); // Track content ready state
  
  const generateContent = async () => {
    toast('Generating content...', { type: 'info' });
    setLoading(true); // Set loading to true when content is being generated
    console.log(course);
    let chapters = '';
    
    // Concatenate chapter titles
    course.courseLayout.chapters.forEach((chapter) => {
      chapters = (chapter.chapter_title || chapter?.chapterTitle) + ',' + chapters;
    });

    // API call to generate the content
    try {
      const result = await axios.post('/api/study-type-content', {
        courseId: course?.courseId,
        type: item.name,
        chapters: chapters
      });

      console.log(result);
      setContentReady(true);  // Update contentReady state to true when content is generated
      refreshData(true);  // Refresh the data after generating the content
      toast('Your content is ready to view!' , { type: 'success' });
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  return (
    <div
      className={`border shadow-md rounded-lg p-5 flex flex-col items-center ${
        !contentReady && 'grayscale'
      }`}
    >
      {!contentReady ? (
        <h2 className="p-1 px-2 bg-slate-700 text-white rounded-full text-[10px] mb-2">
          Generate
        </h2>
      ) : (
        <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
          Ready
        </h2>
      )}
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h2 className="font-medium mt-3">{item.name}</h2>
      <p className="text-gray-400 text-sm text-center">{item.desc}</p>

      {!contentReady ? (
        <Button className="mt-3 w-full" variant="outline" onClick={generateContent}>
          {loading && <RefreshCcw className="animate-spin" />}
          {!loading ? 'Generate' : 'Generating...'}
        </Button>
      ) : (
        <Button className="mt-3 w-full" variant="outline">
          View
        </Button>
      )}
    </div>
  );
}

export default MaterialCardItem;
