import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CreateWorkoutRecord, CreateBodydataRecord } from '../components';
import { toDateString } from '../helpers/formatHelpers';
import { MainLayoutTabContext } from '../contexts/MainLayoutTabContext';

import {
  createWorkoutRecord,
  getWorkoutCategories,
  createWorkoutRecordDetail,
  getWorkoutRecord,
  updateWorkoutRecord,
  updateWorkoutDetail
} from "../api/workoutRecord";

let initialCategoryList = []

const initialBodydata = {
  date: new Date(),
  height: 0,
  weight: 0,
  skeletalMuscle: 0,
  bodyFat: 0,
  visceralFatLevel: 0
}

const RecordPage = () => {
  const { currentTab } = useContext(MainLayoutTabContext)
  const today = toDateString(new Date())

  const [tableList, setTableList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryListInitial, setCategoryListInitial] = useState(false);
  const [categoryPath, setCategoryPath] = useState(['重量訓練'])
  const [bodydata, setBodydata] = useState(initialBodydata)
  const [recordInfo, setRecordInfo] = useState({
    recordName: "New Workout Record",
    date: new Date(),
    workoutTime: 0,
  });
  const [isEdit, setIsEdit] = useState(false)
  const [editRecordId, setEditRecordId] = useState(null);

  const navigate = useNavigate()
  const location = useLocation()

  function handleCategoryListClick(category) {
    if(category.isAddable === 1){
      setTableList(prev => {
        return [
          ...prev,
          {
            workoutCategoryId: category.id,
            name: `${categoryPath[categoryPath.length - 1]} - ${category.name}`,
            totalSets: 0,
            repetitions: 0,
            weight: 0,
          },
        ];
      })
    } else {
      setCategoryPath(prev => {
        return [
          ...prev,
          category.name
        ]
      })
    }
  }

  function handleRemoveWorkoutClick(index) {
    const updateList = [...tableList]

    updateList.splice(index, 1)

    setTableList(updateList)
  }

  function handleCategoryPathClick(index) {
    if (index === 0) {
      setCategoryPath([])
    } else {
      const newCategoryPath = categoryPath.slice(0, index)

      setCategoryPath(newCategoryPath)
    }
  }

  function handleRecordListChange(e, index) {
    const {name, value} = e.target

    const newTableList = tableList.map((item, i) => {
      if(i === index) {
        return {
          ...item,
          [name]: value
        }
      }

      return item
    })

    setTableList(newTableList)
  }

  function handleBodydataChange(e) {
    const {name, value} = e.target

    setBodydata(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleCreateRecordClick = async () => {
    try {
      const { recordName, date, workoutTime } = recordInfo
      const newWorkoutRecord = await createWorkoutRecord(recordName, date, workoutTime);

      const workoutRecordId = newWorkoutRecord.data.data?.id || null;

      if (workoutRecordId) {
        await createWorkoutRecordDetail(workoutRecordId, tableList);

        navigate(`/record/${workoutRecordId}`);
      } else {
        throw new Error('Can not create new record!')
      }
    } catch (error) {
      console.error("[Create Workout Record Failed]:", error);
    }
  }

  const handleRecordInfoChange = (e) => {
    const { name, value } = e.target

    setRecordInfo(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleEditRecordClick = async () => {
    await updateWorkoutRecord(editRecordId, recordInfo);
    await updateWorkoutDetail(editRecordId, tableList);

    navigate(`/record/${editRecordId}`)
  }

  useEffect(() => {
    async function setInitialWorkoutCategory() {
      const categories = await getWorkoutCategories()

      initialCategoryList = categories
      setCategoryListInitial(true);
    }

    setInitialWorkoutCategory()
  }, []);

   useEffect(() => {
     if (location.state !== null) {
       setEditRecordId(location.state.workoutRecordId);
       setIsEdit(location.state.isEdit);
     }
   }, []);

  useEffect(() => {
    function categoryListFilter() {
      const filterPath =
        categoryPath.length > 0 ? categoryPath.join("/") : null;

      const newCategoryList = initialCategoryList.filter(
        (category) => category.path === filterPath
      );

      setCategoryList(newCategoryList);
    }

    if (categoryListInitial) {
      categoryListFilter();
    }
  }, [categoryPath, categoryListInitial]);

  useEffect(() => {
    if (!isEdit) {
      return
    }

    async function getWorkoutRecordDetail(recordId) {
      const result = await getWorkoutRecord(recordId);

      setTableList(result.data.data.WorkoutDetails);
      setRecordInfo({
        recordName: result.data.data.name,
        date: result.data.data.date,
        workoutTime: result.data.data.workoutTime,
      });
    }

    getWorkoutRecordDetail(editRecordId);
  }, [isEdit])

  return (
    <>
      <CreateBodydataRecord
        currentTab={currentTab}
        today={today}
        onBodydataChange={handleBodydataChange}
      ></CreateBodydataRecord>
      <CreateWorkoutRecord
        currentTab={currentTab}
        recordInfo={recordInfo}
        today={today}
        isEdit={isEdit}
        tableList={tableList}
        categoryPath={categoryPath}
        categoryList={categoryList}
        onRemoveWorkoutClick={handleRemoveWorkoutClick}
        onRecordListChange={handleRecordListChange}
        onCategoryPathClick={handleCategoryPathClick}
        onCategoryListClick={handleCategoryListClick}
        onCreateRecordClick={handleCreateRecordClick}
        onEditRecordClick={handleEditRecordClick}
        onRecordInfoChange={handleRecordInfoChange}
      ></CreateWorkoutRecord>
    </>
  );
};

export default RecordPage