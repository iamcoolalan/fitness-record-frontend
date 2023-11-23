import clsx from 'clsx'

import { CommonInput, DateInput, RadioInput } from '../components' 

import { toDateString } from '../helpers/formatHelpers'

const AccountInfo = ({ currentTab, userInfo, onInfoChange }) => {
  const userBirthday = new Date(userInfo.birthday);
  const isNotAccountTab = currentTab !== "Account";
  const genderOptions = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];

  return (
    <div
      className={clsx(
        "grid grid-rows-[repeat(5,minmax(0,1fr))] grid-cols-2 gap-3 px-3 w-full",
        { hidden: isNotAccountTab }
      )}
    >
      <CommonInput
        className="row-span-1 col-span-1"
        label="暱稱"
        name="name"
        placeholder="請輸入暱稱"
        type="text"
        value={userInfo.name}
        onChange={onInfoChange}
      ></CommonInput>
      <CommonInput
        className="row-span-1 col-span-1"
        label="Email"
        name="email"
        placeholder="請輸入Email"
        type="email"
        value={userInfo.email}
        onChange={onInfoChange}
      ></CommonInput>
      <DateInput
        label="生日"
        name="birthday"
        value={toDateString(userBirthday)}
        onChange={onInfoChange}
      ></DateInput>
      <CommonInput
        className="row-span-1 col-span-1"
        label="密碼"
        name="password"
        placeholder="請輸入密碼"
        type="password"
        onChange={onInfoChange}
      ></CommonInput>
      <div className="row-span-1 col-span-1 flex flex-col gap-1">
        <h3 className="text-lg">日常活動水平</h3>
        <select
          className="text-lg border-2 flex-1 rounded border-stone-950 focus:outline-none focus:border-4 focus:border-yellow-200 focus:ring focus:ring-orange-300 focus:rounded"
          name="activityFactor"
          id="activityFactor"
          value={userInfo.activityFactor}
          onChange={onInfoChange}
        >
          <option className="text-lg" value="sedentary">
            無
          </option>
          <option className="text-lg" value="lightly_active">
            輕度
          </option>
          <option className="text-lg" value="moderately_active">
            中度
          </option>
          <option className="text-lg" value="very_active">
            重度
          </option>
          <option className="text-lg" value="extra_active">
            超級重度
          </option>
        </select>
      </div>
      <CommonInput
        label="確認密碼"
        name="passwordCheck"
        placeholder="請再次輸入密碼"
        type="password"
        className="row-span-1 col-span-1"
        onChange={onInfoChange}
      ></CommonInput>
      <RadioInput
        title="性別"
        name="gender"
        options={genderOptions}
        userGender={userInfo.gender}
        onChange={onInfoChange}
      ></RadioInput>
    </div>
  );
};

export default AccountInfo