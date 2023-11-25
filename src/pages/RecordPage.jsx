import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { CreateWorkoutRecord, CreateBodydataRecord } from '../components';
import { toDateString } from '../helpers/formatHelpers';
import { useTab } from '../contexts/MainLayoutTabContext';

import {
  createWorkoutRecord,
  getWorkoutCategories,
  createWorkoutRecordDetail,
  getWorkoutRecord,
  updateWorkoutRecord,
  updateWorkoutDetail,
  deleteWorkoutDetail
} from "../api/workoutRecord";
import { createBodydataRecord } from '../api/bodydataRecord';

let initialCategoryList = []

const initialBodydata = {
  date: new Date()
}

const initialRecordInfo = {
  recordName: "New Workout Record",
  date: new Date(),
  workoutTime: 0,
};

const RecordPage = () => {
  const { currentTab } = useTab();
  const today = toDateString(new Date())
  const navigate = useNavigate()
  const location = useLocation()

  const [editRecordId, setEditRecordId] = useState(null);

  const [categoryListInitial, setCategoryListInitial] = useState(false);
  const [isEdit, setIsEdit] = useState(false)

  const [tableList, setTableList] = useState([])
  const [deleteTableList, setDeleteTableList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [categoryPath, setCategoryPath] = useState(['重量訓練'])

  const [bodydata, setBodydata] = useState(initialBodydata)
  const [recordInfo, setRecordInfo] = useState(initialRecordInfo);


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
    const deleteItem = updateList.splice(index, 1)

    if (isEdit) {
      setDeleteTableList(prev => {
        return [
          ...prev,
          ...deleteItem
        ]
      })
    }

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

    if (name === 'date') {
      setBodydata(prev => {
        return {
          ...prev,
          date: value
        }
      })
    }else {
      setBodydata(prev => {
        return {
          ...prev,
          [name]: Number(value) === 0 ? undefined : Number(value)
        }
      })
    }
  }


  const handleCreateWorkoutRecordClick = async () => {
    try {
      const { recordName, date, workoutTime } = recordInfo
      const newWorkoutRecord = await createWorkoutRecord(recordName, date, workoutTime);

      const workoutRecordId = newWorkoutRecord.data.data?.id || null;

      if (workoutRecordId) {
        await createWorkoutRecordDetail(workoutRecordId, tableList);

        navigate(`/record/${workoutRecordId}`, { state: { mode: 'WeekCalendar', currentTab }});
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

  const handleEditWorkoutRecordClick = async () => {
    await updateWorkoutRecord(editRecordId, recordInfo);
    await updateWorkoutDetail(editRecordId, tableList);
    await deleteWorkoutDetail(editRecordId, deleteTableList)

    navigate(`/record/${editRecordId}`, { state: { mode: 'WeekCalendar', currentTab }})
  }

  const handleCreateBodydataRecordClick = async () => {
    const result = await createBodydataRecord(bodydata)

    const { status } = result

    if (status === 'success') {
      const { id } = result.data

      Swal.fire({
         title: "新增成功",
         icon: "success",
         showConfirmButton: false,
         timer: 1000,
         position: "top",
       });

      navigate(`/record/${id}`, { state: { mode: 'WeekCalendar', currentTab }})
    } else {
      Swal.fire({
        title: "新增失敗",
        icon: "error",
        showConfirmButton: false,
        text: result.detail,
        timer: 1200,
        position: "top",
      });
    }
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
        onCreateRecordClick={handleCreateBodydataRecordClick}
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
        onCreateRecordClick={handleCreateWorkoutRecordClick}
        onEditRecordClick={handleEditWorkoutRecordClick}
        onRecordInfoChange={handleRecordInfoChange}
      ></CreateWorkoutRecord>
    </>
  );
};

export default RecordPage