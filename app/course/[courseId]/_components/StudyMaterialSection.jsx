import React, { useEffect, useState } from 'react'
import MaterialCardItem from './MaterialCardItem'
import axios from 'axios'
import Link from 'next/link';

function StudyMaterialSection({courseId}) {

  const materialList = [
    {
      name: 'Notes/Chapters',
      desc: 'Notes to help you understand the topic!',
      icon: '/notes.png',
      path: '/notes',
      type: 'notes'
    },
    {
      name: 'Flashcards',
      desc: 'Flashcards to help you remember!',
      icon: '/flashcard.png',
      path: '/flashcards',
      type: 'flashCard'
    },
    {
      name: 'Quiz',
      desc: 'Great way to test your knowledge!',
      icon: '/quiz.png',
      path: '/quiz',
      type: 'quiz'
    },
    {
      name: 'Question/Answer',
      desc: 'Help to practice your learning!',
      icon: '/qa.png',
      path: '/qa',
      type: 'qa'
    },
  ]

  useEffect(()=>{
    getStudyMaterial();
    console.log("Received courseId:", courseId);
  },[]);

  const [studyTypeContent, setStudyTypeContent] = useState();
  const getStudyMaterial = async()=>{
    const result = await axios.post('/api/study-type', {
      courseId:courseId,
      studyType: 'ALL'
    })
    console.log(result?.data);
    setStudyTypeContent(result.data);
  }

  return (
    <div className='mt-5'>
      <h2 className='font-medium text-xl'>Study Material</h2>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
        {materialList.map((item, index)=>(
          <Link key={index} href={'/course/'+courseId+item.path}> 
          <MaterialCardItem key={index} item={item}
                studyTypeContent={studyTypeContent}
          />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default StudyMaterialSection