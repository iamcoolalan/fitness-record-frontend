import React from 'react'
import clsx from 'clsx'

import { CommonInput } from '../components'

const TargetInfo = ({ currentTab, userTarget, onTargetChange}) => {
  const isNotTargetTab = currentTab !== "Target";
  // 前次目標改成 最近一次記錄身體數值的資料
  return (
    <div
      className={clsx(
        "grid grid-cols-9 grid-rows-[5%_repeat(5,minmax(0,1fr))_13%] gap-4 h-full px-3",
        { hidden: isNotTargetTab }
      )}
    >
      <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
        <div className="col-span-5 flex flex-col">
          <h1 className="text-xl text-slate-600 font-semibold">當前目標</h1>
          <hr className="border-t-2 border-slate-600" />
          <hr className="border-t-4 border-slate-600 mt-1" />
        </div>
        <div className="col-span-2 flex flex-col">
          <h1 className="text-xl text-slate-400 font-semibold">近一次數據測量</h1>
          <hr className="border-t-2 border-slate-400" />
          <hr className="border-t-4 border-slate-400 mt-1" />
        </div>
      </div>
      <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
        <CommonInput
          className="col-span-5"
          label="身高"
          name="targetHeight"
          type="number"
          value={userTarget.targetHeight}
          step="0.1"
          onChange={onTargetChange}
        ></CommonInput>
        <CommonInput
          className="col-span-2"
          inputClassName="border-gray-400 cursor-not-allowed"
          label="身高"
          name="previousTargetHeight"
          type="number"
          value={0}
          disabled={true}
        ></CommonInput>
      </div>
      <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
        <CommonInput
          className="col-span-5"
          label="體重"
          name="targetWeight"
          type="number"
          value={userTarget.targetWeight}
          step="0.1"
          onChange={onTargetChange}
        ></CommonInput>
        <CommonInput
          className="col-span-2"
          inputClassName="border-gray-400 cursor-not-allowed"
          label="體重"
          name="previousTargetHeight"
          type="number"
          value={0}
          disabled={true}
        ></CommonInput>
      </div>
      <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
        <CommonInput
          className="col-span-5"
          label="肌肉量"
          name="targetSkeletalMuscle"
          type="number"
          value={userTarget.targetSkeletalMuscle}
          step="0.1"
          onChange={onTargetChange}
        ></CommonInput>
        <CommonInput
          className="col-span-2"
          inputClassName="border-gray-400 cursor-not-allowed"
          label="肌肉量"
          name="previousTargetSkeletalMuscle"
          type="number"
          value={0}
          disabled={true}
        ></CommonInput>
      </div>
      <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
        <CommonInput
          className="col-span-5"
          label="體脂率"
          name="targetBodyFat"
          type="number"
          value={userTarget.targetBodyFat}
          step="0.01"
          onChange={onTargetChange}
        ></CommonInput>
        <CommonInput
          className="col-span-2"
          inputClassName="border-gray-400 cursor-not-allowed"
          label="體脂率"
          name="previousTargetBodyFat"
          type="number"
          value={0}
          disabled={true}
        ></CommonInput>
      </div>
      <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
        <CommonInput
          className="col-span-5"
          label="內臟脂肪等級"
          name="targetVisceralFatLevel"
          type="number"
          value={userTarget.targetVisceralFatLevel}
          step="1"
          onChange={onTargetChange}
        ></CommonInput>
        <CommonInput
          className="col-span-2"
          inputClassName="border-gray-400 cursor-not-allowed"
          label="內臟脂肪等級"
          name="previousVisceralFatLevel"
          type="number"
          value={0}
          disabled={true}
        ></CommonInput>
      </div>
    </div>
  );
};

export default TargetInfo