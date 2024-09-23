"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Task {
  text: string;
  completed: boolean;
}

const Tasks = () => {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from the xoxo.txt file on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (task.trim()) {
      const newTask = { text: task };
      await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      setTasks((prevTasks) => [...prevTasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Your Tasks</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="px-4 py-2 border rounded-md w-80 mr-2"
        />
        <button 
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition">
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-2">
        {tasks.map((t, index) => (
          <li key={index} className="flex items-center justify-between px-4 py-3 bg-white shadow-md rounded-lg">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTaskCompletion(index)}
                className="mr-2"
              />
              <span className={t.completed ? 'line-through text-gray-500' : ''}>
                {t.text}
              </span>
            </label>
          </li>
        ))}
      </ul>

      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500 transition">
        Back to Home
      </Link>
    </div>
  );
};

export default Tasks;