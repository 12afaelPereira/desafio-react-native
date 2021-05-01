import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FlatList, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { HomeProps } from '../types';
import { Repositories, User } from '../interfaces';
import githubAPI from '../axios'

function HomeScreen({ navigation }: HomeProps) {
    const recentUsers = 'RecentUsersScreen';

    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [search, setSearch] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<[Repositories]>();

    // useEffect(() => {}, [user]);

    function loadUserData(text: string) {

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

    function loadUserRepositoriesData(login: string | undefined) {

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
            <Button title="Busca user" onPress={() => { loadUserData(text) }} />

            {search && (<View>
                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => { loadUserRepositoriesData(user?.login) }}
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
                // <FlatList
                //     data={repositories}
                //     keyExtractor={(_, index)=> index.toString()}
                //     renderItem={(item) => {
                //         return(
                //             <Text>Repo name: {item}</Text>
                //         )
                //     }}

                // />
                <ScrollView>
                    <View>
                        <Text>ID: {user?.id}</Text>
                        <Text>Followers: {user?.followers}</Text>
                        <Text>Repositorios públicos: {user?.public_repos}</Text>
                        <Text>Lista de Repositórios:</Text>
                    </View>
                    {repositories?.map((repository, index) => {
                        return (
                            <ScrollView key={index}>
                                <Text>
                                    Nome: {repository.name}
                                </Text>
                                <Text>
                                    Linguagem: {repository.language || "Sem linguagem especificada"}
                                </Text>
                                <Text>
                                    Descrição: {repository.description || "Sem descrição"}
                                </Text>
                                <Text>
                                    Data de criação: {repository.created_at}. Último push: {repository.pushed_at}
                                </Text>
                            </ScrollView>
                        )
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

