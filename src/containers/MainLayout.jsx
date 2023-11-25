import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { Tab } from '../components'
import { MainLayoutTabContext } from '../contexts/MainLayoutTabContext';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const defaultTabList = {
  homepage: [
   {name: 'Workout'},
   {name: 'Bodydata'}
  ],
  profile: [
   {name: 'Account'},
   {name: 'Target'}
  ],
  record: [
   {name: 'Workout'},
   {name: 'Bodydata'}
  ],
  data: [
   {name: 'Workout'},
   {name: 'Bodydata'}
  ]
}

const MainLayout = ({ children }) => {
  const [tabList, setTablist] = useState(defaultTabList.homepage)
  const [currentTab, setCurrentTab] = useState(tabList[0].name)
  const [isDisable, setIsDisable] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  function handleTabOnClick(tab) {
    setCurrentTab(tab)
  }

  function handleLinkClick(path, newTablist) {
    setIsDisable(false)
    setTablist(newTablist);
    setCurrentTab(newTablist[0].name);
    navigate(path)
  }
  
  const handleLogoutClick = () => {
    logout()
    navigate('/login')

    Swal.fire({
        title: '登出成功',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
        position: 'top'
    })
  }

  useEffect(() => {
    const currentPath = location.pathname;
    const newTabList =
      defaultTabList[currentPath.slice(1)] || defaultTabList['homepage'] || [];

    setTablist(newTabList);

    if (newTabList.length > 0) {
      setCurrentTab(newTabList[0].name);
    }
  }, [location.pathname]);

  return (
    <div className="grid grid-cols-12 h-screen font-mono">
      <div className="col-span-3 bg-zinc-800 text-white relative">
        <div className="flex flex-col justify-center items-center gap-24 mt-[10%]">
          <div
            className="text-3xl hover:text-yellow-200 hover:border-2 hover:border-yellow-200 hover:ring-4 p-2 w-[95%] hover:ring-orange-300 hover:ring-offset-2 hover:ring-offset-white hover:rounded text-center cursor-pointer"
            onClick={() => handleLinkClick("/", defaultTabList.homepage)}
          >
            Fitness Record
          </div>
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            <div
              className="text-2xl border-2 rounded cursor-pointer hover:bg-yellow-200 hover:text-black w-3/4 text-center"
              onClick={() =>
                handleLinkClick("/profile", defaultTabList.profile)
              }
            >
              Profile
            </div>
            <div
              className="text-2xl border-2 rounded cursor-pointer hover:bg-yellow-200 hover:text-black w-3/4 text-center"
              onClick={() => handleLinkClick("/data", defaultTabList.data)}
            >
              Data
            </div>
            <div
              className="text-2xl border-2 rounded cursor-pointer hover:bg-yellow-200 hover:text-black w-3/4 text-center"
              onClick={() => handleLinkClick("/record", defaultTabList.record)}
            >
              New Record
            </div>
          </div>
        </div>
        <button className="text-2xl border-4 rounded-xl p-1 w-[40%] absolute bottom-1 right-2 hover:border-yellow-200 hover:text-yellow-200 hover:shadow-md hover:shadow-orange-300" onClick={handleLogoutClick}>
          Logout
        </button>
      </div>
      <div className="col-span-9 p-5">
        <MainLayoutTabContext.Provider value={{ currentTab, setCurrentTab, setIsDisable }}>
          <div className="flex flex-col items-center h-full gap-8">
            <Tab
              tablist={tabList}
              currentTab={currentTab}
              onClick={handleTabOnClick}
              isDisable={isDisable}
            ></Tab>
            <div className="border-4 border-gray-300 ring-8 ring-gray-600 ring-offset-8 rounded-xl p-2 h-[98%] w-[98%]">
              {children}
            </div>
          </div>
        </MainLayoutTabContext.Provider>
      </div>
    </div>
  );
}

export default MainLayout