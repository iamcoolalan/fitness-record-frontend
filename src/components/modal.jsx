const Modal = ({ message, onCloseDeleteModalClick, onDeleteRecordClick }) => {
  return (
    <div className="grid grid-rows-[10%_75%_15%] fixed top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-[60%] border-4 border-slate-700 rounded-lg w-[30%] h-[30%] bg-neutral-50 shadow-xl shadow-slate-600">
      <div className="row-span-1 border-b-4 border-slate-700 flex flex-row-reverse items-center p-3">
        <button
          className="text-lg font-bold hover:text-red-600 "
          onClick={onCloseDeleteModalClick}
        >
          X
        </button>
      </div>
      <div className="row-span-1 flex justify-center items-center text-xl">
        <span>{message}</span>
      </div>
      <div className="row-span-1 grid grid-cols-2 border-t-4 border-slate-700">
        <div
          className="col-span-1 flex justify-center items-center border-r-4 border-slate-700 rounded-bl-md cursor-pointer text-xl hover:bg-green-200"
          onClick={onDeleteRecordClick}
        >
          確定
        </div>
        <div
          className="col-span-1 flex justify-center items-center rounded-br-md cursor-pointer text-xl hover:bg-red-300"
          onClick={onCloseDeleteModalClick}
        >
          取消
        </div>
      </div>
    </div>
  );
};

export default Modal