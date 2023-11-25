import clsx from "clsx"

const Tab = ({
  onClick,
  tablist,
  isDisable,
  currentTab
}) => {
  return (
    <div className='w-[98%]'>
      <div className='flex text-lg gap-1 border-b-4 border-gray-300'>
        {tablist.map(tab => {
          return (
            <button
              className={clsx(
                "border-4 border-gray-300 border-b-0 rounded-t-2xl  p-2",
                {
                  " border-yellow-300 ring-4 ring-orange-300":
                    tab.name === currentTab,
                  "hover:border-4 hover:border-yellow-300 hover:ring-4 hover:ring-orange-300 ":
                    !isDisable,
                  "cursor-not-allowed": isDisable,
                }
              )}
              disabled={isDisable}
              key={tab.name}
              onClick={() => onClick(tab.name)}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default Tab