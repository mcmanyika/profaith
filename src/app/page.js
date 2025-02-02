'use client'

import Image from "next/image";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
export default function Home() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <Sidebar />
        {/* Sign Out Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="w-full px-4 py-2 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center"
            onClick={async () => {
              await supabase.auth.signOut()
              router.refresh()
            }}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-red-600 dark:text-red-400" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <Header />
      </main>
    </div>
  );
}
