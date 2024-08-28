import { useState } from 'react'
import './index.css'
import Join from './components/Join/Join'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Join />
    </>
  )
}

export default App
