import { AuthInput } from '../components'
import { Link } from 'react-router-dom';
import { testImage } from '../assets'

const LoginPage = () => {
  return (
    <div className='grid grid-cols-12 h-screen mx-auto font-mono'>
        <div className='col-span-4 relative top-[5%]'>
          <div className='flex flex-col justify-center items-center gap-5 w-full'>
            <h1 className='text-4xl font-semibold'>Fitness Record</h1>
            <h1 className='text-4xl'>Login</h1>
            <div className='flex flex-col gap-3 w-4/5'>
              <AuthInput></AuthInput>
              <AuthInput></AuthInput>
            </div>
            <div className='flex flex-row-reverse w-4/5'>
              <button className='text-2xl border-4 border-zinc-800 rounded w-1/3 hover:bg-yellow-200'>Login</button>
            </div>
            <div className='flex flex-row justify-center items-center w-full gap-2 '>
              <hr className='border-2 border-gray-500 w-[20%]'/>
              <span className='text-lg font-semibold'>Or Register Now!</span>
              <hr className='border-2 border-gray-500 w-[20%]'/>
            </div>
            <Link className='w-4/5' to="/signup">
                <p className='text-2xl border-4 border-zinc-800 hover:bg-yellow-200 rounded text-center'>Register</p>
             </Link>
          </div>
        </div>
        <div className='col-span-8 bg-zinc-800 text-white relative'>
          <img src={testImage} alt="" className='absolute bottom-[3%] right-[3%] w-[90%]' />
        </div>
    </div>
  )
}

export default LoginPage