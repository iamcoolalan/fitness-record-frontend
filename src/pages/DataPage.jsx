import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { faker } from '@faker-js/faker'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import clsx from 'clsx'

import { useTab } from '../contexts/MainLayoutTabContext.jsx'
import { MonthSelection, QuarterSelection, CustomizeSelection } from '../components'
import { getQuarter } from '../helpers/formatHelpers.js'

import { getBodydataRecords } from '../api/bodydataRecord.js'

// const data = [
//  {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  },
//   {
//    date: moment(faker.date.between({ from: '2023-10-01T00:00:00.000Z', to: '2023-10-31T00:00:00.000Z' })).format('YYYY-MM-DD'),
//    height: faker.number.int({ min: 130, max: 210 }),
//    weight: faker.number.int({ min: 35, max: 150}),
//    skeletalMuscle: faker.number.int({ min: 15, max: 50 }),
//    bodyFat: faker.number.float({ min: 0.03, max: 0.5, precision: 0.01 }),
//    visceralFatLevel: faker.number.int({ min: 1, max: 10 })
//  }
// ];

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

const getInitialTimeRange = () => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  return {
    start,
    end,
  };
}

const DataPage = () => {
  const { currentTab } = useTab();

  const [dataTab, setDataTab] = useState(defaultDataTab[currentTab]);
  const [chart, setChart] = useState(defaultDataTab[currentTab][0].value);
  const [timeRangeOption, setTimeRangeOption] = useState('month')
  const [timeRange, setTimeRange] = useState(getInitialTimeRange());
  const [data, setData] = useState([])

  function handleChartClick(tab) {
    setChart(tab)
  }

  function handleTimeRangeOptionClick(option) {
    const today = new Date()
    let newStart = new Date(timeRange.start.getTime());
    let newEnd = new Date(timeRange.end.getTime());

    switch (option) {
      case "quarter":
        newStart.setFullYear(today.getFullYear());
        newStart.setMonth(getQuarter(today.getMonth()));
        newStart.setDate(1);
        newEnd.setFullYear(today.getFullYear());
        newEnd.setMonth(getQuarter(today.getMonth()) + 3);
        newEnd.setDate(0);
        break;
      case "month":
        newStart.setFullYear(today.getFullYear());
        newStart.setMonth(today.getMonth());
        newStart.setDate(1);
        newEnd.setFullYear(today.getFullYear());
        newEnd.setMonth(today.getMonth() + 1);
        newEnd.setDate(0);
        break;
      case "customize":
        newStart.setFullYear(today.getFullYear());
        newStart.setMonth(today.getMonth());
        newStart.setDate(today.getDate() - 7);
        newEnd.setFullYear(today.getFullYear());
        newEnd.setMonth(today.getMonth());
        newEnd.setDate(today.getDate());
        break;
      default:
        break;
    }

    setTimeRangeOption(option)
    setTimeRange({
      start: newStart,
      end: newEnd,
    });
  }

  function handleTimeRangeChange(e) {
    const { name, value } = e.target
    let newStart = new Date(timeRange.start.getTime());
    let newEnd = new Date(timeRange.end.getTime());

    switch (name) {
      case "year":
        newStart.setFullYear(Number(value));
        newEnd.setFullYear(Number(value));
        break;
      case "quarter":
        newStart.setMonth(Number(value));
        newStart.setDate(1);
        newEnd.setMonth(Number(value) + 3);
        newEnd.setDate(0);
        break;
      case "month":
        newStart.setMonth(Number(value));
        newStart.setDate(1);
        newEnd.setMonth(Number(value) + 1);
        newEnd.setDate(0);
        break;
      case "customizeStart":
        newStart = new Date(value)
        break;
      case "customizeEnd":
        newEnd = new Date(value)
        break;
      default:
        break;
    }

    setTimeRange({
      start: newStart,
      end: newEnd,
    })
  }

  useEffect(() => {
    setDataTab(defaultDataTab[currentTab])
    setChart(defaultDataTab[currentTab][0].value)
  }, [currentTab])

  useEffect(() => {
    async function getRecords() {
      const result = await getBodydataRecords(0, 0, timeRange.end, timeRange.start)

      setData(result.data.rows);
    }

    getRecords()
  }, [timeRange])

  return (
    <div className="grid grid-cols-12 grid-rows-[8%_77%_12%] h-full w-full gap-3 p-3">
      <div className="col-start-1 col-end-13 row-span-1 row-start-1 grid grid-cols-[repeat(16,minmax(0,1fr))] gap-1 border-b-4 border-gray-500">
        {dataTab.map((tab) => {
          const isCurrentTab = tab.value === chart;

          return (
            <button
              key={tab.value}
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
      <div className="col-span-12 row-span-1 row-start-3 w-full relative">
        <div className="col-span-12 row-span-1  grid grid-cols-12 w-full absolute bottom-1">
          <div className="col-start-3 col-end-7 grid grid-cols-3 border-4 border-gray-500 rounded-lg w-full">
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
          <div className="col-start-8 col-end-11">
            <QuarterSelection
              timeRangeOption={timeRangeOption}
              onTimeRangeChange={handleTimeRangeChange}
              defaultSelection={{
                year: timeRange.start.getFullYear(),
                month: timeRange.start.getMonth(),
              }}
            ></QuarterSelection>
            <MonthSelection
              timeRangeOption={timeRangeOption}
              onTimeRangeChange={handleTimeRangeChange}
              defaultSelection={{
                year: timeRange.start.getFullYear(),
                month: timeRange.start.getMonth(),
              }}
            ></MonthSelection>
            <CustomizeSelection
              timeRangeOption={timeRangeOption}
              onTimeRangeChange={handleTimeRangeChange}
              defaultSelection={timeRange}
            ></CustomizeSelection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPage