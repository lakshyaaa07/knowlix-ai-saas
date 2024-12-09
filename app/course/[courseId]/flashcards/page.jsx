"use client"
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import FlashcardItem from './_components/FlashcardItem';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";  
import { Button } from '@/components/ui/button';

function Flashcard() {

    const {courseId} = useParams();
    const [flashcards, setFlashcards] = useState([]);
    const [isFlipped, setIsFlipped] = useState();
    const [api, setApi] = useState();
    const router = useRouter();

    useEffect(() =>{
        getFlashcards();
    }, [])

    useEffect(()=>{
        if(!api){
            return;
        }
        api.on('select', ()=>{
            setIsFlipped(false);
        })
    })

    const getFlashcards = async() =>{
        const result = await axios.post('/api/study-type',{
            courseId: courseId,
            studyType: 'Flashcards'
        });
        setFlashcards(result?.data)
        console.log('Flashcard ->', result.data);

    }

    const handleClick = () =>{
        setIsFlipped(!isFlipped);
    }

    return (
    <div>
        <h2 className='font-bold text-2xl'>Flashcards</h2>
        <p>Flashcards: The Ultimate Tool to Lock in concepts!</p>

        <div>
        <Carousel setApi={setApi}>
            <CarouselContent>
                {flashcards?.content&&flashcards?.content?.map((flashcard, index)=>(
                    <CarouselItem key={index} className='flex items-center justify-center mt-10'>
                        <FlashcardItem handleClick={handleClick} 
                        isFlipped={isFlipped}
                        flashcard={flashcard}/>
                    </CarouselItem>
                ))}
                

            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>

            
        </div>
        <div className='mt-20 flex items-center justify-center'>
            <Button onClick={() => router.back()}>Go to Course Page</Button>
        </div>
    </div>
  )
}

export default Flashcard