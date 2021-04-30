import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HomeProps } from '../types';
import githubAPI from '../axios'



interface User {
    name: string;
    avatar_url: string;
    login: string;
    location: string;
    id: string;
    followers: string;
    public_repos: number;
    // repos_url: string;
}

interface Repositories{
    name:string;
    language:string;
    description: string;
    created_at: string;
    pushed_at: string;
}




function HomeScreen({ navigation }: HomeProps) {
    const recentUsers: any = 'Recent Users';
    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [repositories, setRepositories] = useState<[Repositories]>();

    useEffect(() => {

    }, [user]);

    async function loadData() {
        githubAPI.get('/users/12afaelPereira')
            .then( (response) =>{
                // console.log(response.data);
                setUser(response.data);
            });


    //     const response = await fetch('/users/12afaelPereira');
    //     const data = await response.json();

    //     setUser(data);
    }

    return (
        <View>
            <Text>Bem vindo ao HUBusca</Text>

            <TextInput
                onChangeText={setText}
                placeholder={"Buscar usuário"}
                value={text} />

            <Text>{user?.login}{user?.location}</Text>

            <Button title="Buscas recentes" onPress={() => { navigation.navigate(recentUsers) }} />
            <Button title="Busca user" onPress={() => { loadData() }} />
        </View>
    );
}

export default HomeScreen;