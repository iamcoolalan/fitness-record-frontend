import clsx from "clsx";

import { toDateString } from "../helpers/formatHelpers";

const CustomizeSelection = ({
  timeRangeOption,
  onTimeRangeChange,
  defaultSelection,
}) => {
  const isNotSelected = timeRangeOption !== "customize";

  return (
    <div
      className={clsx("flex flex-row justify-evenly items-center gap-5", {
        hidden: isNotSelected,
      })}
    >
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="startDate">
          Start:
        </label>
        <input
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="customizeStart"
          type="date"
          id="startDate"
          value={toDateString(defaultSelection.start)}
          onChange={(e) => onTimeRangeChange(e)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-lg" htmlFor="endDate">
          End:
        </label>
        <input
          className="border-4 border-gray-500 rounded-lg text-lg"
          name="customizeEnd"
          value={toDateString(defaultSelection.end)}
          type="date"
          id="endDate"
          onChange={(e) => onTimeRangeChange(e)}
        />
      </div>
    </div>
  );
};

export default CustomizeSelection;
