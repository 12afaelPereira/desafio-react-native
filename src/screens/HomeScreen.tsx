import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HomeProps } from '../commom/types';
import { Repositories, User } from '../commom/interfaces';
import githubAPI from '../commom/axios'
import Repository from '../components/Repository';
import UserComponent from '../components/UserComponent';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EvilIcons } from '@expo/vector-icons';

import { Logo, RecentUsersButton, RecentUsersText, SearchBar, SearchWrap } from './index';


function HomeScreen({ navigation }: HomeProps) {
    const recentUsers = 'RecentUsersScreen';

    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>({ name: "", avatar_url: undefined, login: "", location: "", id: "", followers: "", public_repos: 0 });
    const [aboutUser, setAboutUser] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<Repositories[]>([]);

    const [users, setUsers] = useState<User[]>([user]);

    const [loading, setLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(1);
    const perPage: number = 10;


    const setSearches = async (users: User[]) => {
        try {
            const jsonValue = JSON.stringify(users)
            await AsyncStorage.setItem('@users', jsonValue)
        } catch (e) {
            // save error
        }
        console.log('Done.')
    }

    const getSearches = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@users')
            if (jsonValue !== null) {
                console.log(JSON.parse(jsonValue));
            }

        } catch (e) {
            // read error
        }

        console.log('Done.')
    }

    const loadUser = () => {

        // setSearches("sdasdasawad");
        // setText("");
        // // requestUser(text);
        // setRepositories([]);
        // setUserProfile(true);
        // setAboutUser(false);
        // setOffset(1);

        githubAPI.get(`/users/${text}`)
            .then((response) => {
                setText("");
                setRepositories([]);
                setAboutUser(false);
                setUserProfile(true);
                setOffset(1);
                setUser(response.data);
                setUsers([...users, ...response.data]);
                setSearches(users);
                // getSearches();
            })
            .catch(error => {
                return true;
            });


        getSearches();
    }

    const loadUserRepositoriesData = () => {
        setLoading(true);

        githubAPI.get(`/users/${user.login}/repos?page=${offset}&per_page=${perPage}`)
            .then((response) => {

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
            <Logo>HUBusca</Logo>

            <SearchWrap>
                <SearchBar
                    onChangeText={setText}
                    placeholder={"Buscar usuário"}
                    value={text}
                    returnKeyType='search'
                    onSubmitEditing={() => loadUser()}
                >
                </SearchBar>

                <RecentUsersButton onPress={() => { navigation.navigate(recentUsers) }}>
                    <RecentUsersText>Buscas recentes</RecentUsersText>
                </RecentUsersButton>
            </SearchWrap>



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
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                onPress={() => { WebBrowser.openBrowserAsync(`https://github.com/${user.login}/${item.name}`) }}>

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
        backgroundColor: 'white',
        // flexGrow:1,
        // paddingBottom: 100,
    },
    activity: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default HomeScreen;

