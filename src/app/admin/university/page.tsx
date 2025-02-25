"use client"
import { ResponsiveModel } from '@/components/responsive-model'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CreateUniversityFormWrapper } from '@/features/admin/university/components/create-university-form-wrapper'
import UniversityData from '@/features/admin/university/components/university-data-view'
import React, { useState } from 'react'

const University = () => {
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
         <div className="flex items-center justify-between mx-20 my-6">
         <h2 className="text-lg md:text-4xl font-semibold">University Section</h2>
        <Button onClick={() => setIsOpen(true)}>Create University</Button>
        </div>
        <Separator/>
      <UniversityData/>


        <ResponsiveModel isOpen={isOpen} setIsOpen={setIsOpen} className='max-w-[75vw]'>
            <CreateUniversityFormWrapper setIsOpen={setIsOpen}/>
        </ResponsiveModel>
    </div>
  )
}

export default University