import React, { useEffect, useState, useContext } from 'react';

import { CreateWorkoutRecord, CreateBodydataRecord } from '../components';
import { toDateString } from '../helpers/formatHelpers';
import { MainLayoutTabContext } from '../contexts/MainLayoutTabContext';

const dummyCategoryList = [
  { id: 0 ,name: '推', path: null , isAddAble: false},
  { id: 1 ,name: '肩推', path: '推' , isAddAble: false},
  { id: 2 ,name: '平胸推', path: '推' , isAddAble: false},
  { id: 3 ,name: '斜上胸推', path: '推' , isAddAble: false},
  { id: 4 ,name: '雙手', path: '推/斜上胸推' , isAddAble: true},
  { id: 5 ,name: '單手', path: '推/斜上胸推' , isAddAble: true},
  { id: 6 ,name: '交替', path: '推/斜上胸推' , isAddAble: true},
  { id: 1 ,name: '阿諾肩推', path: '推/肩推' , isAddAble: true},
  { id: 7 ,name: '拉', path: null , isAddAble: false},
  { id: 8 ,name: '腿', path: null, isAddAble: false }
]

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
  const [categoryPath, setCategoryPath] = useState([])
  const [bodydata, setBodydata] = useState(initialBodydata)

  function handleCategoryListClick(category) {
    if(category.isAddAble){
      setTableList(prev => {
        return [
          ...prev,
          { 
            categoryId: category.id,
            name: `${categoryPath[categoryPath.length - 1]} - ${category.name}`,
            set: 0,
            repetition: 0,
            weight: 0
          }
        ]
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

  useEffect(() => {
    function categoryListFilter() {
      const filterPath = categoryPath.length > 0 ? categoryPath.join('/') : null

      const newCategoryList = dummyCategoryList.filter(category => category.path === filterPath)

      setCategoryList(newCategoryList)
    }

    categoryListFilter()
  }, [categoryPath])

  return (
    <>
      <CreateBodydataRecord
        currentTab={currentTab}
        today={today}
        onBodydataChange={handleBodydataChange}
      ></CreateBodydataRecord>
      <CreateWorkoutRecord
        currentTab={currentTab}
        today={today}
        tableList={tableList}
        categoryPath={categoryPath}
        categoryList={categoryList}
        onRemoveWorkoutClick={handleRemoveWorkoutClick}
        onRecordListChange={handleRecordListChange}
        onCategoryPathClick={handleCategoryPathClick}
        onCategoryListClick={handleCategoryListClick}
      ></CreateWorkoutRecord>
    </>
  )
};

export default RecordPage