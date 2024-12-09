"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress';
import QuizCardItem from './_components/QuizCardItem';

function Quiz() {

    const {courseId} = useParams();
    const [quizData, setQuizData] = useState();
    const[quiz, setQuiz] = useState([]);
    const [stepCount, setStepCount] = useState(0);
    const [iscorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [correctAns, setCorrectAns] = useState();

    useEffect(() =>{
        getQuiz();
    },[]);

    const getQuiz = async() =>{
        const result = await axios.post('/api/study-type',{
            courseId: courseId,
            studyType: 'Quiz'
        });
        setQuizData(result?.data);
        setQuiz(result?.data?.content?.questions);
        // console.log('Quiz ->', result.data);
    }

    const checkAnswer =(userAnswer, currentQuestion)=>{
        setCorrectAns(currentQuestion?.answer);
        console.log(currentQuestion?.answer)
        if(userAnswer === currentQuestion?.answer){
            setIsCorrectAnswer(true);
            // setCorrectAns(currentQuestion?.answer);
            return;
        }   
        setIsCorrectAnswer(false);
    }

    useEffect(()=>{
        setCorrectAns(null);
        setIsCorrectAnswer(null);
    }, [stepCount]);

  return (
    <div>
        <h2 className='font-bold text-2xl text-center mb-4'>Quiz</h2>

        <StepProgress data={quiz} stepCount={stepCount} setStepCount={(value)=>setStepCount(value)} />

            <div>
                {/* {quiz&&quiz.map((item, index)=>( */}
                    <QuizCardItem quiz={quiz[stepCount]}
                        userSelectedOption={(v)=>checkAnswer(v, quiz[stepCount])}
                    />
                {/* ))} */}


            </div>
            { iscorrectAnswer == false && <div>
                <div className='border p-3 border-red-700 bg-red-200 rounded-lg'>
                    
                    <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
                    <p className='text-red-700'>Correct answer is: {correctAns}</p>
                    
                </div>
            </div>}

            { iscorrectAnswer == true && <div>
                <div className='border p-3 border-green-700 bg-green-200 rounded-lg'>
                    
                    <h2 className='font-bold text-lg text-green-600'>Correct</h2>
                    <p className='text-green-700'>Your answer is correct!</p>
                    
                </div>
            </div>}
    </div>
  )
}

export default Quiz