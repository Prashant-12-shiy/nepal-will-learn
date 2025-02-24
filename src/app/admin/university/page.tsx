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
        <Button onClick={() => setIsOpen(true)}>Create University</Button>
        <Separator/>
      <UniversityData/>


        <ResponsiveModel isOpen={isOpen} setIsOpen={setIsOpen}>
            <CreateUniversityFormWrapper setIsOpen={setIsOpen}/>
        </ResponsiveModel>
    </div>
  )
}

export default University