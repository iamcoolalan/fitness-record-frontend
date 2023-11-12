import { useState } from 'react';
import { CommonInput, RadioInput, DateInput } from '../components'
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { useCheckAuthenticated } from '../hooks';
import Swal from 'sweetalert2';

const genderOptions = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
];

const SignUpPage = () => {
  useCheckAuthenticated()

   const [name, setName] = useState(null);
   const [email, setEmail] = useState(null);
   const [password, setPassword] = useState(null);
   const [passwordCheck, setPasswordCheck] = useState(null);
   const [birthday, setBirthday] = useState(null);
   const [gender, setGender] = useState(null);

   const navigate = useNavigate()
   const { register } = useAuth()

   function handleNameChange(e) {
     const { value } = e.target;

     setName(value);
   }
   
   function handleEmailChange(e) {
     const { value } = e.target;

     setEmail(value);
   }

   function handlePasswordChange(e) {
     const { value } = e.target;

     setPassword(value);
   }

   function handlePasswordCheckChange(e) {
     const { value } = e.target;

     setPasswordCheck(value);
   }

   function handleBirthdayChange(e) {
     const { value } = e.target;

     setBirthday(value);
     // result format 2023-11-09
   }

   function handleGenderChange(e) {
     const { value } = e.target;

     setGender(value);
   }

   const handleRegisterClick = async () => {
    if ( name === null || name.length === 0 ) {
      return
    }

    if (email === null || email.length === 0) {
      return;
    }

    if (password === null || password.length === 0) {
      return;
    }

    if (passwordCheck === null || passwordCheck.length === 0) {
      return;
    } else if (password !== passwordCheck) {
      return;
    }

    if (birthday === null || birthday.length === 0) {
      return;
    }

    if (gender === null || gender.length === 0) {
      return;
    }

    const { status, ...response } = await register({
      name,
      email,
      password,
      passwordCheck,
      birthday,
      gender
    })

    if (status === 'success') {
      navigate('/login')

      Swal.fire({
        title: '註冊成功',
        icon: 'success', 
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
      })
    } else {
      Swal.fire({
        title: '登入失敗',
        icon: 'error',
        showConfirmButton: false,
        text: response.summary,
        timer: 1200,
        position: 'top'
      })
    }
   }

  return (
    <div className="grid grid-cols-12 h-screen mx-auto font-mono">
      <div className="col-span-4 bg-zinc-800"></div>
      <div className="col-span-8 relative">
        <div className="flex flex-col justify-center items-center gap-5 w-[60%] absolute top-[5%]">
          <h1 className="text-4xl font-semibold">Fitness Record</h1>
          <h1 className="text-4xl">Register</h1>
          <div className="grid grid-rows-3 grid-cols-2 gap-5 w-4/5">
            <CommonInput
              type="text"
              label="Name"
              name="name"
              placeholder="請輸入暱稱"
              onChange={handleNameChange}
            ></CommonInput>
            <CommonInput
              type="email"
              label="Email"
              name="email"
              placeholder="請輸入Email"
              onChange={handleEmailChange}
            ></CommonInput>
            <CommonInput
              type="text"
              label="Password"
              name="password"
              placeholder="請輸入密碼"
              onChange={handlePasswordChange}
            ></CommonInput>
            <CommonInput
              type="text"
              label="Password Check"
              name="passwordCheck"
              placeholder="請再次輸入密碼"
              onChange={handlePasswordCheckChange}
            ></CommonInput>
            <DateInput
              label="Birthday"
              name="birthday"
              onChange={handleBirthdayChange}
            ></DateInput>
            <RadioInput
              className="col-span-1"
              title="Gender"
              options={genderOptions}
              onChange={handleGenderChange}
            ></RadioInput>
          </div>
          <div className="flex flex-row-reverse w-4/5 mt-8">
            <button
              className="text-2xl border-4 border-zinc-800 rounded w-1/3 hover:bg-yellow-200"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
          <div className="flex flex-row justify-center items-center w-full gap-2 ">
            <hr className="border-2 border-gray-500 w-[10%]" />
            <span className="text-lg font-semibold">
              Have an account? Login now!
            </span>
            <hr className="border-2 border-gray-500 w-[10%]" />
          </div>
          <Link className="w-4/5" to="/login">
            <p className="text-2xl border-4 border-zinc-800 hover:bg-yellow-200 rounded text-center">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage