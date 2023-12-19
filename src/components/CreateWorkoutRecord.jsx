import clsx from 'clsx'

import { CommonInput } from '../components'
import { toDateString } from '../helpers/formatHelpers';

const CreateWorkoutRecord = ({
  isEdit,
  recordInfo,
  tableList,
  categoryPath,
  categoryList,
  onRemoveWorkoutClick,
  onRecordListChange,
  onCategoryPathClick,
  onCategoryListClick,
  onCreateRecordClick,
  onEditRecordClick,
  onRecordInfoChange
}) => {
  const editDate = new Date(recordInfo.date) 

  return (
    <div
      className="grid grid-cols-12 border-4 border-gray-600 rounded-lg h-full"
    >
      <div className="col-span-8 grid grid-rows-[17%_68%_5%_10%]">
        <div className="row-span-1 flex flex-col justify-center items-center gap-1 border-b-4 border-r-4 border-gray-600">
          <CommonInput
            type="text"
            name="recordName"
            value={recordInfo.recordName}
            inputTextSize="text-4xl text-center"
            onChange={onRecordInfoChange}
          ></CommonInput>
          <div className="flex gap-3">
            <div className="text-lg text-gray-500 flex flex-row justify-center items-center gap-2">
              Date:
              <CommonInput
                type="Date"
                name="date"
                value={toDateString(editDate)}
                inputClassName="h-full"
                onChange={onRecordInfoChange}
              ></CommonInput>
            </div>
            <div className="text-lg text-gray-500 flex flex-row justify-center items-center gap-2">
              Time:
              <CommonInput
                type="number"
                name="workoutTime"
                value={recordInfo.workoutTime}
                inputClassName="h-full w-full"
                onChange={onRecordInfoChange}
              ></CommonInput>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 row-span-1 border-r-4 border-gray-600 p-1 overflow-y-scroll">
          <table className="col-span-12 table-auto border-separate border border-slate-400 text-center">
            <thead>
              <tr>
                <th className="border border-slate-300">取消</th>
                <th className="border border-slate-300">名稱</th>
                <th className="border border-slate-300">組數</th>
                <th className="border border-slate-300">次數</th>
                <th className="border border-slate-300">重量(KG)</th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((item, index) => {
                return (
                  <tr key={`${item.name}${index}`}>
                    <td className="border border-slate-300">
                      <button
                        className="text-3xl text-gray-400 rounded-xl h-full w-full hover:bg-yellow-200 hover:text-zinc-800"
                        onClick={() => onRemoveWorkoutClick(index)}
                      >
                        -
                      </button>
                    </td>
                    <td className="border border-slate-300">
                      {item.name || item.WorkoutCategory.name}
                    </td>
                    <td className="border border-slate-300">
                      <input
                        className="border-2 border-zinc-600 rounded w-[50px] text-center"
                        type="number"
                        value={item.totalSets}
                        onChange={(e) => onRecordListChange(e, index)}
                        min={0}
                        name="totalSets"
                        id="totalSets"
                      />
                    </td>
                    <td className="border border-slate-300">
                      <input
                        className="border-2 border-zinc-600 rounded w-[50px] text-center"
                        type="number"
                        defaultValue={item.repetitions}
                        onChange={(e) => onRecordListChange(e, index)}
                        min={0}
                        name="repetitions"
                        id="repetitions"
                      />
                    </td>
                    <td className="border border-slate-300">
                      <input
                        className="border-2 border-zinc-600 rounded w-[60px] text-center"
                        type="number"
                        defaultValue={item.weight}
                        onChange={(e) => onRecordListChange(e, index)}
                        min={0}
                        name="weight"
                        step="0.1"
                        id="weight"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='row-span-1 flex flex-row justify-end items-end p-2 border-b-4 border-r-4 border-gray-600'>
            <h1 className='text-2xl font-semibold text-gray-600'>
              Total Training Volume: 
            <span className='text-orange-300'> {recordInfo.trainingVolume} kg</span>
            </h1>
        </div>
        <div className="row-span-1 flex flex-row justify-center items-center border-r-4 border-gray-600 w-full">
          <button
            className="text-[2vw] font-medium w-full h-full hover:bg-yellow-200"
            onClick={isEdit ? onEditRecordClick : onCreateRecordClick}
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
      <div className="col-span-4 grid grid-rows-[17%_repeat(5,minmax(0,1fr))] gap-2">
        <div className="row-span-1 flex flex-col border-b-4 border-gray-600 p-1">
          <div>
            <h1 className="text-lg border-b-4 border-orange-300 text-zinc-700 font-bold">
              Navigation
            </h1>
          </div>
          <div className="flex flex-row flex-wrap pt-1">
            {categoryPath.map((path, index) => {
              return (
                <div key={`${path}${index}`}>
                  <button
                    className="font-bold rounded-xl hover:bg-yellow-200 hover:text-xl"
                    onClick={() => onCategoryPathClick(index)}
                  >
                    {path}
                  </button>
                  <span>{"-->"}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="row-span-5 flex flex-col gap-3 overflow-y-scroll max-h-full p-1">
          {categoryList.map((category) => {
            return (
              <button
                key={`${category.id}`}
                className="row-span-1 border-4 border-slate-300 px-3 rounded-lg shadow-lg text-2xl font-bold min-h-[9%] hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer relative"
                onClick={() => onCategoryListClick(category)}
              >
                {category.name}
                {category.isAddable === 1 && (
                  <span className="absolute right-2">+</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutRecord