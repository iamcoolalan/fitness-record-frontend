import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2";

import { AccountInfo, TargetInfo } from "../components"
import { MainLayoutTabContext } from "../contexts/MainLayoutTabContext"

import {
  getUserInfo,
  getUserTarget,
  updateUserInfo,
  updateUserTarget,
} from "../api/user";

const ProfilePage = () => {
  const { currentTab } = useContext(MainLayoutTabContext);
  const title = currentTab === 'Account'? 'Personal Detail' : 'Target'

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    birthday: "",
    gender: "",
    activityFactor: "",
    password: "",
    passwordCheck: "",
  });
  const [userTarget, setUserTarget] = useState({
    targetHeight: 0,
    targetWeight: 0,
    targetSkeletalMuscle: 0,
    targetBodyFat: 0,
    targetVisceralFatLevel: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (currentTab === "Account") {
      setUserInfo((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else {
      setUserTarget((prev) => {
        return {
          ...prev,
          [name]: Number(value),
        };
      });
    }
  };

  const handleUpdateClick = async () => {
    let result

    if (currentTab === 'Account') {
      result = await updateUserInfo(userInfo);
    } else {
      result = await updateUserTarget(userTarget);
    }

    if (!result.status) {
      let errorMessage

      if (Array.isArray(result.response.data.detail)) {
        errorMessage = result.response.data.detail
          .map((error) => {
            return error.message;
          })
          .join("\n");
      } else {
        errorMessage = result.response.data.detail;
      }

      Swal.fire({
        title: "更改失敗",
        icon: "error",
        showConfirmButton: false,
        text: errorMessage,
        timer: 1200,
        position: "top",
      });
    } else {
       Swal.fire({
         title: "更改成功",
         icon: "success",
         showConfirmButton: false,
         timer: 1000,
         position: "top",
       });
    }
  }

  useEffect(() => {
    if (currentTab === "Account") {
      async function fetchUserInfo() {
        const userInfo = await getUserInfo();

        setUserInfo(prev => {
          return {
            ...prev,
            ...userInfo
          }
        });
      }

      fetchUserInfo();
    } else {
      async function fetchUserTarget() {
        const userTarget = await getUserTarget();

        setUserTarget(prev => {
          return {
            ...prev,
            ...userTarget
          }
        });
      }

      fetchUserTarget();
    }
  }, [currentTab]);

  return (
    <div className="flex flex-col gap-2 h-full w-full relative">
      <div className="flex flex-col gap-2 px-3 pt-2">
        <h1 className="text-3xl">{title}</h1>
        <hr className="border-t-4 border-zinc-700 w-full" />
      </div>
      <TargetInfo
        currentTab={currentTab}
        userTarget={userTarget}
        onTargetChange={handleInputChange}
      ></TargetInfo>
      <AccountInfo
        currentTab={currentTab}
        userInfo={userInfo}
        onInfoChange={handleInputChange}
      ></AccountInfo>
      <div className="absolute bottom-0 w-full">
        <div className="flex flex-row justify-center items-center">
          <button className="border-4 border-zinc-700 rounded-lg text-xl p-2 w-[25%] hover:bg-yellow-200" onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage