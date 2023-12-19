import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import { WorkoutRecordDetail, BodydataRecordDetail } from "../components";
import { useTab } from "../contexts/MainLayoutTabContext";

import { getWorkoutRecord } from "../api/workoutRecord";
import { getBodydataRecord } from "../api/bodydataRecord";

const RecordDetailPage = () => {
  const [completeSetTab, setCompleteSetTab] = useState(false);
  
  const [recordDetails, setRecordDetails] = useState([]);
  const [recordInfo, setRecordInfo] = useState({
    title: '',
    date: '',
    workoutTime: '',
    trainingVolume: 0
  });
  
  const { currentTab, setCurrentTab, setIsDisable } = useTab();
  const { recordId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    setIsDisable(false)

    navigate("/", {
      state: {
        currentTab,
        date: new Date(recordInfo.date),
        mode: location.state.mode || "WeekCalendar",
      },
    });
  };

  const handleEditClick = () => {
    navigate("/record", {
      state: {
        currentTab,
        recordId: recordId,
        isEdit: true,
      },
    });
  };

  useEffect(() => {
    setIsDisable(true);
    setCurrentTab(location.state.currentTab);
    setCompleteSetTab(true);
  }, []);

  useEffect(() => {
    if (!completeSetTab) {
      return;
    }

    if (currentTab === "Workout") {
      async function getWorkoutRecordDetail(recordId) {
        const result = await getWorkoutRecord(recordId);

        setRecordDetails(result.data.WorkoutDetails);
        setRecordInfo({
          title: result.data.name,
          date: result.data.date,
          time: result.data.workoutTime,
          trainingVolume: result.data.trainingVolume
        });
      }

      getWorkoutRecordDetail(recordId);
    } else {
      async function getBodydataRecordDetail(recordId) {
        const result = await getBodydataRecord(recordId);

        const { date, ...bodyRecord } = result.data;

        setRecordDetails(bodyRecord);
        setRecordInfo({
          title: "Bodydata Record",
          date: date,
          time: null,
        });
      }

      getBodydataRecordDetail(recordId);
    }
  }, [recordId, currentTab, completeSetTab]);

  return (
    <div className="grid grid-rows-[15%_75%_10%] border-4 border-gray-600 rounded-lg h-full">
      {currentTab === "Workout" ? (
        <WorkoutRecordDetail
          recordInfo={recordInfo}
          recordDetails={recordDetails}
        ></WorkoutRecordDetail>
      ) : (
        <BodydataRecordDetail
          recordDetails={recordDetails}
          recordInfo={recordInfo}
        ></BodydataRecordDetail>
      )}
      <div className="row-span-1 flex flex-row justify-between items-center p-2">
        <button
          className="text-lg border-2 border-zinc-800 rounded-lg w-[15%] hover:bg-yellow-200"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className="text-lg border-2 border-zinc-800 rounded-lg w-[15%] hover:bg-yellow-200"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default RecordDetailPage;
