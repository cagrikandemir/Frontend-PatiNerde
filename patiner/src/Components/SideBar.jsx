import React, { useState } from 'react'
import logo from '../Image/logowhite.png';
import { Link } from 'react-router-dom';


// icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";

const menuItems = [
  {
    icons: <IoHomeOutline size={30} />,
    label: 'Home',
    path: '/'
  },
  {
    icons: <FaMapMarkedAlt size={30} />,
    label: 'Map',
    path: '/map'
  },

  {
    icons: <TbReportSearch size={30} />,
    label: 'Report'
  },
  {
    icons: <CiSettings size={30} />,
    label: 'Setting'
  }
]

export default function Sidebar() {

  const [open, setOpen] = useState(true)

  return (
    <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-purple-500 text-white ${open ? 'w-60' : 'w-16'}`}>


      <div className=' px-3 py-2 h-20 flex justify-between items-center'>
        <img src={logo} alt="Logo" className={`${open ? 'w-20' : 'w-0'} rounded-md`} />
        <div><MdMenuOpen size={34} className={` duration-500 cursor-pointer ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} /></div>
      </div>



      <ul className='flex-1'>
        {
          menuItems.map((item, index) => {
            return (
              <Link to={item.path} key={index}>
                <li key={index} className='px-3 py-2 my-2 hover:bg-purple-400 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
                  <div>{item.icons}</div>
                  <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
                  <p className={`${open && 'hidden'} absolute left-32 top-1 z-50 shadow-md rounded-md
w-0 p-0 text-black bg-white duration-100 overflow-hidden whitespace-nowrap group-hover:w-fit group-hover:p-2 group-hover:left-16`}>
                    {item.label}
                  </p>
                </li>
              </Link>

            )
          })
        }
      </ul>


      <div className='flex items-center gap-2 px-3 py-2'>
        <div><FaUserCircle size={30} /></div>
        <div className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
          <p>Çağrı</p>
          <span className='text-xs'>cagrikandemir.dev@gmail.com</span>

        </div>
      </div>


    </nav>
  )
}