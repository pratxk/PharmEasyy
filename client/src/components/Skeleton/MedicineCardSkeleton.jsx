const MedicineCardSkeleton = () => {
    return (
      <div className="m-4 flex w-lg max-w-xs sm:max-w-sm md:max-w-md flex-col rounded-xl border border-gray-100 bg-neutral shadow-md">
        <div className="relative mx-3 mt-2 flex h-full overflow-hidden rounded-xl justify-center bg-gray-200 animate-pulse">
          <div className="w-[300px] h-[300px] bg-gray-300" />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-primary px-2 text-center text-sm font-medium text-neutral opacity-50">
            Loading...
          </span>
        </div>
  
        <div className="mt-4 px-5 pb-5 animate-pulse">
          <h5 className="h-6 bg-gray-300 rounded w-3/4 mb-2"></h5>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="h-8 bg-gray-300 rounded w-1/3 inline-block"></span>
              <span className="h-4 bg-gray-300 rounded w-1/4 inline-block ml-2"></span>
            </p>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="flex justify-center space-x-2 w-full">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-300 animate-pulse"></div>
            <span className="mx-2 h-6 bg-gray-300 rounded w-12 inline-block"></span>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-300 animate-pulse"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MedicineCardSkeleton;
  