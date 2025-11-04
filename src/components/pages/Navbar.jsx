// "use client"

// // components/Navbar.tsx
// import Link from 'next/link'
// import { useState, useEffect } from 'react'

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 10) {
//         setScrolled(true)
//       } else {
//         setScrolled(false)
//       }
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 py-3' : 'bg-transparent py-4'}`}>
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center">
//           {/* Logo/Brand - Left side */}
//           <Link href="/" className="text-white text-2xl font-bold">
//             <img className='h-16 rounded-3xl' src="/images/logo.png" alt="" />
//           </Link>

//           {/* Desktop Navigation - Centered */}
//           <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
//             <Link href="/" className="text-white hover:text-primary transition">
//               Home
//             </Link>
//             <Link href="/store" className="text-white hover:text-primary transition">
//               Store
//             </Link>
//             <Link href="/workout-class" className="text-white hover:text-primary transition">
//               Workouts Class
//             </Link>
//             <Link href="/" className="text-white hover:text-primary transition">
//               Nutrition
//             </Link>
//             <Link href="/training-program" className="text-white hover:text-primary transition">
//               Training Program
//             </Link>
//             <Link href="/pricing" className="  hover:text-primary text-primary text-[18px] transition">
//               Pricing
//             </Link>
//           </div>

//           {/* CTA Buttons - Right side */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link 
//               href="/signup" 
//               className="text-white hover:text-primary transition font-medium"
//             >
//               Sign Up
//             </Link>
//             <Link 
//               href="/join" 
//               className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition"
//             >
//               Join Now
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden text-white focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               {isOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-black/95 py-4 px-4 flex flex-col space-y-4 mt-4 rounded-lg">
//             <Link href="/workouts" className="text-white hover:text-primary transition">
//               Workouts
//             </Link>
//             <Link href="/nutrition" className="text-white hover:text-primary transition">
//               Nutrition
//             </Link>
//             <Link href="/about" className="text-white hover:text-primary transition">
//               About
//             </Link>
//             <Link href="/contact" className="text-white hover:text-primary transition">
//               Contact
//             </Link>
//             <div className="pt-4 border-t border-white/20">
//               <Link 
//                 href="/signup" 
//                 className="block text-white hover:text-primary transition font-medium py-2"
//               >
//                 Sign Up
//               </Link>
//               <Link 
//                 href="/join" 
//                 className="block bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition text-center mt-2"
//               >
//                 Join Now
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }




"use client"

// components/Navbar.tsx
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from 'antd'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine navbar background
  // Black when: scrolled OR not on home page
  const showBlackBg = scrolled || !isHomePage


  // const userRole = 'user';
  const userRole = "specialist";
  // const userRole = 'doctor';


  const user = JSON.parse(localStorage.getItem('user'));


  // Map role → dashboard route
  const dashboardRoutes = {
    patient: '/dashboard/doctor',
    specialist: '/specialistDs/members',
    doctor: '/doctorDs/upcoming-schedule',
  };

  const handleDashboardClick = () => {
    const route = dashboardRoutes[user?.role] || '/'; // fallback
    router.push(route);
  };


  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${showBlackBg ? 'bg-black/90 py-3' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand - Left side */}
          <Link href="/" className="text-white text-2xl font-bold">
            <img className='h-16 rounded-3xl' src="/images/logo.png" alt="" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
            <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Home
            </Link>
            <Link href="/store" className={`${pathname === '/store' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Store
            </Link>
            <Link href="/workout-class" className={`${pathname === '/workout-class' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Workouts Class
            </Link>
            {/* <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Nutrition
            </Link> */}
            <Link href="/training-program" className={`${pathname === '/training-program' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Training Program
            </Link>
            <Link href="/informational-video" className={`${pathname === '/training-program' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Informational Video
            </Link>
            <Link href="/pricing" className={`${pathname === '/pricing' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Pricing
            </Link>
          </div>

          {/* CTA Buttons - Right side */}
          <div className="hidden md:flex items-center md:gap-3 gap-1">
            {user ? (
              <Button
                onClick={handleDashboardClick}
                style={{
                  background: 'linear-gradient(to right, #3b82f6, #22c55e)',
                  border: '1px solid white',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Dashboard
              </Button>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                {/* <Link 
                href="/" 
                className="text-white hover:text-primary transition font-medium"
              >
                Sign Up
              </Link> */}
                <Link
                  href="/auth/login"
                  className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition"
                >
                  Login
                </Link>
              </div>
            )}
          </div>



          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 py-4 px-4 flex flex-col space-y-4 mt-4 rounded-lg">
            <Link href="/" className={`${pathname === '/' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Home
            </Link>
            <Link href="/store" className={`${pathname === '/store' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Store
            </Link>
            <Link href="/workout-class" className={`${pathname === '/workout-class' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Workouts Class
            </Link>
            <Link href="/nutrition" className={`${pathname === '/nutrition' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Nutrition
            </Link>
            <Link href="/training-program" className={`${pathname === '/training-program' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Training Program
            </Link>
            <Link href="/pricing" className={`${pathname === '/pricing' ? 'text-primary' : 'text-white'} hover:text-primary transition`}>
              Pricing
            </Link>
            <div className="pt-4 border-t border-white/20">
              {user ? (
                <Button
                  onClick={handleDashboardClick}
                  style={{
                    background: 'linear-gradient(to right, #3b82f6, #22c55e)',
                    border: '1px solid white',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  {/* <Link 
                href="/" 
                className="text-white hover:text-primary transition font-medium"
              >
                Sign Up
              </Link> */}
                  <Link
                    href="/auth/login"
                    className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-full transition"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}