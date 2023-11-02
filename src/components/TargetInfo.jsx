import React from 'react'
import clsx from 'clsx'

import { CommonInput } from '../components'

const TargetInfo = ({
  isHidden
}) => {
  return (
    <div className={clsx("grid grid-cols-9 grid-rows-[5%_repeat(8,minmax(0,1fr))] gap-3 h-full px-3", { "hidden" : isHidden })}>
        <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
          <div className="col-span-5 flex flex-col">
            <h1 className="text-xl text-slate-600 font-semibold">當前目標</h1>
            <hr className="border-t-2 border-slate-600"/>
            <hr className="border-t-4 border-slate-600 mt-1"/>
          </div>
          <div className="col-span-2 flex flex-col">
            <h1 className="text-xl text-slate-400 font-semibold">前次目標</h1>
            <hr className="border-t-2 border-slate-400"/>
            <hr className="border-t-4 border-slate-400 mt-1"/>
          </div>
        </div>
        <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
          <CommonInput
            className="col-span-5"
            label='身高'
            name='targetHeight'
            type='number'
            defaultValue={178}
            step='0.1'
          ></CommonInput>
          <CommonInput
            className="col-span-2"
            inputClassName="border-gray-400 cursor-not-allowed"
            label='身高'
            name='previousTargetHeight'
            type='number'
            defaultValue={178}
            disabled={true}
          ></CommonInput>
        </div>
        <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
          <CommonInput
            className="col-span-5"
            label='體重'
            name='targetWeight'
            type='number'
            defaultValue={72}
            step='0.1'
          ></CommonInput>
          <CommonInput
            className="col-span-2"
            inputClassName="border-gray-400 cursor-not-allowed"
            label='體重'
            name='previousTargetHeight'
            type='number'
            defaultValue={75}
            disabled={true}
          ></CommonInput>
        </div>
        <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
          <CommonInput
            className="col-span-5"
            label='肌肉量'
            name='targetHeight'
            type='number'
            defaultValue={35.5}
            step='0.1'
          ></CommonInput>
          <CommonInput
            className="col-span-2"
            inputClassName="border-gray-400 cursor-not-allowed"
            label='肌肉量'
            name='previousTargetHeight'
            type='number'
            defaultValue={34}
            disabled={true}
          ></CommonInput>
        </div>
        <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
          <CommonInput
            className="col-span-5"
            label='體脂率'
            name='targetHeight'
            type='number'
            defaultValue={0.15}
            step='0.01'
          ></CommonInput>
          <CommonInput
            className="col-span-2"
            inputClassName="border-gray-400 cursor-not-allowed"
            label='體脂率'
            name='previousTargetHeight'
            type='number'
            defaultValue={0.18}
            disabled={true}
          ></CommonInput>
        </div>
        <div className="col-span-9 row-span-1 grid grid-cols-9 gap-3">
          <CommonInput
            className="col-span-5"
            label='內臟脂肪等級'
            name='targetHeight'
            type='number'
            defaultValue={3}
            step='1'
          ></CommonInput>
          <CommonInput
            className="col-span-2"
            inputClassName="border-gray-400 cursor-not-allowed"
            label='內臟脂肪等級'
            name='previousTargetHeight'
            type='number'
            defaultValue={3}
            disabled={true}
          ></CommonInput>
        </div>
      </div>
  )
}

export default TargetInfo