"use client"
import { Heart, Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react'

type Props = {
    postId : string;
}

const LikeButton = (props: Props) => {
    let [isPending, startTransition] = useTransition()
    const {data : session} = useSession()
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchLikeCount = async () => {
            try {
                const response = await fetch(`/api/like/getLike?postId=${props.postId}&userId=${session?.user.id}`);
                const data = await response.json();
                setLikeCount(data.likeCount);
                setIsLiked(data.isLikedByUser);
            } catch (error) {
                console.error("Error fetching like count:", error);
            }
        };
        fetchLikeCount();
    }, [props.postId, session])

    const handleLike = async () => {
        if(!session){
            return
        }

        try {
            const reponse = await fetch("/api/like/createLike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: props.postId,
                    userId: session.user.id
                }),
            });

            if (reponse.ok) {
                if(isLiked){
                    setLikeCount(likeCount - 1);
                } else {
                    setLikeCount(likeCount + 1);
                }
                setIsLiked(!isLiked);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    }

    return (
        <button onClick={() => startTransition(() => handleLike())} className='flex items-center gap-2 hover:text-red-500'>
            {isPending ? <Loader size={15}/> : <Heart size={15} className={`${isLiked ? 'text-red-500 fill-red-500' : ''}`}/>}
            <span className={`${isLiked ? 'text-red-500' : ''}`}>{likeCount}</span>
        </button>
    )
}

export default LikeButton