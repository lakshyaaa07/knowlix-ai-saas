// "use client"
import Image from 'next/image'
import React, { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const Options =[
        {
            name: 'Exam',
            icon: '/exam_1.png'
        },
        {
            name: 'Job Interview',
            icon: '/job.png'
        },
        {
            name: 'Practice',
            icon: '/practice.png'
        },
        {
            name: 'Programming',
            icon: '/code.png'
        },
        {
            name: 'Other',
            icon: '/knowledge.png'
        },
    ]

    const [selectedOption, setSelectedOption] = useState();

  return (
    <div>
        <h2 className='text-center mb-2 text-lg'>For which you want to create your personal study material?</h2>
        <div className='grid grid-cols-2 mt-5 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {Options.map((option, index) => (
                <div key={index} 
                className={`flex flex-col items-center p-4 hover:border-primary border rounded-lg cursor-pointer
                    ${option.name == selectedOption && 'border-primary'}`}
                onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}>
                    <Image src={option.icon} alt={option.name} width={50} height={50} />
                    <h2 className='text-sm mt-2'>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectOption