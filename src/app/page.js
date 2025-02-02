'use client'

import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Header from '../components/layout/Header'
import Sidebar from '../components/layout/Sidebar'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import UsersList from '../components/UsersList'

export default function Home() {
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1]
        },
        set(name, value, options) {
          document.cookie = `${name}=${value}; path=${options.path}; max-age=${options.maxAge}`
        },
        remove(name, options) {
          document.cookie = `${name}=; path=${options.path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
        },
      }
    }
  )

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
        <UsersList />
      </main>
    </div>
  );
}
