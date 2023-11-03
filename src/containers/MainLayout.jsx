import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

import { Tab } from '../components'

const defaultTabList = {
  homepage: [
   {name: 'Workout'},
   {name: 'Bodydata'}
  ],
  profile: [
   {name: 'Account'},
   {name: 'Target'}
  ]
}

const MainLayout = ({ children }) => {
  const location = useLocation()

  const [tabList, setTablist] = useState(defaultTabList.homepage)
  const [currentTab, setCurrentTab] = useState(tabList[0].name)
  const [path, setPath] = useState(location.pathname) 

  function handleTabOnClick(tab) {
    setCurrentTab(tab)
  }

  function handleLinkClick(path, tablist) {
    setTablist(tablist)
    setPath(path)
  }

  useEffect(() => {
    const fetchTabListData = async () => {
      switch(path) {
        case '/': 
          await setTablist(defaultTabList.homepage)  
          await setCurrentTab(tabList[0].name)
          break
        case '/profile':
          await setTablist(defaultTabList.profile)  
          await setCurrentTab(tabList[0].name)
          break
        default:
          setCurrentTab(null)
      }
    }

    fetchTabListData()
  },[path, tabList])

  return (
    <div className='grid grid-cols-12 h-screen font-mono'>
      <div className='col-span-3 bg-zinc-800 text-white relative'>
        <div className='flex flex-col justify-center items-center gap-24 mt-[10%]'>
          <Link className='text-3xl hover:text-yellow-200 hover:border-2 hover:border-yellow-200 hover:ring-4 p-2 w-[95%] hover:ring-orange-300 hover:ring-offset-2 hover:ring-offset-white hover:rounded text-center' to="/"
            onClick={() => handleLinkClick('/', defaultTabList.homepage)}
          >Fitness Record</Link>
          <div className='flex flex-col justify-center items-center gap-5 w-full'>
            <Link className='text-2xl border-2 rounded hover:bg-yellow-200 hover:text-black w-3/4 text-center'to="/profile"
              onClick={() => handleLinkClick('/profile', defaultTabList.profile)}
            >Profile</Link>
            <Link className='text-2xl border-2 rounded hover:bg-yellow-200 hover:text-black w-3/4 text-center'to="/data"
              onClick={() => handleLinkClick('/data', defaultTabList.homepage)}
            >Data</Link>
            <button className='w-3/4 text-2xl text-center border-2 rounded hover:bg-yellow-200 hover:text-black '>New Record</button>
          </div>
        </div>
        <button className='text-2xl border-4 rounded-xl p-1 w-[40%] absolute bottom-1 right-2 hover:border-yellow-200 hover:text-yellow-200 hover:shadow-md hover:shadow-orange-300'>Logout</button>
      </div>
      <div className='col-span-9 p-5'>
        <div className='flex flex-col items-center h-full gap-8'>
          <Tab
            tablist={tabList}
            currentTab={currentTab}
            onClick={handleTabOnClick}
          ></Tab>
          <div className='border-4 border-gray-300 ring-8 ring-gray-600 ring-offset-8 rounded-xl p-2 h-[98%] w-[98%]'>
            {React.cloneElement(children, { currentTab })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout