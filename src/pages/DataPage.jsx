import React, { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { faker } from '@faker-js/faker'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import clsx from 'clsx'

import { getMonthAbbreviation } from '../helpers/day.js'
import { MainLayoutTabContext } from '../contexts/MainLayoutTabContext.jsx'

const data = [
 {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 },
  {
   date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
   height: faker.number.int({ min: 130, max: 210 }),
   weight: faker.number.int({ min: 35, max: 150}),
   skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
   bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
   visceralFatLevel: faker.number.int({ min: 1, max: 10 })
 }
];

const defaultDataTab = {
  Bodydata: [
    { label: '身高', value: 'height' },
    { label: '體重', value: 'weight' },
    { label: '肌肉量', value: 'skeletalMuscle' },
    { label: '體脂率', value: 'bodyFat' },
    { label: '內臟脂肪等級', value: 'visceralFatLevel' }
  ],
  Workout: [
    { label: '訓練量', value: 'workoutVolume' },
  ]
}

const QuarterSelection = ({
  timeRangeOption
}) => {
  const isNotSelected = timeRangeOption !== 'quarter'

  return (
    <div className={clsx("flex flex-rows justify-evenly", { hidden: isNotSelected })}>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="year">
          Year:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="year"
          id="year"
        >
          {Array.from({ length: 10 }, (_, index) => {
            const today = new Date();
            const renderYear = today.getFullYear() - 9 + index;
            const isCurrentYear = today.getFullYear() === renderYear;

            return (
              <option
                key={renderYear}
                value={renderYear}
                selected={isCurrentYear}
              >
                {renderYear}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="quarter">
          Quarter:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="quarter"
          id="quarter"
        >
          <option value="q1">Q1</option>
          <option value="q2">Q2</option>
          <option value="q3">Q3</option>
          <option value="q4">Q4</option>
        </select>
      </div>
    </div>
  );
}

const MonthSelection = ({
  timeRangeOption
}) => {
  const isNotSelected = timeRangeOption !== 'month'

  return (
    <div className={clsx("flex flex-rows justify-evenly", { hidden: isNotSelected })}>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="year">
          Year:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="year"
          id="year"
        >
          {Array.from({ length: 10 }, (_, index) => {
            const today = new Date();
            const renderYear = today.getFullYear() - 9 + index;
            const isCurrentYear = today.getFullYear() === renderYear;

            return (
              <option
                key={renderYear}
                value={renderYear}
                selected={isCurrentYear}
              >
                {renderYear}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="month">
          Month:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="quarter"
          id="month"
        >
          {Array.from({ length: 12 }, (_, index) => {
            const renderMonth = getMonthAbbreviation(index + 1);
            const today = new Date();
            const isCurrentMonth = today.getMonth() === index;

            return (
              <option key={renderMonth} value={index} selected={isCurrentMonth}>
                {renderMonth}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

const CustomizeSelection = ({ timeRangeOption }) => {
  const isNotSelected = timeRangeOption !== "customize";

  return (
    <div
      className={clsx("flex flex-row justify-evenly items-center gap-5", {
        hidden: isNotSelected,
      })}
    >
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="startDate">
          Start:
        </label>
        <input
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="startDate"
          type="date"
          id="startDate"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="endDate">
          End:
        </label>
        <input
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="endDate"
          type="date"
          id="endDate"
        />
      </div>
    </div>
  );
};

const DataPage = () => {
  const { currentTab } = useContext(MainLayoutTabContext);

  const [dataTab, setDataTab] = useState(defaultDataTab[currentTab]);
  const [chart, setChart] = useState(defaultDataTab[currentTab][0].value);
  const [timeRangeOption, setTimeRangeOption] = useState('month')

  function handleChartClick(tab) {
    setChart(tab)
  }

  function handleTimeRangeOptionClick(option) {
    setTimeRangeOption(option)
  }

  useEffect(() => {
    setDataTab(defaultDataTab[currentTab])
    setChart(defaultDataTab[currentTab][0].value)
  }, [currentTab])

  return (
    <div className="grid grid-cols-12 grid-rows-[8%_77%_12%] h-full w-full gap-3 p-3">
      <div className="col-start-1 col-end-13 row-span-1 row-start-1 grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1 border-b-4 border-gray-500">
        {dataTab.map((tab) => {
          const isCurrentTab = tab.value === chart;

          return (
            <button
              className={clsx(
                "col-span-2 border-4 border-b-0 border-gray-500 rounded-t-2xl h-full hover:bg-yellow-200 hover:border-zinc-800",
                { "bg-orange-300": isCurrentTab }
              )}
              onClick={() => handleChartClick(tab.value)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <ResponsiveContainer
        className={"col-span-12 row-span-1 row-start-2 "}
        width="100%"
        height="100%"
      >
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={chart}
            stroke="#fdba74"
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="col-span-12 row-span-1 row-start-3 grid grid-cols-12 grid-rows-2 w-full">
        <div className="col-start-3 col-end-7 row-span-1 grid grid-cols-3 border-4 border-gray-500 rounded-lg w-full">
          <button
            className={clsx(
              "col-span-1 border-r-4 border-gray-500 rounded-l-md hover:bg-yellow-200",
              { "bg-orange-300": timeRangeOption === "quarter" }
            )}
            onClick={() => handleTimeRangeOptionClick("quarter")}
          >
            季
          </button>
          <button
            className={clsx(
              "col-span-1 border-r-4 border-gray-500 hover:bg-yellow-200",
              { "bg-orange-300": timeRangeOption === "month" }
            )}
            onClick={() => handleTimeRangeOptionClick("month")}
          >
            月
          </button>
          <button
            className={clsx("col-span-1 rounded-r-md hover:bg-yellow-200", {
              "bg-orange-300": timeRangeOption === "customize",
            })}
            onClick={() => handleTimeRangeOptionClick("customize")}
          >
            自訂區間
          </button>
        </div>
        <div className="col-start-8 col-end-11 row-span-1">
          <QuarterSelection
            timeRangeOption={timeRangeOption}
          ></QuarterSelection>
          <MonthSelection timeRangeOption={timeRangeOption}></MonthSelection>
          <CustomizeSelection timeRangeOption={timeRangeOption}></CustomizeSelection>
        </div>
      </div>
    </div>
  );
}

export default DataPage