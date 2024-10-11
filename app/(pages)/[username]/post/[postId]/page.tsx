"use client"

import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react';

const PostPage = ({params}: {params: {postId: string}}) => {

    const [post, setPost] = useState<any>(null);
    const [replyText, setReplyText] = useState('');
    const {data : session} = useSession()
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/post/getPostById?postId=${params.postId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const postData = await response.json();
                setPost(postData);
            } catch (error) {
                console.error("Error fetching post:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchPost();
    }, [params.postId])

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!replyText) {
            console.log("Reply text is empty.");
            return;
        }

        try {
            const response = await fetch(`/api/post/${params.postId}/createReply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: replyText,
                    userId: session?.user?.id,
                }),
            });

            if (response.ok) {
                const newReply = await response.json();
                setPost((prevPost: any) => ({
                    ...prevPost,
                    replies: [...prevPost.replies, newReply],
                }));
                setReplyText('');
            } else {
                console.error("Failed to create reply");
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
    };

    const goBack = () => {
        window.history.back();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!post){
        return(
            <div>
                <p>Post not found</p>
            </div>
        )
    }

    return (
        <div className='grid gap-4'>
            <button onClick={goBack} className="flex items-center gap-4"><ArrowLeft />Go back</button>
            <PostCard
                id={post.id}
                userId={post.userId}
                username={post.user.username ?? ''}
                image={post.user.image ?? ''}
                name={post.user.name ?? ''}
                text={post.text ?? ''}
                createdAt={post.createdAt}
                admin={post.user.admin}
            />
            {session ? 
            <Card>
                <CardContent className='flex justify-between items-center py-4 gap-2'>
                    <img src={session?.user.image ?? ''} alt="" className="w-8 rounded-full"/>
                    <form action="" className='h-full w-full' onSubmit={handleReplySubmit}>
                        <Input 
                            className='border-none' 
                            placeholder='Post your answer'
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                        />
                    </form>
                    <Button onClick={handleReplySubmit}>Post</Button>
                </CardContent>
            </Card>
            : null }

            <div className='replies'>
                {post.replies && post.replies.map((reply: any) => (
                    <PostCard
                        key={reply.id}
                        id={reply.id}
                        userId={reply.userId}
                        username={reply.user.username ?? ''}
                        image={reply.user.image ?? ''}
                        name={reply.user.name ?? ''}
                        text={reply.text ?? ''}
                        createdAt={reply.createdAt}
                        admin={reply.user.admin}
                    />
                ))}
            </div>
        </div>
    )
}

export default PostPage