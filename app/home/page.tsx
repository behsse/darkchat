import { getAllPosts } from '../api/post/route'
import {Card,CardContent,CardHeader} from "@/components/ui/card"
import { format } from 'date-fns';
import { LinkifyComponant } from '@/components/Linkify';

export default async function page() {

  const posts = await getAllPosts()
  
  return (
    <div className='w-full flex items-center justify-center'>
      <div>
        <div className="grid gap-4">
            {posts.map((post) => (
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
                <LinkifyComponant>
                  <CardContent style={{ whiteSpace: 'pre-wrap' }}>
                    <p>{post.text}</p>
                  </CardContent>
                </LinkifyComponant>
              </Card> 
            ))} 
        </div>
      </div>
    </div>
  )
}
