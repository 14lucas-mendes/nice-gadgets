export default function Loading() {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex space-x-2">
          <div className={`w-3 h-3 bg-purple-600 rounded-full animate-pulse`} style={{animationDelay: '0ms'}}></div>
          <div className={`w-3 h-3 bg-purple-600 rounded-full animate-pulse`} style={{animationDelay: '150ms'}}></div>
          <div className={`w-3 h-3 bg-purple-600 rounded-full animate-pulse`} style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    );
  }