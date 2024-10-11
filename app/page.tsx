"use client"

import { useEffect, useState } from "react";
import { Post } from "@/lib/type";
import { useSession } from "next-auth/react";
import { usePosts } from "@/lib/PostContext";
import PostCard from "@/components/PostCard";

export default function Home() {

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const {data : session} = useSession()
  const { posts } = usePosts();
  
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
  }, [posts]);

  return (
    <div className='w-full'>
      <div className="grid gap-4">
        {userPosts.map((post) => (
          <PostCard key={post.id} id={post.id} userId={post.userId} username={post.user.username ?? ''} image={post.user.image ?? ''} name={post.user.name ?? ''} text={post.text ?? ''} createdAt={post.createdAt} admin={session?.user.admin ?? false} setUserPosts={setUserPosts}/>
        ))} 
      </div>
    </div>
  );
}
