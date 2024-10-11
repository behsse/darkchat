"use client"

import { Card, CardContent, CardHeader } from './ui/card'
import { LinkifyComponant } from './Linkify'
import { Ellipsis, Heart, MessageCircle } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { format } from 'date-fns';
import { Post } from '@/lib/type'
import Link from 'next/link'
import LikeButton from './LikeButton'
import ReplyButton from './ReplyButton'

type Props ={
    id : string;
    userId : string;
    username : string;
    image : string;
    name : string;
    text : string;
    createdAt : Date;
    admin : boolean;
    setUserPosts? : (posts: Post[] | ((prevPosts: Post[]) => Post[])) => void;
}
const PostCard = (props: Props) => {

    const deletePost = async (id: string) => {
        try {
          const response = await fetch(`/api/post/deletePostsByAdmin?id=${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            if(props.setUserPosts){
                props.setUserPosts((prevPosts: Post[]) => prevPosts.filter((post: Post) => post.id.toString() !== id));
            }
          }
        } catch (error) {
          console.error("Error:", error);
        }
    };

    return (
        <Card className='max-md:p-2'>
            <Link href={`/${props.username}/post/${props.id}`}>
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                        <img src={props.image ?? ''} alt="" className="w-9 rounded-full"/>
                            <Link href={`${props.username}`}>
                                <div className='flex items-center justify-center gap-2'>
                                    <p className='underline-offset-2 hover:underline'>{props.name}</p>
                                    <p className="text-foreground/40">@{props.username}</p>
                                </div>
                            </Link>
                        </div>
                        <p className="text-sm text-foreground/40">{format(new Date(props.createdAt), 'd MMM yyyy')}</p>
                    </div>
                </CardHeader>
                <LinkifyComponant>
                    <CardContent style={{ whiteSpace: 'pre-wrap' }} className='max-md:p-2'>
                        <p>{props.text}</p>
                    </CardContent>
                </LinkifyComponant>
            </Link>
            <CardContent className="flex items-center justify-between max-md:p-2">
                <div className="flex items-center justify-center gap-4">
                    <LikeButton postId={props.id}/>
                    <ReplyButton postId={props.id} username={props.username}/>
                </div>
                {props.admin ?  
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis className="w-5 hover:cursor-pointer"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Admin menu</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="p-2">
                                <button onClick={() => deletePost(props.id)} className="bg-none text-destructive">Delete</button>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                : null}
            </CardContent>
        </Card> 
    )
}

export default PostCard