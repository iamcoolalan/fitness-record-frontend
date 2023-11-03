import clsx from 'clsx'

import { CommonInput, DateInput, RadioInput } from '../components' 

const AccountInfo = ({
  currentTab
}) => {
  const isNotAccountTab = currentTab !== 'Account'
  const genderOptions = [
    {name: 'Male'},
    {name: 'Female'},
  ]

  return (
    <div className={clsx('grid grid-rows-[repeat(5,minmax(0,1fr))] grid-cols-2 gap-3 px-3 w-full', { "hidden" : isNotAccountTab })}>
        <CommonInput
          label='暱稱'
          name='name'
          placeholder='請輸入暱稱'
          type='text'
          className='row-span-1 col-span-1'
        ></CommonInput>
         <CommonInput
          label='Email'
          name='email'
          placeholder='請輸入Email'
          type='email'
          className='row-span-1 col-span-1'
        ></CommonInput>
        <DateInput
          label='生日'
          name='birthday'
          defaultValue='1996-12-13'
        ></DateInput>
        <CommonInput
          label='密碼'
          name='password'
          placeholder='請輸入密碼'
          type='password'
          className='row-span-1 col-span-1'
        ></CommonInput>
        <div className="row-span-1 col-span-1 flex flex-col gap-1">
          <h3 className='text-lg'>日常活動水平</h3>
          <select className="text-lg border-2 flex-1 rounded border-stone-950 focus:outline-none focus:border-4 focus:border-yellow-200 focus:ring focus:ring-orange-300 focus:rounded" name="activityFactor" id="activityFactor">
            <option className="text-lg" value="sedentary">無</option>
            <option className="text-lg" value="lightlyActive">輕度</option>
            <option className="text-lg" value="moderatelyActive">中度</option>
            <option className="text-lg" value="veryActive">重度</option>
            <option className="text-lg" value="extraActive">超級重度</option>
          </select>
        </div>
        <CommonInput
          label='確認密碼'
          name='passwordCheck'
          placeholder='請再次輸入密碼'
          type='password'
          className='row-span-1 col-span-1'
        ></CommonInput>
        <RadioInput
          title='性別'
          options={genderOptions}
        ></RadioInput>
      </div>
    )
}

export default AccountInfo