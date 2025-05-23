"use client";

import { useEffect, useState } from "react";
import { Post } from "@/lib/type";
import { useSession } from "next-auth/react";
import PostCard from "@/components/PostCard";
import { useRouter } from "next/navigation";

const AllPost = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const { data: session } = useSession();
  const router = useRouter();

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(`/api/post/getAllPosts?uid=${Date.now()}`);
      const data: Post[] = await response.json();
      setUserPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    const eventListener = () => fetchAllPosts();
    window.addEventListener('post-updated', eventListener);
    return () => window.removeEventListener('post-updated', eventListener);
  }, [forceUpdate]);

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
