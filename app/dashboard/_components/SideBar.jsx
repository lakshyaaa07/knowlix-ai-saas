"use client"
import Image from 'next/image'
import React from 'react'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'



function SideBar() {

  const MenuList=[
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      name: 'Upgrade',
      icon: Shield,
      path:'/dashboard/upgrade'
    },
    {
      name: 'Profile',
      icon: UserCircle,
      path:'/dashboard/profile'
    }

  ]

  const path = usePathname();

  return (
    <div className='h-screen shadow-md p-5'>
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt='Knowlix Logo' width={40} height={40} />
            <h2 className='font-bold text-2xl'>Knowlix</h2>
        </div>

        <div className='mt-10'>
          <Link className='w-full' href={'/create'}>
            <Button className='w-full'>+ Create New</Button>
          </Link>
          <div className='mt-5'>
            {MenuList.map((menu, index) => (
              <div key={index} className={`flex gap-5 p-3 items-center 
                hover:bg-slate-200 rounded-lg cursor-pointer
                  ${path == menu.path && 'bg-slate-200'}`}>
                <menu.icon />
                <h2>{menu.name}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='border p-3 bg-slate-100 rounded-lg absolute bottom-10 w-[87%]'>
          <h2 className='text-lg mb-2'>Available Credits: 5</h2>
          <Progress value={30} />
          <h2 className='text-sm'>1 out of 5 Credits used!</h2>

          <Link href={'/dashboard/upgrade'} className='text-blue-600 text-xs'>Upgrade to create more</Link>
        </div>
    </div>
  )
}

export default SideBar