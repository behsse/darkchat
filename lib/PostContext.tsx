"use client"
import React, { createContext, useContext, useState } from "react";
import { Post } from "@/lib/type";

const PostContext = createContext<{
    posts: Post[];
    addPost: (post: Post) => void;
} | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    return (
        <PostContext.Provider value={{ posts, addPost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (context === undefined) {
        throw new Error("usePosts must be used within a PostProvider");
    }
    return context;
};
