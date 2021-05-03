import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HomeProps } from '../types';
import { Repositories, User } from '../interfaces';
import githubAPI from '../axios'
import { keyframes } from 'styled-components';
import Repository from '../components/Repository';
import UserComponent from '../components/UserComponent';
import * as WebBrowser from 'expo-web-browser';



function HomeScreen({ navigation }: HomeProps) {
    const recentUsers = 'RecentUsersScreen';

    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>({ name: "", avatar_url: undefined, login: "", location: "", id: "", followers: "", public_repos: 0 });
    const [aboutUser, setAboutUser] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<Repositories[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(1);
    const perPage: number = 10;

    const [requestLoadData, setRequestLoadData] = useState<number>(0);
    const [requestRepositoriesData, setRequestRepositoriesData] = useState<number>(0);

    const [receivingData, setReceivingData] = useState<boolean>(true);


    const loadUser = () => {

        // setText("");
        // // requestUser(text);
        // setRepositories([]);
        // setUserProfile(true);
        // setAboutUser(false);
        // setOffset(1);

        githubAPI.get(`/users/${text}`)
            .then((response) => {
                setRequestLoadData(requestLoadData + 1);
                // console.log("Request LoadUser: " + requestLoadData);

                setText("");
                setRepositories([]);
                setAboutUser(false);
                setUserProfile(true);
                setOffset(1);
                setUser(response.data);
            })
            .catch(error => {
                return true;
            });
    }

    const loadUserRepositoriesData = () => {
        setLoading(true);

        githubAPI.get(`/users/${user.login}/repos?page=${offset}&per_page=${perPage}`)
            .then((response) => {
                // setRequestRepositoriesData(requestRepositoriesData + 1);
                // console.log("Request LoadRepositoriesData: " + requestRepositoriesData);

                setAboutUser(true);
                setOffset(offset + 1);
                setLoading(false);

                let data = [...repositories, ...response.data];
                setRepositories(data);
            })
            .catch(error => {
                return true;
            });
    }

    return (
        <View style={styles.scroll}>
            <Text style={styles.text}>Bem vindo ao HUBusca</Text>

            <TextInput
                onChangeText={setText}
                placeholder={"Buscar usuário"}
                value={text} />


            <Button title="Buscas recentes" onPress={() => { navigation.navigate(recentUsers) }} />
            <Button title="Buscar user" onPress={() => { loadUser() }} />




            {userProfile && (

                // <UserComponent
                //     avatar_url={user.avatar_url}
                //     name={user.name}
                //     login={user.login}
                //     location={user.location}
                // />
                <View>
                    <TouchableOpacity
                        style={styles.touch}
                        onPress={() => { loadUserRepositoriesData() }}
                    >
                        <Image source={{ uri: user.avatar_url }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}>{user.name}</Text>
                    <Text style={styles.text}>Login: {user.login}</Text>
                    <Text style={styles.text}>{user.location}</Text>
                </View>
            )}



            {aboutUser && (
                <View style={styles.scroll}>
                    <View>
                        <Text>ID: {user.id}</Text>
                        <Text>Followers: {user.followers}</Text>
                        <Text>Repositorios públicos: {user.public_repos}</Text>
                        <Text>Lista de Repositórios:</Text>
                    </View>


                    <FlatList
                        data={repositories}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={loadUserRepositoriesData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={() => {
                            if (!loading) return null;

                            return (
                                <View style={styles.activity}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>
                            )
                        }}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => { WebBrowser.openBrowserAsync(`https://github.com/${user.login}/${item.name}`)}}>

                                <Repository
                                    name={item.name}
                                    language={item.language}
                                    description={item.description}
                                    created_at={item.created_at}
                                    pushed_at={item.pushed_at}
                                />
                            </TouchableOpacity>
                        }
                    />
                </View>)
            }
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
    scroll: {
        flex: 1,
        // flexGrow:1,
        // paddingBottom: 100,
    },
    activity: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default HomeScreen;

