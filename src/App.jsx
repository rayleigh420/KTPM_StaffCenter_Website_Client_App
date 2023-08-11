import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<h1 className='text-red-500'>Hello World Duy Le</h1>} />
        <Route path='/test' element={<button className='btn'>Button</button>} />
      </Routes>
    </>
  )
}

export default App
