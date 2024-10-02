"use client"
import Link from 'next/link';
import SpeechToText from '../Component/speechrecognition';

const Tasks = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <p>Here you can manage your tasks.Not todo </p>
      <Link href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition">
        Back to Home
      </Link>
      <SpeechToText/>
    </div>
  );
};

export default Tasks;