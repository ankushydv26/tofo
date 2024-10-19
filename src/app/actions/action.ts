'use server';

import Post from '../models/post';
import dbConnect from '../lib/mongo';  // Assuming you're using a separate file to connect to MongoDB

// Add post
const addPost = async (post: FormData) => {
  try {
    await dbConnect();  // Ensure MongoDB connection is established

    const title = post.get('title') as string;

    if (!title) {
      throw new Error('Title is required');
    }

    const newPost = new Post({ title });
    await newPost.save();
    
    return { success: true, message: 'Post created successfully' };
  } catch (error) {
    console.error('Error adding post:', error);
    return { success: false, message: 'Failed to create post' };
  }
};

const deletePost = async (id: string) => {
  try {
    await dbConnect();  // Ensure MongoDB connection is established
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      throw new Error('Post not found');
    }

    return { success: true, message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, message: 'Failed to delete post' };
  }
};

// Get posts
const getPosts = async () => {
  const posts = await Post.find();
  // Ensure that each post's _id is converted to a string
  return posts.map(post => ({
    _id: post._id.toString(), // Convert _id to string
    title: post.title,
    done: post.done,
  }));
};

const markPostAsDone = async (id: string) => {
  const post = await Post.findByIdAndUpdate(id, { done: true }, { new: true });
  return {
    _id: post._id.toString(),
    title: post.title,
    done: post.done,
  };
};

export { addPost, getPosts , markPostAsDone , deletePost};
