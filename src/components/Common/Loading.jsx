
const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute w-full h-full border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
        {/* Inner Dot */}
        <div className="absolute top-2 left-2 w-12 h-12 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
