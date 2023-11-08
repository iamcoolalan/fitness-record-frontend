import { useContext } from "react"

import { AccountInfo, TargetInfo } from "../components"
import { MainLayoutTabContext } from "../contexts/MainLayoutTabContext"

const ProfilePage = () => {
  const { currentTab } = useContext(MainLayoutTabContext);
  const title = currentTab === 'Account'? 'Personal Detail' : 'Target'

  return (
    <div className='flex flex-col gap-2 h-full w-full relative'>
      <div className='flex flex-col gap-2 px-3 pt-2'>
        <h1 className='text-3xl'>{title}</h1>
        <hr className='border-t-4 border-zinc-700 w-full'/>
      </div>
      <TargetInfo
        currentTab={currentTab}
      ></TargetInfo>
      <AccountInfo
        currentTab={currentTab}
      ></AccountInfo>
      <div className="absolute bottom-0 w-full">
        <div className="flex flex-row justify-center items-center">
          <button className="border-4 border-zinc-700 rounded-lg text-xl p-2 w-[25%] hover:bg-yellow-200">Update</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage