"use client"
import PostCard from "@/components/PostCard";
import { User } from "@/lib/type";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import FollowButton from "@/components/FollowButton";

const UserPage = ({params}: {params: {username: string}}) => {

    const [user, setUser] = useState<User | null>(null);
    const {data : session} = useSession()
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [newUser, setNewUser] = useState(
        {
            name: user?.name,
            bio: user?.bio,
        }
    );

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/user/getUserByUsername?username=${params.username}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                setUser(userData);
                setNewUser({ name: userData.name, bio: userData.bio });
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchUser();
    }, [params.username])

    if (loading) {
        return <div>Loading...</div>;
    }

    if(!user){
        return <div>User not found</div>
    }

    const userChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const updateUser = async (e: React.FormEvent) =>{
        e.preventDefault();
        try {
            const response = await fetch(`api/user/updateUser`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.username,
                    name: newUser.name,
                    bio: newUser.bio,
                }),
            })
            if(!response.ok){
                throw new Error("Failed to update user");
            }
            const updateUser = await response.json();
            setUser(updateUser);
            setNewUser({ name: updateUser.name, bio: updateUser.bio });

            const fetchUpdatedUser = async () => {
                try {
                    const userResponse = await fetch(`/api/user/getUserByUsername?username=${updateUser.username}`);
                    if (!userResponse.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const userData = await userResponse.json();
                    setUser(userData);
                } catch (error) {
                    console.error("Error fetching updated user:", error);
                }
            };

            await fetchUpdatedUser();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    return (
        <div className="grid gap-12 w-full">
            <div className="grid gap-4">
                <div className="flex items-start gap-4">
                    <img src={user.image ?? ""} alt="user image" className="w-20 rounded-full"/>
                    <div className="grid gap-4 w-full">
                        <div className="flex justify-between w-full">
                            <div>
                                <p className="text-2xl font-bold">{user.name}</p>
                                <p className="text-sm text-foreground/40">@{user.username}</p>
                            </div>
                            {session?.user.username === user.username ?
                            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                                <AlertDialogTrigger 
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    onClick={() => {setIsOpen(true) ; setAlertMessage(null)}}
                                >Edit profile</AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Edit profile</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            <form className='grid gap-4' onSubmit={updateUser}>
                                                <div>
                                                    <span>Name</span>
                                                    <Input 
                                                        name="name"
                                                        onChange={userChange}
                                                        value={newUser.name || ""}
                                                    />
                                                </div>
                                                <div>
                                                    <span>Bio</span>
                                                    <Input 
                                                        name="bio"
                                                        onChange={userChange}    
                                                        value={newUser.bio || ""}
                                                    />
                                                </div>
                                                {alertMessage && <p className="text-destructive">{alertMessage}</p>}
                                                <div className='flex justify-end gap-4'>
                                                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                                                    <div className="flex items-end h-full">
                                                        <Button type="submit">Confirm</Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                </AlertDialogContent>
                            </AlertDialog>
                            :
                            <div>
                                <FollowButton/>
                            </div>
                            }
                        </div>
                        <p>{user.bio}</p>
                    </div>
                </div>
            </div>
            <div className="h-3/4 grid gap-4">
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map((post) => {
                        return <PostCard 
                            key={post.id} 
                            id={post.id} 
                            userId={post.userId} 
                            image={post.user.image ?? ''} 
                            username={post.user?.username ?? ''} 
                            name={post.user.name ?? ''} 
                            text={post.text ?? ''} 
                            createdAt={post.createdAt} 
                            admin={session?.user.admin ?? false} 
                        />;
                    })
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    )
}

export default UserPage