import clsx from "clsx";

import { getQuarter } from "../helpers/day";

const QuarterSelection = ({
  timeRangeOption,
  onTimeRangeChange,
  defaultSelection,
}) => {
  const isNotSelected = timeRangeOption !== "quarter";

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
          onChange={(e) => onTimeRangeChange(e)}
          value={defaultSelection.year}
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
        <label className="text-lg" htmlFor="quarter">
          Quarter:
        </label>
        <select
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="quarter"
          id="quarter"
          onChange={(e) => onTimeRangeChange(e)}
          value={getQuarter(defaultSelection.month)}
        >
          {Array.from({ length: 4 }, (_, index) => {
            return (
              <option
                key={`Q${index + 1}`}
                value={index * 3}
              >
                {`Q${index + 1}`}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default QuarterSelection
