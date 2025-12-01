// "use client"

// // components/Banner.tsx
// import Link from 'next/link'

// export default function Banner() {
//   return (
//     <div className="relative h-screen flex items-center justify-start">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0 z-0">
//         <div 
//           className="w-full h-full bg-[url('/images/bgimage.png')] bg-cover bg-center"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,

//             zIndex: -1
//           }}
//         />
//         <div className="absolute inset-0 bg-black/50 z-10"></div>
//       </div>

//       {/* Content */}
//       <div className="z-20 w-[80%] mx-auto">
//         <h1 className="text-4xl text-left md:text-6xl font-bold text-white mb-6">
//           Transform Your Life <br /> Through Fitness
//         </h1>
//         <p className="text-xl md:text-2xl text-white mb-8  ">
//           Expert-guided workouts, Nutrition Plans, and wellness advice to help <br /> you achieve your goals
//         </p>
//         <div className="flex gap-4">
//           <Link
//             href="/consultation"
//             className="bg-primary hover:bg-primary-dark text-white font-bold  py-3 px-6 rounded-full transition"
//           >
//             Free Trial 
//           </Link>
//           <Link
//             href="/visit"
//             className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 border-2 border-white rounded-full transition"
//           >
//             Visit Steve
//           </Link>
//         </div>
//         <p className="text-white mt-8 text-sm md:text-base">
//           Try 7 days for free trial.
//         </p>
//       </div>
//     </div>
//   )
// }




"use client"

// components/Banner.tsx
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { message } from 'antd'
import toast, { Toaster } from 'react-hot-toast'
import { useTakeFreeTrialMutation } from '@/redux/fetures/subscription/subscription'
import { useStartVideoQuery } from '@/redux/fetures/landing/landing'

export default function Banner() {

  const { data } = useStartVideoQuery();
  const fullData = data?.data?.attributes[0]?.introductionVideo?.attachment;
  console.log(fullData);

  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState(null)


  // Show modal when component mounts
  useEffect(() => {
    setShowModal(true)
    const user = localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const closeModal = () => {
    setShowModal(false)
  }

  const [freeTrial, { isLoading }] = useTakeFreeTrialMutation();

  const handleFreeTrial = async () => {
    if (!user) {
      toast.error('Please login to continue')
      return
    }
    else {
      try {
        const res = await freeTrial().unwrap();
        if (res?.code == 200) {
          toast.success(res?.message);
          setTimeout(() => {
            window.location.href = `${res.data?.attributes}`
          }, 1000);
        }
        else {
          toast.error(res?.message);
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to take free trial");
      }
    }
  }

  return (
    <>
      <Toaster />
      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-[60%] mx-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Video Container */}
            <div className="relative min-h-[70vh] flex items-center justify-center bg-black rounded-lg overflow-hidden">
              {fullData ? (
                <div key={fullData} className="relative overflow-hidden ">
                  <video autoPlay controls className="rounded-lg border-2 border-[#eee] w-full mx-auto h-auto">
                    <source src={fullData} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div class="mx-auto w-full rounded-md border border-blue-300 p-4">
                  <div class="flex animate-pulse space-x-4">
                    <div class="flex-1 space-y-5 py-1">
                      {
                        [...Array(16)].map((index) => (
                          <div class="h-2 rounded bg-gray-200"></div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Banner Content */}
      <div className="relative h-screen flex items-center justify-start">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-[url('/images/bgimage.png')] bg-cover bg-center"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1
            }}
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>

        {/* Content */}
        <div className="z-20 w-[80%] mx-auto">
          <h1 className="text-4xl text-left md:text-6xl font-bold text-white mb-6">
            Transform Your Life <br /> Through Fitness
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Expert-guided workouts, Nutrition Plans, and wellness advice to help <br /> you achieve your goals
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleFreeTrial}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition"
            >
              Free Trial {isLoading && "..."}
            </button>
            <Link
              href="/visit"
              className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-6 border-2 border-white rounded-full transition"
            >
              Visit Steve
            </Link>
          </div>
          <p className="text-white mt-8 text-sm md:text-base">
            Try 7 days for free trial.
          </p>
        </div>
      </div>
    </>
  )
}