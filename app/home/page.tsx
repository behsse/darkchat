import { getPosts } from '../api/post/route'
import AllPost from './AllPost'

export default async function page() {

  const allPosts = await getPosts()

  return (
    <div className='w-full flex justify-center'>
      <AllPost allPost={allPosts}/>
    </div>
  )
}
