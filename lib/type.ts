export type Post = {
    id: string;
    text: string | null;
    completed: boolean;
    createdAt: Date;
    userId: string;
    user: {
      name: string | null;
      username : string | null;
      image: string | null;
    };
}

export type User = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    username: string | null;
    bio : string | null;
    admin: boolean;
    posts : Post[];
}