import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { CreateWorkoutRecord, CreateBodydataRecord } from "../components";
import { toDateString } from "../helpers/formatHelpers";
import { useTab } from "../contexts/MainLayoutTabContext";

import { countTotalTrainingVolume } from "../helpers/recordHelper";

import {
  createWorkoutRecord,
  getWorkoutCategories,
  createWorkoutRecordDetail,
  getWorkoutRecord,
  updateWorkoutRecord,
  updateWorkoutDetail,
  deleteWorkoutDetail,
} from "../api/workoutRecord";
import {
  createBodydataRecord,
  getBodydataRecord,
  updateBodydataRecord,
} from "../api/bodydataRecord";

let initialCategoryList = [];

const initialBodydata = {
  date: new Date(),
};

const initialRecordInfo = {
  recordName: "New Workout Record",
  date: new Date(),
  workoutTime: 0,
  trainingVolume: 0,
};

const RecordPage = () => {
  const { currentTab, setCurrentTab } = useTab();
  const today = toDateString(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  const [editRecordId, setEditRecordId] = useState(null);

  const [categoryListInitial, setCategoryListInitial] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [tableList, setTableList] = useState([]);
  const [deleteTableList, setDeleteTableList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryPath, setCategoryPath] = useState(["重量訓練"]);

  const [bodydata, setBodydata] = useState(initialBodydata);
  const [recordInfo, setRecordInfo] = useState(initialRecordInfo);

  function handleCategoryListClick(category) {
    if (category.isAddable === 1) {
      setTableList((prev) => {
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
      });
    } else {
      setCategoryPath((prev) => {
        return [...prev, category.name];
      });
    }
  }

  function handleRemoveWorkoutClick(index) {
    const updateList = [...tableList];
    const deleteItem = updateList.splice(index, 1);

    if (isEdit) {
      setDeleteTableList((prev) => {
        return [...prev, ...deleteItem];
      });
    }

    setTableList(updateList);
  }

  function handleCategoryPathClick(index) {
    if (index === 0) {
      setCategoryPath([]);
    } else {
      const newCategoryPath = categoryPath.slice(0, index);

      setCategoryPath(newCategoryPath);
    }
  }

  function handleRecordListChange(e, index) {
    const { name, value } = e.target;

    const newTableList = tableList.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [name]: value,
        };
      }

      return item;
    });

    setTableList(newTableList);
  }

  function handleBodydataChange(e) {
    const { name, value } = e.target;

    if (name === "date") {
      setBodydata((prev) => {
        return {
          ...prev,
          date: value,
        };
      });
    } else {
      setBodydata((prev) => {
        return {
          ...prev,
          [name]: Number(value) === 0 ? undefined : Number(value),
        };
      });
    }
  }

  const handleCreateWorkoutRecordClick = async () => {
    const showAlert = (isSuccess) => {
      Swal.fire({
        title: isSuccess ? "新增成功" : "新增失敗",
        icon: isSuccess ? "success" : "error",
        showConfirmButton: false,
        timer: 1200,
        position: "top",
      });
    };

    try {
      const { recordName, date, workoutTime } = recordInfo;
      const newWorkoutRecord = await createWorkoutRecord(
        recordName,
        date,
        workoutTime
      );

      const workoutRecordId = newWorkoutRecord.data?.id || null;

      if (!workoutRecordId) {
        throw new Error("Can not create new record!");
      }

      const createWorkoutRecordDetailResponse = await createWorkoutRecordDetail(
        workoutRecordId,
        tableList
      );

      showAlert(createWorkoutRecordDetailResponse.status === "success");

      navigate(`/record/${workoutRecordId}`, {
        state: { mode: "WeekCalendar", currentTab },
      });
    } catch (error) {
      showAlert(false);
      console.error("[Create Workout Record Failed]:", error);
    }
  };

  const handleRecordInfoChange = (e) => {
    const { name, value } = e.target;

    setRecordInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleEditWorkoutRecordClick = async () => {
    const updateWorkoutRecordResponse = await updateWorkoutRecord(
      editRecordId,
      recordInfo
    );
    const updateWorkoutDetailResponse = await updateWorkoutDetail(
      editRecordId,
      tableList
    );
    const deleteWorkoutDetailResponse = await deleteWorkoutDetail(
      editRecordId,
      deleteTableList
    );

    const isSuccess = [
      updateWorkoutRecordResponse,
      updateWorkoutDetailResponse,
      deleteWorkoutDetailResponse,
    ].every((res) => res.status === "success");

    if (isSuccess) {
      Swal.fire({
        title: "修改成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      navigate(`/record/${editRecordId}`, {
        state: { mode: "WeekCalendar", currentTab },
      });
    } else {
      Swal.fire({
        title: "修改失敗",
        icon: "error",
        showConfirmButton: false,
        timer: 1200,
        position: "top",
      });
    }
  };

  const handleCreateBodydataRecordClick = async () => {
    const result = await createBodydataRecord(bodydata);

    const { status } = result;

    if (status === "success") {
      const { id } = result.data;

      Swal.fire({
        title: "新增成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      navigate(`/record/${id}`, {
        state: { mode: "WeekCalendar", currentTab },
      });
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
  };

  const handleEditBodydataRecordClick = async () => {
    const result = await updateBodydataRecord(editRecordId, bodydata);

    const { status } = result;

    if (status === "success") {
      Swal.fire({
        title: "修改成功",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
        position: "top",
      });

      navigate(`/record/${editRecordId}`, {
        state: { mode: "WeekCalendar", currentTab },
      });
    } else {
      Swal.fire({
        title: "修改失敗",
        icon: "error",
        showConfirmButton: false,
        text: result.detail,
        timer: 1200,
        position: "top",
      });
    }
  };

  useEffect(() => {
    async function setInitialWorkoutCategory() {
      const categories = await getWorkoutCategories();

      initialCategoryList = categories;
      setCategoryListInitial(true);
    }

    setInitialWorkoutCategory();
  }, []);

  useEffect(() => {
    if (location.state !== null) {
      if (location.state.currentTab) {
        setCurrentTab(location.state.currentTab);
      }

      if (location.state.recordId) {
        setEditRecordId(location.state.recordId);
      }

      if (location.state.isEdit) {
        setIsEdit(location.state.isEdit);
      }

      if (location.state.date) {
        if (location.state.currentTab === "Workout") {
          setRecordInfo((prev) => {
            return {
              ...prev,
              date: location.state.date,
            };
          });
        } else {
          setBodydata((prev) => {
            return {
              ...prev,
              date: location.state.date,
            };
          });
        }
      }
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
      return;
    }

    if (currentTab === "Workout") {
      async function getWorkoutRecordDetail(recordId) {
        const result = await getWorkoutRecord(recordId);

        setTableList(result.data.WorkoutDetails);
        setRecordInfo({
          recordName: result.data.name,
          date: result.data.date,
          workoutTime: result.data.workoutTime,
        });
      }

      getWorkoutRecordDetail(editRecordId);
    } else {
      async function getBodyRecord() {
        const result = await getBodydataRecord(editRecordId);

        setBodydata(result.data);
      }

      getBodyRecord();
    }
  }, [isEdit]);

  useEffect(() => {
    const trainingVolume = countTotalTrainingVolume(tableList);

    setRecordInfo(prev => {
      return {
        ...prev,
        trainingVolume,
      };
    })
  }, [tableList])

  return (
    <>
      {currentTab === "Bodydata" ? (
        <CreateBodydataRecord
          today={today}
          isEdit={isEdit}
          bodydata={bodydata}
          onBodydataChange={handleBodydataChange}
          onCreateRecordClick={handleCreateBodydataRecordClick}
          onEditRecordClick={handleEditBodydataRecordClick}
        ></CreateBodydataRecord>
      ) : (
        <CreateWorkoutRecord
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
      )}
    </>
  );
};

export default RecordPage;
