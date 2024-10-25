'use client'

// components/Loader.js
export default function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-blue-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-blue-400 rounded-full opacity-70"></div>
          </div>
        </div>
      </div>
    );
  }
  