import { useState } from 'react'
import PageHeader from './layouts/PageHeder'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div>2</div>
       </div>
    </>
  )
}

export default App
