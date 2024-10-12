"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from './ui/button'

const FollowButton = () => {
    const { data: session } = useSession();
    const [isFollowing, setIsFollowing] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const userFromURL = pathParts[1];
        setUsername(userFromURL);
    }, []);

    useEffect(() => {
        const fetchFollowStatus = async () => {
            if (!session || !username) return;

            try {
                const response = await fetch(`/api/follow/getFollow?username=${username}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setIsFollowing(true);
                } else {
                    setIsFollowing(false);
                }
            } catch (error) {
                console.error("Error fetching follow status:", error);
            }
        };
        fetchFollowStatus();
    }, [session, username]);

    const handleFollow = async () => {
        if (!session || !username) {
            return;
        }

        try {
            const response = await fetch(`/api/follow/createFollow?username=${username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userIdToFollow: session.user.id,
                }),
            });

            if (response.ok) {
                setIsFollowing(!isFollowing); // Inverse l'état du bouton
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Button className="grid" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}

export default FollowButton;
