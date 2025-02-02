import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  HomeIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  CurrencyDollarIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Members', href: '/members', icon: UserGroupIcon },
  { name: 'Events', href: '/events', icon: CalendarIcon },
  { name: 'Donations', href: '/donations', icon: CurrencyDollarIcon },
  { name: 'Ministries', href: '/ministries', icon: UserCircleIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    window.location.reload()
  }

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-white text-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-gray-700 text-2xl font-bold">ProFaith</h1>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className={`mr-3 h-6 w-6 ${
                    pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                  }`} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 