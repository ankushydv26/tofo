'use server'

import Post from '../../models/post'

const addPost = async post => {
    const title = post.get('title')
    const description = post.get('description')

    const newPost = new Post({ title, description })
    return newPost.save()
}

export { addPost }
