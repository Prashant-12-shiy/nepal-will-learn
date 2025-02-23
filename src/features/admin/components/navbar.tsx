"use client"
import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useAdminLogout } from '../api/use-admin-logout';

const AdminNavBar = () => {
    const navItems = [
        { name: 'University', href: '/admin/university' },
        { name: 'Notices', href: '/admin/notices' },
        { name: 'Course', href: '/admin/course' },
        { name: 'Event', href: '/admin/event' },
        { name: 'College', href: '/admin/college' },
        { name: 'Category', href: '/admin/category' },
      ];

    const logout = useAdminLogout();

  return (
      <nav className=" text-black border-b border-black p-4">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center">
        <div className="font-bold text-xl">Admin Dashboard</div>
        <ul className="flex space-x-6">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link href={item.href} className="hover:text-gray-400">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div>
        <Button onClick={logout}>Logout</Button>
      </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center">
        <div className="font-bold text-xl">Admin Dashboard</div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-gray-800 text-white">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <SheetClose asChild>
                    <Link href={item.href} className="block hover:text-gray-400">
                      {item.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <Button onClick={logout}>Logout</Button>
          </SheetContent>
        </Sheet>
      </div>
    

    </nav>
  )
}

export default AdminNavBar