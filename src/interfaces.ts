export interface User {
    name: string;
    avatar_url: string;
    login: string;
    location: string;
    id: string;
    followers: string;
    public_repos: number;
    // repos_url: string;
}

export interface Repositories {
    name: string;
    language: string;
    description: string;
    created_at: string;
    pushed_at: string;
}
