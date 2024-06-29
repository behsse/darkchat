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
        {/* {session?.user.admin ?

            : 
            ""
        } */}
        </div>
    )
}
