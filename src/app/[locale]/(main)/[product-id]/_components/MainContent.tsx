import React from 'react'
import Section1 from './Section1'
import Section2 from './Section2'

const MainContent = () => {
  return (
    <div className='container mt-[100px] space-y-10 px-6'>
      <Section1 />
      <Section2 />
    </div>
  )
}

export default MainContent
