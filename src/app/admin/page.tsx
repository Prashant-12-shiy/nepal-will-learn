import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import University from './university/page'
import AdminCollege from './college/page'
import { Separator } from '@/components/ui/separator'
import AdminCourse from './course/page'

const DashBoard = () => {
  return (
    <div className='my-8 mx-3 px-16 py-5 border rounded-md'>
      <Tabs defaultValue='university' className=''>
        <TabsList className=''>
          <TabsTrigger value='university'>University</TabsTrigger>
          <TabsTrigger value='course'>Course</TabsTrigger>
          <TabsTrigger value='college'>College</TabsTrigger>
        </TabsList>
        <Separator className='my-4'/>
        <TabsContent value='university'>
            <University/>
        </TabsContent>

        <TabsContent value='course'>
            <AdminCourse/>
        </TabsContent>

        <TabsContent value='college'>
          <AdminCollege/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default DashBoard