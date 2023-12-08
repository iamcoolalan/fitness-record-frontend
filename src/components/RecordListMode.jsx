import clsx from "clsx";

import { formatWorkoutTime } from "../helpers/formatHelpers";
import getPagination from "../helpers/pagination-helper";
import { useNavigate } from "react-router-dom";
import { useTab } from "../contexts/MainLayoutTabContext";

const RecordListMode = ({
  records,
  recordsCount,
  selectedPage,
  onRecordDetailClick,
  onSelectPageClick,
  onOpenDeleteModalClick,
}) => {
  const { pages, currentPage, nextPage, previousPage } = getPagination(
    5,
    selectedPage,
    recordsCount
  );

  const { currentTab } = useTab()
  const navigate = useNavigate();

  const handleAddNewRecordNavigateClick = () => {
    navigate("/record", { state: {currentTab} });
  };

  return (
    <div
      className="grid grid-rows-[90%_10%] border-4 border-gray-600 rounded-lg h-full"
    >
      <div className="row-span-1 grid grid-rows-5 gap-2 border-b-4 border-gray-600 p-1">
        {records.map((record, index) => {
          return (
            <div className="grid grid-cols-12 gap-1">
              <div
                key={record.id}
                className="col-span-11 flex justify-between items-center border-4 border-slate-300 px-3 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer"
                onClick={() => onRecordDetailClick(record.id)}
              >
                <div className="flex flex-col">
                  <h2 className="text-2xl">{record.name || "BodyRecord"}</h2>
                  {record.workoutTime && (
                    <h2 className="text-xl">
                      {formatWorkoutTime(record.workoutTime)}
                    </h2>
                  )}
                </div>
                <div>
                  <p className="text-2xl">{record.date}</p>
                </div>
              </div>
              <div
                className="col-span-1 flex justify-center items-center border-4 border-slate-300 rounded-lg shadow-lg hover:text-red-600 hover:shadow-slate-600 hover:border-red-600 cursor-pointer"
                onClick={() => onOpenDeleteModalClick(record.id, index)}
              >
                <h1 className="text-[1.3vw] font-semibold">Delete</h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row-span-1 flex flex-row justify-center items-center gap-2">
        {records.length > 0 ? (
          <>
            <button
              className="text-xl font-bold hover:text-yellow-200"
              onClick={() => onSelectPageClick(previousPage)}
            >
              {"<<"}
            </button>
            {pages.map((page) => {
              const isCurrentPage = page === currentPage;

              return (
                <button
                  key={page}
                  className={clsx(
                    "border-2 border-gray-600 rounded p-0.5 text-lg hover:bg-yellow-200",
                    { "bg-orange-200": isCurrentPage }
                  )}
                  onClick={() => onSelectPageClick(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className="text-xl font-bold hover:text-yellow-200"
              onClick={() => onSelectPageClick(nextPage)}
            >
              {">>"}
            </button>
          </>
        ) : (
          <>
            <button
              className="text-2xl font-extrabold rounded-lg w-full h-full hover:bg-yellow-200"
              onClick={handleAddNewRecordNavigateClick}
            >
              Add new Record!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecordListMode;
