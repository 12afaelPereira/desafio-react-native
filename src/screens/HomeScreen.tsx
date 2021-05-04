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

import { Header, Logo, RepositoryWrap, SearchBar, SearchBarButton, SearchBarText, SearchWrap, TextCenter, UserImageButton } from './index';


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
            <Header>
                <Logo>HUBusca</Logo>
                <View>
                    <EvilIcons name="search" size={30} color="rgba(68, 130, 195, 1)" />
                </View>
            </Header>

            <SearchWrap>
                <SearchBar
                    onChangeText={setText}
                    placeholder={"Buscar usuário"}
                    value={text}
                    returnKeyType='search'
                    onSubmitEditing={() => loadUser()}
                >
                </SearchBar>

                <SearchBarButton onPress={() => { loadUser() }}>
                    <SearchBarText>Buscar</SearchBarText>
                </SearchBarButton>
            </SearchWrap>

            {/* <SearchBarButton onPress={() => { navigation.navigate(recentUsers) }}>
                    <SearchBarText>Buscar</SearchBarText>
            </SearchBarButton> */}



            {userProfile && (
                <View>
                    <UserImageButton
                        onPress={() => { loadUserRepositoriesData() }}
                    >
                        <Image source={{ uri: user.avatar_url }}
                            style={styles.image}
                        />
                    </UserImageButton>
                    <TextCenter>{user.name}</TextCenter>
                    <TextCenter>Login: {user.login}</TextCenter>
                    <TextCenter>{user.location}</TextCenter>
                </View>
            )}


            {aboutUser && (
                <View style={styles.scroll}>
                    <View>
                        <TextCenter>ID: {user.id}</TextCenter>
                        <TextCenter>Followers: {user.followers}</TextCenter>
                        <TextCenter>Repositorios públicos: {user.public_repos}</TextCenter>
                        <TextCenter>Lista de Repositórios:</TextCenter>
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
                                ></Repository>
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
    scroll: {
        flex: 1,
        backgroundColor: 'white',
    },
    activity: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export default HomeScreen;

