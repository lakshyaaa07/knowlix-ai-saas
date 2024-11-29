import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';

function DashboardHeader() {
  return (
    <div className='p-5 shadow-md flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <Image src={'/logo.svg'} alt='Knowlix Logo' width={40} height={40} />
        <h2 className='font-bold text-2xl'>Knowlix</h2>
      </div>
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
