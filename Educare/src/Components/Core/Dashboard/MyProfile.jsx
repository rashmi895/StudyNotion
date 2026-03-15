import { useSelector } from 'react-redux'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from "../../../utils/DateFormatter"
import IconBtn from "../../Common/IconBtn"

const MyProfile = () => {
  const {user} = useSelector((state)=> state.profile);
  const navigate = useNavigate();

  console.log("User from Redux:", user);
    
  return (
    <>
    <h1 className="mb-14 text-3xl font-medium text-white">
      My Profile
    </h1>
    <div className="flex items-center justify-between rounded-md border border-amber-100 bg-amber-50 p-8 px-12 ">
      <div className="flex items-center gap-x-4">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-19.5 rounded-full object-cover"
        />
        <div className="space-y-1">
          <p className="text-lg font-semibold text-red-600">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="text-sm text-amber-700">{user?.email}</p>
        </div>
      </div>
      <IconBtn
        text="Edit"
        onclick={() => {
          navigate("/dashboard/settings")
        }}
      >
        <RiEditBoxLine />
      </IconBtn>
    </div>
    <div className="my-10 flex flex-col gap-y-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold text-white">About</p>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <p
        className={`${
          user?.additionalDetails?.about
            ? "text-white"
            : "text-red-500"
        } text-sm font-medium`}
      >
        {user?.additionalDetails?.about ?? "Write Something About Yourself"}
      </p>
    </div>
    <div className="my-10 flex flex-col gap-y-10 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-semibold text-white">
          Personal Details
        </p>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="flex max-w-125 justify-between">
        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 text-sm text-red-500">First Name</p>
            <p className="text-sm font-medium text-white">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-red-500">Email</p>
            <p className="text-sm font-medium text-white">
              {user?.email}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-red-500">Gender</p>
            <p className="text-sm font-medium text-white">
              {user?.additionalDetails?.gender ?? "Add Gender"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div>
            <p className="mb-2 text-sm text-red-500">Last Name</p>
            <p className="text-sm font-medium text-white">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-red-500">Phone Number</p>
            <p className="text-sm font-medium text-white">
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm text-red-500">Date Of Birth</p>
            <p className="text-sm font-medium text-white">
              {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                "Add Date Of Birth"}
            </p>


          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default MyProfile;
