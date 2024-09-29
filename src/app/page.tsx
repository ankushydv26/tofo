import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-5 left-5">
        <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition">
          Add Task
        </button>
      </div>
      
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard" className="px-6 py-3 bg-white shadow-md rounded-lg hover:bg-gray-100 transition">
          To Do
        </Link>
        <Link href="/task" className="px-6 py-3 bg-white shadow-md rounded-lg hover:bg-gray-100 transition">
          Task
        </Link>
        <Link href="/not-todo" className="px-6 py-3 bg-white shadow-md rounded-lg hover:bg-gray-100 transition">
          Not To Do
        </Link>
      </nav>
    </div>
  );
}
