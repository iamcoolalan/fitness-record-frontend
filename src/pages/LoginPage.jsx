import { useState } from 'react';
import { CommonInput } from '../components'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  function handleEmailChange(e) {
    const { value } = e.target

    setEmail(value)
  }

  function handlePasswordChange(e) {
    const { value } = e.target;

    setPassword(value);
  }

  return (
    <div className="grid grid-cols-12 h-screen mx-auto font-mono">
      <div className="col-span-4 relative">
        <div className="flex flex-col justify-center items-center gap-5 w-full absolute top-[5%]">
          <h1 className="text-4xl font-semibold">Fitness Record</h1>
          <h1 className="text-4xl">Login</h1>
          <div className="flex flex-col gap-3 w-4/5">
            <CommonInput
              label="Email"
              name="email"
              placeholder="請輸入Email"
              type="email"
              onChange={handleEmailChange}
            ></CommonInput>
            <CommonInput
              label="Password"
              name="password"
              placeholder="請輸入密碼"
              type="password"
              onChange={handlePasswordChange}
            ></CommonInput>
          </div>
          <div className="flex flex-row-reverse w-4/5">
            <button className="text-2xl border-4 border-zinc-800 rounded w-1/3 hover:bg-yellow-200">
              Login
            </button>
          </div>
          <div className="flex flex-row justify-center items-center w-full gap-2 ">
            <hr className="border-2 border-gray-500 w-[20%]" />
            <span className="text-lg font-semibold">Or Register Now!</span>
            <hr className="border-2 border-gray-500 w-[20%]" />
          </div>
          <Link className="w-4/5" to="/signup">
            <p className="text-2xl border-4 border-zinc-800 hover:bg-yellow-200 rounded text-center">
              Register
            </p>
          </Link>
        </div>
      </div>
      <div className="col-span-8 bg-zinc-800 text-white relative"></div>
    </div>
  );
}

export default LoginPage