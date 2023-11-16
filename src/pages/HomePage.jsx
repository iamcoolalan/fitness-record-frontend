import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import addDays from "date-fns/addDays";
import subDays from "date-fns/subDays";

import { FullCalender, WeekCalendar, RecordListMode } from "../components";
import { getMonthAbbreviation } from "../helpers/formatHelpers";
import { getWorkoutRecords } from "../api/workoutRecord";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const today = new Date();
  const startDayForDayModeInitialValue = new Date(today);
  startDayForDayModeInitialValue.setDate(today.getDate() - 3);

  const yearInputRef = useRef(null);
  const monthInputRef = useRef(null);

  //const [year, setYear] = useState(today.getFullYear())
  //const [month, setMonth] = useState(today.getMonth() + 1)
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    date: today.getDate(),
  });
  const [startDateForFullCalender, setForFullCalender] = useState(new Date());
  const [startDayForDayMode, setStartDayForDayMode] = useState(
    startDayForDayModeInitialValue
  );

  const [isYearEdit, setIsYearEdit] = useState(false);
  const [isMonthEdit, setIsMonthEdit] = useState(false);
  const [monthInputValue, setMonthInputValue] = useState(selectedDate.month);
  const [yearInputValue, setYearInputValue] = useState(selectedDate.year);

  const [mode, setMode] = useState("FullCalender");

  const [records, setRecords] = useState([]);

  const navigate = useNavigate()
  const location = useLocation()

  function handleYearLeftClick() {
    setSelectedDate((prev) => {
      return {
        ...prev,
        year: prev.year - 1,
      };
    });
  }

  function handleYearRightClick() {
    setSelectedDate((prev) => {
      return {
        ...prev,
        year: prev.year + 1,
      };
    });
  }

  function handleMonthLeftClick() {
    if (selectedDate.month - 1 < 1) {
      setSelectedDate((prev) => {
        return {
          ...prev,
          month: 12,
        };
      });
    } else {
      setSelectedDate((prev) => {
        return {
          ...prev,
          month: prev.month - 1,
        };
      });
    }
  }

  function handleMonthRightClick() {
    if (selectedDate.month + 1 > 12) {
      setSelectedDate((prev) => {
        return {
          ...prev,
          month: 1,
        };
      });
    } else {
      setSelectedDate((prev) => {
        return {
          ...prev,
          month: prev.month + 1,
        };
      });
    }
  }

  async function handleDoubleClick(cb, ref) {
    await cb(true);
    ref.current.focus();
  }

  function handleYearKeyDown(e) {
    const inputValue = yearInputValue;

    if (inputValue.length > 0 && e.key === "Enter") {
      if (inputValue > 0) {
        const setValue = Math.floor(Number(inputValue));

        setSelectedDate((prev) => {
          return {
            ...prev,
            year: setValue,
          };
        });
      }

      setYearInputValue(selectedDate.year);
      setIsYearEdit(false);
      e.preventDefault();
    }

    if (e.key === "Escape") {
      setIsYearEdit(false);
    }
  }

  function handleMonthKeyDown(e) {
    const inputValue = monthInputValue;

    if (inputValue.length > 0 && e.key === "Enter") {
      if (1 <= inputValue && inputValue <= 12) {
        const setValue = Math.floor(Number(inputValue));
        setSelectedDate((prev) => {
          return {
            ...prev,
            month: setValue,
          };
        });
      }

      setMonthInputValue(selectedDate.month);
      setIsMonthEdit(false);
      e.preventDefault();
    }

    if (e.key === "Escape") {
      setIsMonthEdit(false);
    }
  }

  function handleBlur(cb1, cb1Value, cb2) {
    cb1(cb1Value);
    cb2(false);
  }

  function handleOnChange(e, cb) {
    cb(e.target.value);
  }

  function handleSelectedDateClick(date) {
    setSelectedDate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    });
  }

  function handleSelectedPreviousDateClick() {
    const currentSelectDate = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.date
    );
    const setDate = subDays(currentSelectDate, 1);

    setSelectedDate({
      year: setDate.getFullYear(),
      month: setDate.getMonth(),
      date: setDate.getDate(),
    });
  }

  function handleSelectedFutureDateClick() {
    const currentSelectDate = new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.date
    );
    const setDate = addDays(currentSelectDate, 1);

    setSelectedDate({
      year: setDate.getFullYear(),
      month: setDate.getMonth(),
      date: setDate.getDate(),
    });
  }

  function handleChangeModeClick(mode) {
    setMode(mode);
  }

  function handleFullCalendarClick(date) {
    setSelectedDate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    });
    setMode("WeekCalendar");
  }

  function handleTodayClick() {
    const today = new Date();

    setSelectedDate({
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
    });
  }

  const handleWeekCalenderRecordClick = (recordId) => {
    navigate(`/record/${recordId}`)
  }

  useEffect(() => {
    if (mode !== "FullCalender") {
      return;
    }

    const getRecords = async () => {
      const startDate = new Date(selectedDate.year, selectedDate.month - 1, 1);
      const endDate = new Date(selectedDate.year, selectedDate.month, 0);

      const result = await getWorkoutRecords(endDate, startDate);

      setRecords(result.data.data.rows);
    };

    getRecords();
  }, [selectedDate, mode]);

  useEffect(() => {
    if (mode !== "WeekCalendar") {
      return;
    }

    const getRecords = async () => {
      const selectedDateObject = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.date
      );

      const result = await getWorkoutRecords(selectedDateObject);

      setRecords(result.data.data.rows);
    };

    getRecords();
  }, [selectedDate, mode]);

  useEffect(() => {
    if (mode !== "FullCalender") {
      return;
    }

    function getCalendar(date, weekLabelIndex = 0) {
      let _date = new Date(date);

      _date = new Date(
        _date.setDate(_date.getDate() - _date.getDay() + weekLabelIndex)
      );

      if (_date > date) {
        _date = new Date(_date.setDate(_date.getDate() - 7));
      }

      setForFullCalender(_date);
    }

    const formattedMonth = selectedDate.month.toString().padStart(2, "0");
    const inputDate = `${selectedDate.year}-${formattedMonth}-01`;

    getCalendar(inputDate);
  }, [selectedDate, mode]);

  useEffect(() => {
    if (mode !== "WeekCalendar") {
      return;
    }

    function getStartDate(date) {
      let _date = new Date(date);
      _date.setDate(_date.getDate() - 3);

      setStartDayForDayMode(_date);
    }

    const currentSelectDate = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.date
    );
    getStartDate(currentSelectDate);
  }, [selectedDate, mode]);

  useLayoutEffect(() => {
    if (location.state !== null) {
      setSelectedDate({
        year: location.state.date.getFullYear(),
        month: location.state.date.getMonth() + 1,
        date: location.state.date.getDate(),
      });

      setMode(location.state.mode);
    }
  }, [location])

  return (
    <div className="w-full h-full flex flex-col gap-1">
      <div className="grid grid-cols-7">
        <div className="col-span-4">
          <div className={clsx("flex gap-2", { hidden: isYearEdit })}>
            <button
              className="hover:bg-yellow-200"
              onClick={handleYearLeftClick}
            >
              Left
            </button>
            <h1
              className="text-5xl"
              onDoubleClick={() =>
                handleDoubleClick(setIsYearEdit, yearInputRef)
              }
            >
              {selectedDate.year}
            </h1>
            <button
              className="hover:bg-yellow-200"
              onClick={handleYearRightClick}
            >
              Right
            </button>
          </div>
          <div className={clsx("text-5xl", { hidden: !isYearEdit })}>
            <input
              type="text"
              ref={yearInputRef}
              onKeyDown={handleYearKeyDown}
              onBlur={() =>
                handleBlur(setYearInputValue, selectedDate.year, setIsYearEdit)
              }
              onChange={(e) => handleOnChange(e, setYearInputValue)}
              value={yearInputValue}
            />
          </div>
          <div className={clsx("flex gap-2", { hidden: isMonthEdit })}>
            <button
              className="hover:bg-yellow-200"
              onClick={handleMonthLeftClick}
            >
              Left
            </button>
            <h3
              className="text-4xl"
              onDoubleClick={() =>
                handleDoubleClick(setIsMonthEdit, monthInputRef)
              }
            >
              {getMonthAbbreviation(selectedDate.month)}
            </h3>
            <button
              className="hover:bg-yellow-200"
              onClick={handleMonthRightClick}
            >
              Right
            </button>
          </div>
          <div className={clsx("text-4xl", { hidden: !isMonthEdit })}>
            <input
              type="text"
              ref={monthInputRef}
              onKeyDown={handleMonthKeyDown}
              onBlur={() =>
                handleBlur(
                  setMonthInputValue,
                  selectedDate.month,
                  setIsMonthEdit
                )
              }
              onChange={(e) => handleOnChange(e, setMonthInputValue)}
              value={monthInputValue}
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col justify-end items-end">
          <div className="flex flex-row w-full border-2 border-zinc-800 rounded-lg">
            <button
              className={clsx(
                "border-r-2 border-zinc-800 rounded-l-lg  w-1/3 text-lg hover:bg-yellow-200",
                { "bg-orange-300": mode === "FullCalender" }
              )}
              onClick={() => handleChangeModeClick("FullCalender")}
            >
              Month
            </button>
            <button
              className={clsx(
                "border-r-2 border-zinc-800 w-1/3 text-lg hover:bg-yellow-200",
                { "bg-orange-300": mode === "WeekCalendar" }
              )}
              onClick={() => handleChangeModeClick("WeekCalendar")}
            >
              Week
            </button>
            <button
              className={clsx(
                "border-r-2 border-zinc-800 w-1/3 text-lg hover:bg-yellow-200",
                { "bg-orange-300": mode === "List" }
              )}
              onClick={() => handleChangeModeClick("List")}
            >
              List
            </button>
            <button
              className="rounded-r-md w-1/3 text-lg bg-zinc-600 text-slate-100 hover:bg-yellow-200 hover:text-zinc-900"
              onClick={() => handleTodayClick()}
            >
              Today
            </button>
          </div>
        </div>
      </div>
      <RecordListMode mode={mode}></RecordListMode>
      <FullCalender
        onClick={handleFullCalendarClick}
        mode={mode}
        startDate={startDateForFullCalender}
        month={selectedDate.month}
        today={today}
        data={records}
      ></FullCalender>
      <WeekCalendar
        mode={mode}
        startDayForDayMode={startDayForDayMode}
        selectedDate={selectedDate}
        records={records}
        onSelectedPreviousDateClick={handleSelectedPreviousDateClick}
        onSelectedFutureDateClick={handleSelectedFutureDateClick}
        onSelectedDateClick={handleSelectedDateClick}
        onRecordClick={handleWeekCalenderRecordClick}
      ></WeekCalendar>
    </div>
  );
};

export default HomePage;
