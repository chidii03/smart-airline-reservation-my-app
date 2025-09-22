// import { SessionProvider } from "next-auth/react"
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Provider } from 'react-redux'
// import { store } from '@/app/store'
// import { Toaster } from 'react-hot-toast'
// import AOS from 'aos'
// import 'aos/dist/aos.css'
// import { ReactNode, useEffect } from 'react'

// const queryClient = new QueryClient()

// export default function Providers({ children }: { children: ReactNode }){
//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       easing: 'ease-out-back'
//     })
//   }, [])

//   return (
//     <SessionProvider>
//       <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//           {children}
//           <Toaster 
//             position="top-right"
//             toastOptions={{
//               style: {
//                 background: 'black',
//                 color: '#FFFFFF'
//               },
//               duration: 5000
//             }}
//           />
//         </Provider>
//       </QueryClientProvider>
//     </SessionProvider>
//   )
// }