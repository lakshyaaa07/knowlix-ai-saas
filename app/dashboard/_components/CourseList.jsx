"use client";
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import { index } from 'drizzle-orm/mysql-core';
import React, { useContext, useEffect, useState } from 'react'
import CourseCardItem from './CourseCardItem';
import { Button } from '@/components/ui/button';
import { RefreshCcwIcon, RefreshCw } from 'lucide-react';
import { CourseCountContext } from '@/app/_context/CourseCountContext';

function CourseList() {

    const {user} = useUser();
    const[courseList, setCourseList] = useState([]);
    const[loading, setLoading] = useState(false);
    const {totalCourse, setTotalCourse} = useContext(CourseCountContext)   

    useEffect(() => {
        user&&getCourseList();
    }, [user]);

    const getCourseList = async() =>{
        setLoading(true);
        const result = await axios.post("/api/courses", 
            {createdBy:user?.primaryEmailAddress?.emailAddress})
            console.log(result);
            setCourseList(result.data.result);
            setLoading(false);

            setTotalCourse(result.data.result?.length);
    }

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-2xl flex justify-between items-center'>Your Study Material
            <Button variant='outline'
                    onClick={getCourseList} className='border-primary text-primary' > <RefreshCw />Refresh</Button>
        </h2>
        
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mt-2 gap-5'>
            { loading==false? courseList?.map((course,index) => (
                <CourseCardItem course={course} key={index} />
            ))
            :[1,2,3,4,5,6].map((item,index) => (
                <div key={index} className='h-56 w-full bg-slate-500 rounded-lg animate-pulse'>

                </div>
            ))
        }
        </div>
    </div>
  )
}

export default CourseList