import clsx from 'clsx'

import { CommonInput } from '../components'

const CreateBodydataRecord = ({
  currentTab,
  today,
  onBodydataChange,
  onCreateRecordClick
}) => {
  const isNotBodydataTab = currentTab !== 'Bodydata'

  return (
    <div className={clsx('grid grid-rows-[17%_73%_10%] border-4 border-gray-600 rounded-lg h-full', { "hidden" : isNotBodydataTab })}>
        <div className='row-span-1 flex flex-col justify-center items-center gap-1 border-b-4 border-gray-600'>
          <h1
            className='text-4xl'
          >
            New Bodydata Record
          </h1>
          <div className='text-lg text-gray-500 flex flex-row justify-center items-center gap-2'>
             Date:
             <CommonInput
               type='Date'
               name='date'
               defaultValue={today}
               inputClassName='h-full'
               onChange={onBodydataChange}
             ></CommonInput>
          </div>
        </div>
        <div className='row-span-1 grid grid-cols-12 border-b-4 border-gray-600 h-full p-2'>
          <div className='col-start-5 col-end-9 grid grid-rows-5'>
            <CommonInput
              className="row-span-1 justify-center"
              label='身高(cm)'
              name='height'
              type='number'
              placeholder={'ex. 180'}
              step='0.1'
              min={0}
              onChange={onBodydataChange}
            ></CommonInput>
              <CommonInput
                className="row-span-1 justify-center"
                label='體重(kg)'
                name='weight'
                type='number'
                placeholder={'ex. 75'}
                step='0.1'
                min={0}
                onChange={onBodydataChange}
              ></CommonInput>
              <CommonInput
                className="row-span-1 justify-center"
                label='肌肉量(kg)'
                name='skeletalMuscle'
                type='number'
                placeholder={'ex. 35'}
                step='0.1'
                min={0}
                onChange={onBodydataChange}
              ></CommonInput>
              <CommonInput
                className="row-span-1 justify-center"
                label='體脂率(%)'
                name='bodyFat'
                type='number'
                placeholder={'ex. 0.11'}
                step='0.01'
                min={0.01}
                max={1}
                onChange={onBodydataChange}
              ></CommonInput>
              <CommonInput
                className="row-span-1 justify-center"
                label='內臟脂肪等級(1~10)'
                name='visceralFatLevel'
                type='number'
                placeholder={'ex. 3'}
                step='1'
                min={0}
                max={10}
                onChange={onBodydataChange}
              ></CommonInput>
          </div>
        </div>
        <div className='row-span-1 flex flex-row justify-center items-center border-gray-600 w-full'>
          <button className='text-[2vw] font-medium w-full h-full hover:bg-yellow-200' onClick={onCreateRecordClick}>
            Create
          </button>
        </div>
      </div>
  )
}

export default CreateBodydataRecord