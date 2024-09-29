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

// Get posts
const getPosts = async () => {
  try {
    await dbConnect();  // Ensure MongoDB connection is established

    const posts = await Post.find().lean();  // Use `lean()` to get plain JS objects
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export { addPost, getPosts };
