export interface User {
    name: string;
    avatar_url: string | undefined;
    login: string;
    location: string;
    id: string;
    followers: string;
    public_repos: number;
}

export interface Repositories {
    name: string;
    language: string;
    description: string;
    created_at: string;
    pushed_at: string;
}

export interface UserProps {
    name: string;
    avatar_url: string | undefined;
    login: string;
    location: string;
}

export interface RepositoryProps extends Repositories{

}

