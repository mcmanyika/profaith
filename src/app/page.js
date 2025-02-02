'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Header from '../components/layout/Header'
import Link from 'next/link'
import { ArrowLeftOnRectangleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import UsersList from '../components/UsersList'
import { usePathname } from 'next/navigation'
import { navigation } from '../components/layout/navigation'

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside 
        className={`h-screen w-16 hover:w-64 text-gray-700 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : ''
        } group`}
      >
        <div className="h-full flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 p-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300">Profaith</h1>
          <div className="flex-grow mt-4 overflow-hidden">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    pathname === item.href
                      ? 'text-gray-900'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3 h-6 w-6 flex-shrink-0 ${
                    pathname === item.href ? 'text-gray-700' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                  <span className="overflow-hidden transition-all duration-300">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
          {/* Sign Out Button */}
          <div className="p-2">
            <button
              className="w-full flex items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
              onClick={async () => {
                await supabase.auth.signOut()
                router.refresh()
              }}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3 flex-shrink-0" />
              <span className="whitespace-nowrap overflow-hidden transition-all duration-300">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8 transition-all duration-300">
          <Header />
          <UsersList />
      </main>
    </div>
  );
}
