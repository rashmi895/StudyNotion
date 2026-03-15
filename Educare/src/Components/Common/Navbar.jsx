import React from 'react'
import { NavbarLinks } from '../../Data/NavbarLinks'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileDropDown from "../Core/Auth/ProfileDropDown"
import websiteLogo from '../../assets/Logos/websiteLogo.png'
import { AiOutlineShoppingCart } from "react-icons/ai";
const Navbar = () => {
// import all the slices 
const {token} = useSelector((state)=>state.auth);
const {cart} = useSelector((state)=>state.cart);
const {user} = useSelector((state)=>state.profile);

  const {totalItems} = useSelector((state)=> state.cart);

  // match route location logic 
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route},location.pathname);
    }
  
  return (
    <div>
       <div className="flex h-14 items-start gap-6 justify-center border-b-[1px] border-b-fuchsia-500">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        
        {/* Logo */}
        <div className=' flex items-center gap-2 '>
        <Link to="/">
          <img
            src={websiteLogo}
            width={160}
            height={42}
            loading="lazy"
            alt="Logo"
          />
        </Link>
</div>
        {/* Nav Links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {
                  link.title === "Catalog" ? (
                    <div>
                      {/* Catalog dropdown placeholder */}
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-amber-400"
                            : "text-white"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )
                }
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </div>
  

  {/* LOGIN/SIGNUP DASBOARD  */}
<div className='hidden md:flex gap-x-6 items-center'>
  {   
    user && user?.accountType != "Instructor" && (
      <Link to="/dashboard/cart" className='relative pr-2'>
        <AiOutlineShoppingCart className='text-2xl text-richblack-100 ' />
        {
          totalItems > 0 && (
            <span className=' absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
              {totalItems}
            </span>
          )
        }
      </Link>
    )
  }

  {
    token === null && (
      <Link to="/login">
        <button className='border border-richblack-700 bg-richblack-800 px-[20px] py-[8px] text-slate-50 rounded-md'>
          Log in
        </button>
      </Link>
    )
  }

  {
    token === null && (
      <Link to="/signup">
        <button className='border border-richblack-700 bg-richblack-800 px-[20px] py-[8px] text-white rounded-md'>
          Sign Up
        </button>
      </Link>
    )
  }
   {
                token !== null && <ProfileDropDown />
            }
</div>

    </div>
  )

}
export default Navbar;
