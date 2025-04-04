import './App.css'
import { Outlet } from 'react-router'

function App() {
 
  return (
   <body className='max-w-7xl flex flex-col justify-center items-center h-screen'>
   <Outlet/>
   <h1 className='text-red-500'>Welcome</h1>
   </body>
  )
}

export default App
