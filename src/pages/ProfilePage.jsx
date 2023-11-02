import { CommonInput, DateInput, RadioInput, AccountInfo, TargetInfo } from "../components"

const ProfilePage = () => {
  return (
    <div className='flex flex-col gap-5 h-full w-full relative'>
      <div className='flex flex-col gap-2 px-3 pt-2'>
        <h1 className='text-3xl'>Target/Personal Detail</h1>
        <hr className='border-t-4 border-zinc-700 w-full'/>
      </div>
      <TargetInfo
        isHidden={true}
      ></TargetInfo>
      <AccountInfo
        isHidden={false}
      ></AccountInfo>
      <div className="absolute bottom-3 w-full">
        <div className="flex flex-row justify-center items-center">
          <button className="border-4 border-zinc-700 rounded-lg text-xl p-2 w-[25%] hover:bg-yellow-200">Update</button>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage