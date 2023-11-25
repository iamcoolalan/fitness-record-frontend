const BodydataRecordDetail = ({ recordDetails, recordInfo }) => {
  return (
    <>
      <div className="row-span-1 border-b-4 border-gray-600 flex flex-col justify-center items-center">
        <h1 className="text-4xl">{recordInfo.title}</h1>
        <div className="flex gap-3">
          <p className="text-lg text-gray-500">Date:{recordInfo.date}</p>
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-12 grid-rows-[repeat(7,minmax(0,1fr))] gap-3 border-b-4 border-gray-600 p-1">
        <div className="col-start-2 col-end-12 row-start-2 grid grid-cols-9 gap-2">
          <div className="col-span-3 border-4 border-gray-500 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            身高
          </div>
          <div className="col-span-6 border-4 border-gray-400  rounded-lg flex justify-center items-center text-2xl shadow-lg">
            {recordDetails.height}
          </div>
        </div>
        <div className="col-start-2 col-end-12 row-start-3 grid grid-cols-9 gap-2">
          <div className="col-span-3 border-4 border-gray-500 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            體重
          </div>
          <div className="col-span-6 border-4 border-gray-400 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            {recordDetails.weight}
          </div>
        </div>
        <div className="col-start-2 col-end-12 row-start-4 grid grid-cols-9 gap-2">
          <div className="col-span-3 border-4 border-gray-500 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            肌肉量
          </div>
          <div className="col-span-6 border-4 border-gray-400 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            {recordDetails.skeletalMuscle}
          </div>
        </div>
        <div className="col-start-2 col-end-12 row-start-5 grid grid-cols-9 gap-2">
          <div className="col-span-3 border-4 border-gray-500 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            體脂率
          </div>
          <div className="col-span-6 border-4 border-gray-400 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            {recordDetails.bodyFat}
          </div>
        </div>
        <div className="col-start-2 col-end-12 row-start-6 grid grid-cols-9 gap-2">
          <div className="col-span-3 border-4 border-gray-500 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            內臟脂肪等級
          </div>
          <div className="col-span-6 border-4 border-gray-400 rounded-lg flex justify-center items-center text-2xl shadow-lg">
            {recordDetails.visceralFatLevel}
          </div>
        </div>
      </div>
    </>
  );
};

export default BodydataRecordDetail;