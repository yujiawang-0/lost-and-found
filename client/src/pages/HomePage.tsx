// import { AppShell, Burger } from '@mantine/core';
// import { Header } from '../components/Header/Header';
// import { toast, Toaster } from 'react-hot-toast'
// import RateLimitedUI from '../components/RateLimitedPage/RateLimitedUI';
// import { Turtle } from "lucide-react";


// import { useDisclosure } from '@mantine/hooks';
// import {useState, useEffect} from 'react';
// import LostPage from './LostPage';
  

// export default function HomePage() {
//     const [opened, { toggle }] = useDisclosure();
//     const [ isRateLimited, setIsRateLimited ] = useState(true)
    
//     useEffect(() => {
//       if (isRateLimited) {
//         // toast((t) => (
//         //   <span>
//         //     {RateLimitedUI()}
//         //     <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
//         //   </span>
//         //   ),
//         //   {
//         //     icon: <Turtle />,
//         //   }
//         // )

//       }
//     } , [isRateLimited]);

    
//     return (
//     <>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//       />

//       {isRateLimited && <RateLimitedUI />}
      
//       <AppShell
//         header={{ height: 56 }}
//         padding="md"
//       >
//         <AppShell.Header>
//           <Burger
//             opened={opened}
//             onClick={toggle}
//             hiddenFrom="sm"
//             size="sm"
//           />
//           <Header />
//         </AppShell.Header>


//         <AppShell.Main>
//           <LostPage />
//         </AppShell.Main>

//       </AppShell>
//     </>
//     )
// };

// //export default HomePage;
