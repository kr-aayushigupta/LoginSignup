import React from 'react'

function Container({className,children}) {
  return (
    
    <div className={`max-w-[1200px] mx-auto ${className} dark:bg-slate-800`}>
        {children}
        
    </div>
    
  )
}

export default Container