"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

const FollowLink = () => {

    const [follower, setFollower] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const userFromURL = pathParts[1];
        setUsername(userFromURL);
    }, []);

    useEffect(() => {
        const fetchUserId = async () => {
            if(username){
                try {
                    const response = await fetch(`api/user/getUserByUsername?username=${username}`);
                    const data = await response.json();
                    if(response.ok){
                        setFollower(data.followers.length);
                        setFollowing(data.following.length);
                    }else {
                        console.error("Error fetching user:", data.error);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        }
        fetchUserId();

    }, [username])

    return (
        <div className='flex gap-4 items-center'>
            <Link href="">{follower} Following</Link>
            <Link href="">{following} Followers</Link>
        </div>
    )
}

export default FollowLink