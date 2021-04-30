import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
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
    const recentUsers = 'RecentUsersScreen';

    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [repositories, setRepositories] = useState<[Repositories]>();

    // useEffect(() => {

    // }, [user]);

    async function loadData(text:string) {
        githubAPI.get(`/users/${text}`)
            .then( (response) =>{
                setUser(response.data);
            })
            .catch(error =>{
                return true;
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

            <View>
                <Image source={{
                    // uri: 'https://www.cleverfiles.com/howto/wp-content/uploads/2018/03/minion.jpg'
                    uri: user?.avatar_url
                }}
                style={styles.container}
                />
                <Text>Nome: {user?.name}</Text>
                <Text>Login: {user?.login}</Text>
                <Text>Localização: {user?.location}</Text>
            </View>

            <Button title="Buscas recentes" onPress={() => { navigation.navigate(recentUsers) }} />
            <Button title="Busca user" onPress={() => { loadData(text) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      width: 100,
      height: 100,
      borderRadius: 100,
    },
});

export default HomeScreen;

