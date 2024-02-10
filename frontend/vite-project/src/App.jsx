import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='Dashboard' element={<Dashboard/>} />
          <Route path='Send' element={SendMoney} />
        </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
