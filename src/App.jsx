import React from 'react'
import Sidebar from './component/sidebar/Sidebar'
import Main from './component/main/Main'

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <Main/>
    </div>
  )
}

export default App