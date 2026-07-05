import { useState } from "react"
import React from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {sidebarLinks} from "../../../Data/dashboard-links"
import { logout } from '../../../Services/operations/authAPI'
import ConfirmationModal from '../../Common/ConfirmationModal'
import SidebarLink from './SidebarLink'
const Sidebar = () => {

  const { user, loading: profileLoading } = useSelector(
        (state) => state.profile
      )
      const { loading: authLoading } = useSelector((state) => state.auth)
      const dispatch = useDispatch()
      const navigate = useNavigate()
      // to keep track of confirmation modal
      const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-55 items-center border-r border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

return (
  <div className='flex h-[calc(100vh-3.5rem)] min-w-55 flex-col border-r border-r-amber-50 bg-blue-50 py-10'>
    <div className='flex flex-col'>
      {sidebarLinks.map((link) => {
        if(link.type && user?.accountType !== link.type) return null;
        return <SidebarLink key={link.id} link={link} iconName={link.icon} />
      })}
      {/* two sections ke bich ka line */}
      <div className="mx-auto mt-6 mb-6 h-px w-10/12 bg-richblack-700" />
    </div>

    {/* settings wala icon  */}
    <SidebarLink link={{name: "Settings", path: "/dashboard/settings"}} iconName="VscSettingsGear" />

    {/* logout button and confirmation modal logic */}
    <button onClick={()=>{
      setConfirmationModal({
        text1: "Are you sure?",
        text2: "You will be logged out of your account.",
        btn1Text: "Logout",
        btn2Text: "Cancel",
        btn1Handler: ()=> dispatch(logout(navigate)),
        btn2Handler: ()=> setConfirmationModal(null),
      })
    }}
    className="px-8 py-2 text-sm font-medium text-richblack-300">
      <div className="flex items-center gap-x-2">
        <VscSignOut className="text-lg" />
        <span>Logout</span>
      </div>
    </button>

    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
  </div>
)
}

export default Sidebar
