import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
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
    repos_url: string;
}

interface Repositories {
    name: string;
    language: string;
    description: string;
    created_at: string;
    pushed_at: string;
}



function HomeScreen({ navigation }: HomeProps) {
    const recentUsers = 'RecentUsersScreen';

    let reposURL:string = "";
    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [search, setSearch] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<[Repositories]>();

    // useEffect(() => {

    // }, [user]);

    async function loadData(text: string) {

        githubAPI.get(`/users/${text}`)
            .then((response) => {
                setSearch(true);
                reposURL = response.data.repos_url;
                setUser(response.data);
            })
            .catch(error => {
                return true;
            });

        //     const response = await fetch('/users/12afaelPereira');
        //     const data = await response.json();

        //     setUser(data);
    }

    async function loadProfile(reposURL: string) {

        githubAPI.get(reposURL)
            .then((response) => {
                setProfile(true);
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => {
                return true;
            });
    }



    return (
        <View>
            <Text>Bem vindo ao HUBusca</Text>

            <TextInput
                onChangeText={setText}
                placeholder={"Buscar usuário"}
                value={text} />


            {search && (<View>
                <TouchableHighlight
                    style={styles.touch}
                    onPress={() => { loadProfile(reposURL) }}
                >
                    <Image source={{ uri: user?.avatar_url }}
                        style={styles.image}
                    />
                </TouchableHighlight>
                <Text style={styles.text}>{user?.name}</Text>
                <Text style={styles.text}>Login: {user?.login}</Text>
                <Text style={styles.text}>{user?.location}</Text>
            </View>)}


            <Button title="Buscas recentes" onPress={() => { navigation.navigate(recentUsers) }} />
            <Button title="Busca user" onPress={() => { loadData(text) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    touch:{
        display: 'flex',
        alignItems: 'center',
    },
    text:{
        textAlign: 'center',
    },
});

export default HomeScreen;

