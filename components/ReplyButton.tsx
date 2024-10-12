"use client"
import { MessageCircle, Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react'

type Props = {
    postId : string;
    username : string;
}

const ReplyButton = (props: Props) => {
    let [isPending, startTransition] = useTransition()
    const {data : session} = useSession()
    const [replyCount, setReplyCount] = useState();

    useEffect(() => {
        const fetchRepliesCount = async () => {
            try {
                const response = await fetch(`/api/post/${props.postId}/getReply?postId=${props.postId}`);
                const data = await response.json();
                setReplyCount(data.replyCount);
            } catch (error) {
                console.error("Error fetching replies count:", error);
            }
        };

        fetchRepliesCount();
    }, [props.postId, session]);

    return (
        <Link href={`/${props.username}/post/${props.postId}`} className='flex items-center gap-2 hover:text-blue-500'>
            {isPending ? <Loader size={15}/> : <MessageCircle size={15}/>}
            <span>{replyCount}</span>
        </Link>
    )
}

export default ReplyButton