import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
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
                setText("");
                setRepositories(undefined);
                setSearch(true);
                setUser(response.data);
            })
            .catch(error => {
                return true;
            });
    }

    async function loadProfile(login: string | undefined) {

        githubAPI.get(`/users/${login}/repos`)
            .then((response) => {
                setProfile(true);
                setRepositories(response.data);
            })
            .catch(error => {
                return true;
            });
    }



    return (
        <View>
            <Text style={styles.text}>Bem vindo ao HUBusca</Text>

            <TextInput
                onChangeText={setText}
                placeholder={"Buscar usuário"}
                value={text} />


            <Button title="Buscas recentes" onPress={() => { navigation.navigate(recentUsers) }} />
            <Button title="Busca user" onPress={() => { loadData(text) }} />


            {search && (<View>
                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => { loadProfile(user?.login) }}
                >
                    <Image source={{ uri: user?.avatar_url }}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>{user?.name}</Text>
                <Text style={styles.text}>Login: {user?.login}</Text>
                <Text style={styles.text}>{user?.location}</Text>
            </View>)}

            {profile && (
                <ScrollView>
                    {repositories?.map((repository, index) => {
                        return (
                            <Text key={index}>
                                {repository.name}
                            </Text>)
                    })}
                </ScrollView>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    touch: {
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
    },
});

export default HomeScreen;

