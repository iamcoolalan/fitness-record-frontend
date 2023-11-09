import clsx from "clsx";

import { getMonthAbbreviation } from "../helpers/day";

const MonthSelection = ({
  timeRangeOption,
  onTimeRangeChange,
  defaultSelection,
}) => {
  const isNotSelected = timeRangeOption !== "month";

  return (
    <div
      className={clsx("flex flex-rows justify-evenly", {
        hidden: isNotSelected,
      })}
    >
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="year">
          Year:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="year"
          id="year"
          value={defaultSelection.year}
          onChange={(e) => onTimeRangeChange(e)}
        >
          {Array.from({ length: 10 }, (_, index) => {
            const today = new Date();
            const renderYear = today.getFullYear() - 9 + index;

            return (
              <option key={renderYear} value={renderYear}>
                {renderYear}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="month">
          Month:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="month"
          id="month"
          onChange={(e) => onTimeRangeChange(e)}
          value={defaultSelection.month}
        >
          {Array.from({ length: 12 }, (_, index) => {
            const renderMonth = getMonthAbbreviation(index + 1);

            return (
              <option key={renderMonth} value={index}>
                {renderMonth}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default MonthSelection