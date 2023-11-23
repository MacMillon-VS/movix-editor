const VideoCardSkeleton = () => {
  return (
    <div className=" w-full h-full">
      <div className=" object-cover h-[350px]  w-full bg-white/40   transition-all duration-500 " />
      <div className=" bg-white/50 w-[60%] mt-3 line-clamp-2 h-[5px]" />
      <div className="text-gray-400 bg-gray-400/30 w-[40%] h-[3px] mt-3" />
    </div>
  );
};

export default VideoCardSkeleton;
