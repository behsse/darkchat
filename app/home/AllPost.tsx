"use client"
import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { format } from 'date-fns';
import Linkify from 'react-linkify';

interface Post {
  id: number;
  text: string | null;
  completed: boolean;
  createdAt: Date;
  userId: string;
  user: {
    name: string | null;
    image: string | null;
};
}

type Props = {
    allPost : Post[];
}

export default function AllPost(props : Props) {
    
    const {data : session} = useSession()

    const sortedPosts = [...props.allPost].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <div className="w-1/3">
        {session?.user.admin ?
            <div className="grid gap-4">
            {sortedPosts.map((post) => (
                <Card key={post.id}>
                    <CardHeader>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                                <img src={post.user.image ?? ''} alt="" className="w-6 rounded-full"/>
                                <p>{post.user.name}</p>
                            </div>
                            <p className="text-sm text-foreground/40">{format(new Date(post.createdAt), 'd MMM yyyy')}</p>
                        </div>
                    </CardHeader>
                    <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                        <a target="_blank" style={{ color: 'rgb(29, 155, 240)', transition: "all .5s"}} href={decoratedHref} key={key} onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }} // Change la couleur au survol
                        onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}>
                            {decoratedText}
                        </a>
                    )}>
                    <CardContent style={{ whiteSpace: 'pre-wrap' }}>
                        <p>{post.text}</p>
                    </CardContent>
                </Linkify>
                </Card> 
                ))} 
            </div>
            : 
            ""
        }
        </div>
    )
}
