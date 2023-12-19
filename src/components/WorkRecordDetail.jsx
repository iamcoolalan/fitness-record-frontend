import { formatWorkoutTime } from "../helpers/formatHelpers";

const WorkoutRecordDetail = ({ recordInfo, recordDetails }) => {
  return (
    <>
      <div className="row-span-1 border-b-4 border-gray-600 flex flex-col justify-center items-center">
        <h1 className="text-4xl">{recordInfo && recordInfo.title}</h1>
        <div className="flex gap-3">
          <p className="text-lg text-gray-500">
            Date:{recordInfo && recordInfo.date}
          </p>
          <p className="text-lg text-gray-500">
            Time:{formatWorkoutTime(recordInfo && recordInfo.time)}
          </p>
           <p className="text-lg text-gray-500">
            Training Volume:{recordInfo.trainingVolume}
          </p>
        </div>
      </div>
      <div className="row-span-1 grid grid-cols-2 grid-rows-4 gap-2 border-b-4 border-gray-600 p-1">
        {recordDetails.map((detail) => {
          const categoryPath = detail.WorkoutCategory.path.split("/");
          const categoryName = categoryPath[categoryPath.length - 2];

          return (
            <div
              key={detail.id}
              className="col-span-1 row-span-1 border-4 border-slate-300 rounded-lg shadow-md shadow-zinc-400 flex flex-row justify-between items-center px-2"
            >
              <div>
                <h3 className="text-2xl">{categoryName}</h3>
                <h5 className="text-xl">{detail.WorkoutCategory.name}</h5>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-sm">組數: {detail.totalSets}</p>
                <p className="text-sm">次數: {detail.repetitions}</p>
                <p className="text-sm">重量: {detail.weight}kg</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WorkoutRecordDetail;
