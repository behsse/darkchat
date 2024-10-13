"use client";

import { useEffect, useState } from "react";
import { Post } from "@/lib/type";
import { useSession } from "next-auth/react";
import PostCard from "@/components/PostCard";

const AllPost = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch("/api/post/getAllPosts");
        const data: Post[] = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchAllPosts();
  }, []);

  return (
    <div className="grid gap-4">
      {userPosts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        userPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            userId={post.userId}
            username={post.user?.username ?? ""}
            image={post.user?.image ?? ""}
            name={post.user?.name ?? ""}
            text={post.text ?? ""}
            createdAt={post.createdAt}
            admin={session?.user?.admin ?? false}
          />
        ))
      )}
    </div>
  );
};

export default AllPost;
