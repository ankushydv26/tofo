// components/Dashboard.tsx
'use client'; // Ensure this component is a Client Component

import { useState, useEffect } from 'react';
import { addPost, getPosts, markPostAsDone, deletePost } from '../actions/action';
import Loader from '../Component/Loader/loader'


interface Post {
  _id: string; // Assuming each post has a unique ID
  title: string;
  done: boolean;
}
const Dashboard = () => {
  const [task, setTask] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [loading, setLoading] = useState<boolean>(true); // State for loading

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', task);

    try {
      await addPost(formData);
      setTask(''); // Clear the input field after submission
      fetchPosts();
      setLoading(false)
      // Re-fetch posts after adding a new one
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting the task. Please try again.'); // Set error message
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost(id);
      fetchPosts();  // Refresh posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Error deleting post. Please try again.');
    }
  };

  const fetchPosts = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
      setLoading(true)
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Error fetching posts. Please try again.'); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleMarkAsDone = async (id: string) => {
    try {
      await markPostAsDone(id);
      fetchPosts(); // Re-fetch posts to update the UI
    } catch (error) {
      console.error('Error marking post as done:', error);
      setError('Error marking post as done. Please try again.'); // Set error message
    }
  };

  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
  }, []);

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
  {/* Image and Heading */}
  <div className="flex flex-col items-center">
    <img
      className="w-16 h-16 mb-2"
      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg"
      alt="To-Do List"
    />
    <h1 className="text-2xl font-bold text-gray-800 mb-4">To-Do List</h1>
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label
        className="block text-lg font-medium text-gray-700 mb-2 text-center font-gochi"
        htmlFor="title"
      >
        ~ Today I need to ~
      </label>
      <div className="flex items-center gap-2">
        <input
          name="task"
          type="text"
          required
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your task"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  </form>

  {/* Loading and Error Messages */}
  {loading && <p className="text-center text-gray-500">Loading tasks...</p>}
  {error && <p className="text-red-500 text-center">{error}</p>}

  {/* Current Tasks Heading */}
  <h2 className="text-xl font-semibold mt-6 text-center font-gochi">Current Tasks</h2>

  {/* Task List */}
  {!loading ? (
    <ul className="space-y-2 mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <li
            key={post?._id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-md bg-gray-50"
          >
            <span className="text-gray-800 font-medium font-gochi">{post?.title}</span>
            <div className="flex items-center gap-2">
              <span
                onClick={() => handleMarkAsDone(post?._id)}
                className={`cursor-pointer text-lg ${post?.done ? 'text-green-500' : 'text-red-500'}`}
              >
                {post?.done ? '✓' : '✗'}
              </span>
              <button
                onClick={() => handleDeletePost(post?._id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No tasks found.</p>
      )}
    </ul>
  ) : (
    <Loader />
  )}
</div>


  );
};

export default Dashboard;
