import React from 'react'

const PublicLoader = () => {
  return (
    <div>
        <div className='fixed inset-0 z-50 bg-white bg-opacity-25 transition-opacity'></div>
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="w-full flex h-screen justify-center mt-48 bg-transparent">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white border-t-transparent mt-24"></div>
            </div>
        </div>
    </div>
    
  )
}

export default PublicLoader