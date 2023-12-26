import { useEffect, useState } from "react"
import Swal from "sweetalert2";

import { AccountInfo, TargetInfo } from "../components"
import { useTab } from "../contexts/MainLayoutTabContext"

import { getBodydataRecords } from "../api/bodydataRecord";
import {
  getUserInfo,
  getUserTarget,
  updateUserInfo,
  updateUserTarget,
} from "../api/user";

const ProfilePage = () => {
  const { currentTab } = useTab()
  const title = currentTab === 'Account'? 'Personal Detail' : 'Target'

  const [isTestAccount, setIsTestAccount] = useState(false)

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
  const [lastBodydataRecord, setLastBodydataRecord] = useState({
    height: 0,
    weight: 0,
    skeletalMuscle: 0,
    bodyFat: 0,
    visceralFatLevel: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (currentTab === "Account") {
      if (
        isTestAccount &&
        (name === "email" || name === "password" || name === "passwordCheck")
      ) {
        return Swal.fire({
          title: "警告",
          icon: "error",
          showConfirmButton: false,
          text: "不可更改測試帳號 email 或 密碼",
          timer: 1200,
          position: "top",
        });
      } else {
        setUserInfo((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      }
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

        setIsTestAccount(
          userInfo.email === "user1@example.com"
        );

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

  useEffect(() => {
    async function fetchLastBodyDataRecord () {
      const result = await getBodydataRecords(1);

      setLastBodydataRecord(result.data.rows[0]);
    }

    fetchLastBodyDataRecord()
  }, [userTarget])

  return (
    <div className="flex flex-col gap-2 h-full w-full relative">
      <div className="flex flex-col gap-2 px-3 pt-2">
        <h1 className="text-3xl">{title}{currentTab === 'Account' && isTestAccount && <span className="text-lg text-slate-500">(測試帳號不提供更改email及密碼)</span>}</h1>
        <hr className="border-t-4 border-zinc-700 w-full" />
      </div>

      {currentTab === "Account" ? (
        <AccountInfo
          isTestAccount={isTestAccount}
          userInfo={userInfo}
          onInfoChange={handleInputChange}
        ></AccountInfo>
      ) : (
        <TargetInfo
          userTarget={userTarget}
          lastRecord={lastBodydataRecord}
          onTargetChange={handleInputChange}
        ></TargetInfo>
      )}

      <div className="absolute bottom-0 w-full">
        <div className="flex flex-row justify-center items-center">
          <button
            className="border-4 border-zinc-700 rounded-lg text-xl p-2 w-[25%] hover:bg-yellow-200"
            onClick={handleUpdateClick}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage