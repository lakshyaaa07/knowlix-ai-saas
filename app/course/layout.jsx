import React from 'react'
import DashboardHeader2 from '../dashboard/_components/DashboardHeader2'

function CourseViewLayout({children}) {
  return (
    <div>
        <DashboardHeader2 />
        <div className='mx-10 md:mx-36 lg:px-60 mt-10'>
            {children}
        </div>
    </div>
  )
}

export default CourseViewLayout