import React, { useEffect, useState } from 'react';
import MaterialCardItem from './MaterialCardItem';
import axios from 'axios';

function StudyMaterialSection({ courseId, course }) {
  const materialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Notes to help you understand the topic!',
      icon: '/notes.png',
      path: '/notes',
      type: 'notes',
    },
    {
      name: 'Flashcards',
      desc: 'Flashcards to help you remember!',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'Flashcards',
    },
    {
      name: 'Quiz',
      desc: 'Great way to test your knowledge!',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz',
    },
    {
      name: 'Question/Answer',
      desc: 'Help to practice your learning!',
      icon: '/qa.png',
      path: '/qa',
      type: 'qa',
    },
  ];

  const [studyTypeContent, setStudyTypeContent] = useState();

  useEffect(() => {
    getStudyMaterial();
    console.log('Received courseId:', courseId);
  }, []);

  const getStudyMaterial = async () => {
    try {
      const result = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'ALL',
      });
      console.log('Fetched Data:', result?.data);
      setStudyTypeContent(result.data); // Update state
    } catch (error) {
      console.error('Error fetching study material:', error);
    }
  };
  

  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Study Material</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-3">
        {materialList.map((item, index) => {
          const isReady = studyTypeContent?.[item.type]?.length != null;

          return isReady ? (
            <a
              key={index}
              href={`/course/${courseId}${item.path}`} // Use `a` for redirection
              className="block"
            >
              <MaterialCardItem
                key={index}
                item={item}
                studyTypeContent={studyTypeContent}
                course={course}
                refreshData={getStudyMaterial} // Passed here
              />
            </a>
          ) : (
            <MaterialCardItem
              key={index}
              item={item}
              studyTypeContent={studyTypeContent}
              course={course}
              refreshData={getStudyMaterial} // Passed here too
            />
          );
        })}
      </div>
    </div>
  );
}

export default StudyMaterialSection;
