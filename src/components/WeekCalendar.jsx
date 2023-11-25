import clsx from "clsx";

import { toDateString, getDayOfWeek, formatWorkoutTime } from "../helpers/formatHelpers";
import getPagination from "../helpers/pagination-helper";
import { useNavigate } from "react-router-dom";


const WeekCalendar = ({
  mode,
  startDayForDayMode,
  selectedDate,
  records,
  selectedPage,
  recordsCount,
  onSelectedPreviousDateClick,
  onSelectedFutureDateClick,
  onSelectedDateClick,
  onRecordDetailClick,
  onSelectPageClick,
  onOpenDeleteModalClick,
}) => {
  const isNotWeekCalendarMode = mode !== "WeekCalendar";
  const currentSelectDate = new Date(
    selectedDate.year,
    selectedDate.month - 1,
    selectedDate.date
  );
  const { pages, currentPage, nextPage, previousPage } = getPagination(
    5,
    selectedPage,
    recordsCount
  );

  const navigate = useNavigate();

  const handleAddNewRecordNavigateClick = () => {
    navigate("/record");
  };

  return (
    <div
      className={clsx("grid grid-cols-7 w-full h-full", {
        hidden: isNotWeekCalendarMode,
      })}
    >
      <div className="col-span-1 border-4 border-r-0 border-gray-600 rounded-l-lg grid grid-rows-[5%_repeat(7,minmax(0,1fr))_5%]">
        <button
          className="row-span-1 border-r-4 border-b-2 border-gray-600 rounded-tl bg-orange-300"
          onClick={() => onSelectedPreviousDateClick()}
        >
          top
        </button>
        {Array.from({ length: 7 }, (_, index) => {
          const date = new Date(startDayForDayMode);
          date.setDate(date.getDate() + index);
          const isSelectedDate =
            toDateString(date) === toDateString(currentSelectDate);

          return (
            <div className="row-span-1 border-r-4 border-b-2 border-gray-600">
              <div
                className={clsx(
                  "flex flex-col justify-center items-center h-full hover:bg-yellow-200 hover:text-gray-600 hover:border-black cursor-pointer",
                  {
                    "bg-orange-200 text-zinc-900": isSelectedDate,
                    "text-gray-300": !isSelectedDate,
                  }
                )}
                key={date}
                onClick={() => onSelectedDateClick(date)}
              >
                <h3 className="text-lg font-extrabold">{date.getDate()}</h3>
                <h3 className="text-lg font-extrabold">{getDayOfWeek(date)}</h3>
              </div>
            </div>
          );
        })}
        <button
          className="row-span-1 border-r-4 border-gray-600 rounded-bl bg-orange-300"
          onClick={() => onSelectedFutureDateClick()}
        >
          down
        </button>
      </div>
      <div className="col-span-6 border-4 border-l-0 border-gray-600 rounded-r-lg p-2">
        <div className="border-4 border-gray-500 rounded-lg h-full grid grid-rows-[15%_77%_8%]">
          <div className="row-span-1 border-b-2 border-gray-500 flex justify-center items-center">
            <h2 className="text-3xl">{`${toDateString(
              currentSelectDate
            )} Records`}</h2>
          </div>
          <div className="row-span-1 border-t-2 border-gray-500 grid grid-rows-5 p-1 gap-2">
            {records.map((record, index) => {
              return (
                <div className="grid grid-cols-12 gap-1">
                  <div
                    key={record.id}
                    className="col-span-11 flex justify-between items-center border-4 border-slate-300 p-2 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer"
                    onClick={() => onRecordDetailClick(record.id)}
                  >
                    <h2 className="text-2xl">{record.name || "BodyRecord"}</h2>
                    <h2 className="text-2xl">
                      {record.workoutTime ? formatWorkoutTime(record.workoutTime) : ''}
                    </h2>
                  </div>
                  <div
                    className="col-span-1 flex justify-center items-center border-4 border-slate-300 rounded-lg shadow-lg hover:text-red-600 hover:shadow-slate-600 hover:border-red-600 cursor-pointer"
                    onClick={() => onOpenDeleteModalClick(record.id, index)}
                  >
                    <h1 className="text-[1.1vw] font-semibold">Delete</h1>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row-span-1 border-t-4 border-gray-500 flex justify-center items-center gap-2 h-full">
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
      </div>
    </div>
  );
};

export default WeekCalendar;
