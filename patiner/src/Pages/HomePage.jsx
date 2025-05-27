import React from 'react'

const HomePage = () => {
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'> Pati Nerde - Hoşgeldiniz</h1>
      </div>

      <div className="max-w-sm bg-white rounded-xl shadow-lg p-4 border border-gray-200">
        <div className="flex items-center gap-4">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Çağrı Kandemir</h3>
            <p className="text-gray-500 text-sm">Back End Developer</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 text-sm">
           Aktif Konumlar : 
          </p>
        </div>
      </div>

    </div>
  )
}

export default HomePage