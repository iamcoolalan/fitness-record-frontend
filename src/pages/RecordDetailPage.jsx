import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

import { formatWorkoutTime } from '../helpers/formatHelpers';

import { getWorkoutRecord } from '../api/workoutRecord';

const RecordDetailPage = () => {
  const [recordDetails, setRecordDetails] = useState([])
  const [recordInfo, setRecordInfo] = useState();

  const { recordId } = useParams()
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/", {
      state: {
        date: new Date(recordInfo.date),
        mode: "WeekCalendar",
      },
    });
  }

  useEffect(() => {
    async function getWorkoutRecordDetail(recordId) {
      const result = await getWorkoutRecord(recordId);

      setRecordDetails(result.data.data.WorkoutDetails);
      setRecordInfo({
        title: result.data.data.name,
        date: result.data.data.date,
        time: result.data.data.workoutTime
      });
    }

    getWorkoutRecordDetail(recordId);
  }, [recordId]);

  return (
    <div className="grid grid-rows-[15%_75%_10%] border-4 border-gray-600 rounded-lg h-full">
      <div className="row-span-1 border-b-4 border-gray-600 flex flex-col justify-center items-center">
        <h1 className="text-4xl">{recordInfo && recordInfo.title}</h1>
        <div className="flex gap-3">
          <p className="text-lg text-gray-500">
            Date:{recordInfo && recordInfo.date}
          </p>
          <p className="text-lg text-gray-500">
            Time:{formatWorkoutTime(recordInfo && recordInfo.time)}
          </p>
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-2 grid-rows-4 gap-2 border-b-4 border-gray-600 p-1">
        {recordDetails.map(detail => {
          const categoryPath = detail.WorkoutCategory.path.split('/');
          const categoryName = categoryPath[categoryPath.length - 2];

          return (
            <div 
              key={detail.id}
              className="col-span-1 row-span-1 border-4 border-slate-300 rounded-lg shadow-md shadow-zinc-400 flex flex-row justify-between items-center px-2">
              <div>
                <h3 className="text-2xl">{categoryName}</h3>
                <h5 className="text-xl">{detail.WorkoutCategory.name}</h5>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm">組數: {detail.totalSets}</p>
                <p className="text-sm">次數: {detail.repetitions}</p>
                <p className="text-sm">重量: {detail.weight}kg</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row-span-1 flex flex-row justify-between items-center p-2">
        <button
          className="text-lg border-2 border-zinc-800 rounded-lg w-[15%] hover:bg-yellow-200"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button className="text-lg border-2 border-zinc-800 rounded-lg w-[15%] hover:bg-yellow-200">
          Edit
        </button>
      </div>
    </div>
  );
}

export default RecordDetailPage