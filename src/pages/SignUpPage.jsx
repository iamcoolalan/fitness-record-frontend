import { AuthInput, RadioInput, DateInput } from '../components'
import { Link } from 'react-router-dom';

const dummyData = [
  {name: 'Male'},
  {name: 'Female'}
]

const SignUpPage = () => {
  return (
    <div className='grid grid-cols-12 h-screen mx-auto font-mono'>
        <div className='col-span-4 bg-zinc-800'>
        </div>
        <div className='col-span-8 relative top-[5%]'>
          <div className='flex flex-col justify-center items-center gap-5 w-[60%]'>
            <h1 className='text-4xl font-semibold'>Fitness Record</h1>
            <h1 className='text-4xl'>Register</h1>
            <div className='flex flex-col gap-3 w-4/5'>
              <AuthInput></AuthInput>
              <AuthInput></AuthInput>
              <AuthInput></AuthInput>
              <AuthInput></AuthInput>
              <DateInput></DateInput>
              <RadioInput
                title="Gender"
                options={dummyData}
              ></RadioInput>
            </div>
            <div className='flex flex-row-reverse w-4/5'>
              <button className='text-2xl border-4 border-zinc-800 rounded w-1/3 hover:bg-yellow-200'>Register</button>
            </div>
            <div className='flex flex-row justify-center items-center w-full gap-2 '>
              <hr className='border-2 border-gray-500 w-[10%]'/>
              <span className='text-lg font-semibold'>Have an account? Login now!</span>
              <hr className='border-2 border-gray-500 w-[10%]'/>
            </div>
            <Link className='w-4/5' to="/login">
                <p className='text-2xl border-4 border-zinc-800 hover:bg-yellow-200 rounded text-center'>Login</p>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default SignUpPage