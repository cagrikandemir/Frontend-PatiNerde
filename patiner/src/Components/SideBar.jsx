import logo from '../Image/logo.png'
import { MdMenuOpen } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";




const menuItems = [
  {
    icons: <FaHome size={25} />,
    label: 'Home',
  },
  {
    icons: <FaMapLocationDot size={25} />,
    label: 'Harita',
  },
]
const SideBar = () => {
  return (
    <nav className='shadow-md h-screen w-60 p-2 flex flex-col'>
      <div className='border px-3 py-2 h-20 flex justify-between items-center'>
        <img src={logo} alt="Logo" className='w-20 rounded-out' />
        <MdMenuOpen size={35} className='cursor-pointer' />
      </div>


      <ul className='flex-1'>
        {
          menuItems.map((item, index) => {
            return (
              <li className='px-3 py-2 my-2 hover:bg-blue-100 rounded-md duration-300 cursor-pointer flex gap-2 items-center' key={index}>
                <div>{item.icons}</div>
                <p>{item.label}</p>
              </li>
            )
          }
          )}
      </ul>


      <div className=' flex items-center gap-2 px-3 py-2'>
        <FaCircleUser size={60} />
        <div  className='leading-5'>
          <p>Çağrı Kandemir</p>
          <span className='text-xs'>cagrikandemir.dev@gmail.com</span>
        </div>
      </div>
    </nav>

  )
}

export default SideBar