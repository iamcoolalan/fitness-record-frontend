import clsx from 'clsx'

import { CommonInput } from '../components'

const CreateWorkoutRecord = ({
  currentTab,
  today,
  tableList,
  categoryPath,
  categoryList,
  onRemoveWorkoutClick,
  onRecordListChange,
  onCategoryPathClick,
  onCategoryListClick
}) => {
  const isNotWorkoutTab = currentTab !== 'Workout'

  return (
    <div className={clsx('grid grid-cols-12 border-4 border-gray-600 rounded-lg h-full', { "hidden" : isNotWorkoutTab })}>
      <div className='col-span-8 grid grid-rows-[17%_73%_10%]'>
        <div className='row-span-1 flex flex-col justify-center items-center gap-1 border-b-4 border-r-4 border-gray-600'>
          <CommonInput
            type='text'
            defaultValue='New Workout Record'
            inputTextSize='text-4xl text-center'
          ></CommonInput>
          <div className='flex gap-3'>
            <p className='text-lg text-gray-500 flex flex-row justify-center items-center gap-2'>
              Date:
              <CommonInput
                defaultValue={today}
                inputClassName='h-full'
              ></CommonInput>
            </p>
            <p className='text-lg text-gray-500 flex flex-row justify-center items-center gap-2'>
              Time:
               <CommonInput
                defaultValue='1hr'
                inputClassName='h-full w-full'
              ></CommonInput>
            </p>
          </div>
        </div>
        <div className='grid grid-cols-12 row-span-1 border-b-4 border-r-4 border-gray-600 p-1 overflow-y-scroll'>
          <table className='col-span-12 table-auto border-separate border border-slate-400 text-center'>
            <thead>
              <tr>
                <th className='border border-slate-300'>取消</th>
                <th className='border border-slate-300'>名稱</th>
                <th className='border border-slate-300'>組數</th>
                <th className='border border-slate-300'>次數</th>
                <th className='border border-slate-300'>重量(KG)</th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((item, index) => {
                return (
                  <tr key={`${item.name}${index}`}>
                    <td className='border border-slate-300'>
                      <button
                        className='text-3xl text-gray-400 rounded-xl h-full w-full hover:bg-yellow-200 hover:text-zinc-800'
                        onClick={() => onRemoveWorkoutClick(index)}
                      >-</button>
                    </td>
                    <td className='border border-slate-300'>{item.name}</td>
                    <td className='border border-slate-300'>
                      <input
                        className='border-2 border-zinc-600 rounded w-[50px] text-center'
                        type="number"
                        value={item.set}
                        onChange={(e) => onRecordListChange(e, index)}
                        min={0}
                        name="set"
                        id="set"
                      />
                    </td>
                    <td className='border border-slate-300'>
                      <input
                        className='border-2 border-zinc-600 rounded w-[50px] text-center'
                        type="number"
                        defaultValue={item.repetition}
                        onChange={(e) => onRecordListChange(e, index)}
                        min={0}
                        name="repetition"
                        id="repetition"
                      />
                    </td>
                    <td className='border border-slate-300'>
                      <input
                        className='border-2 border-zinc-600 rounded w-[60px] text-center'
                        type="number"
                        defaultValue={item.weight}
                        onChange={(e) => onRecordListChange(e, index)}
                        min={0}
                        name="weight"
                        step='0.1'
                        id="weight"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='row-span-1 flex flex-row justify-center items-center border-r-4 border-gray-600 w-full'>
          <button className='border-4 border-zinc-700 rounded-lg text-xl w-[30%] hover:bg-yellow-200'>
            Create
          </button>
        </div>
      </div>
      <div className='col-span-4 grid grid-rows-[17%_repeat(5,minmax(0,1fr))] gap-2'>
        <div className='row-span-1 flex flex-col border-b-4 border-gray-600 p-1'>
          <div>
            <h1 className='text-lg border-b-4 border-orange-300 text-zinc-700 font-bold'>Navigation</h1>
          </div>
          <div className='flex flex-row flex-wrap pt-1'>
            {categoryPath.map((path, index) => {
              return (
                <div key={`${path}${index}`}>
                  <button
                    className='font-bold rounded-xl hover:bg-yellow-200 hover:text-xl'
                    onClick={() => onCategoryPathClick(index)}
                  >
                    {path}
                  </button>
                  <span>{'-->'}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div
          className='row-span-5 flex flex-col gap-3 overflow-y-scroll max-h-full p-1'
        >
          {categoryList.map(category => {
            return (
              <button
                key={`${category.id}`}
                className='row-span-1 border-4 border-slate-300 px-3 rounded-lg shadow-lg text-2xl font-bold min-h-[9%] hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer relative'
                onClick={() => onCategoryListClick(category)}
              >
                {category.name}
                {category.isAddAble && <span className='absolute right-2'>+</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CreateWorkoutRecord