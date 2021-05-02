import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { HomeProps } from '../types';
import { Repositories, User } from '../interfaces';
import githubAPI from '../axios'
import { keyframes } from 'styled-components';

function HomeScreen({ navigation }: HomeProps) {
    const recentUsers = 'RecentUsersScreen';

    const [text, setText] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [search, setSearch] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);
    const [repositories, setRepositories] = useState<Repositories[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [offset, setOffset] = useState<number>(1);
    const perPage:number = 10;


    // useEffect(() => {
    //     if(profile){
    //         loadUserRepositoriesData();
    //     }
    // }, []);

    function loadUserData() {

        githubAPI.get(`/users/${text}`)
            .then((response) => {
                setText("");
                setRepositories([]);
                setProfile(false);
                setSearch(true);
                setOffset(1);
                setUser(response.data);
            })
            .catch(error => {
                return true;
            });
    }

    function loadUserRepositoriesData() {
        githubAPI.get(`/users/${user?.login}/repos?page=${offset}&per_page=${perPage}`)
            .then((response) => {
                setProfile(true);
                setOffset(offset + 1);
            
                let data =  [...repositories, ...response.data];
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
            <Button title="Busca user" onPress={() => { loadUserData() }} />

            {search && (<View>
                <TouchableOpacity
                    style={styles.touch}
                    onPress={() => { loadUserRepositoriesData() }}
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
                <View style={styles.scroll}>
                    <View>
                        <Text>ID: {user?.id}</Text>
                        <Text>Followers: {user?.followers}</Text>
                        <Text>Repositorios públicos: {user?.public_repos}</Text>
                        <Text>Lista de Repositórios:</Text>
                    </View>


                    <FlatList
                        data={repositories}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={loadUserRepositoriesData}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={()=>
                            <View style={styles.activity}>
                                <ActivityIndicator size="large" color="#0000ff" />
                            </View>    
                        }
                        renderItem={({ item, index }) =>
                            <View>
                                <Text>
                                    Nome: {item.name}
                                </Text>
                                <Text>
                                    Linguagem: {item.language || "Sem linguagem especificada"}
                                </Text>
                                <Text>
                                    Descrição: {item.description || "Sem descrição"}
                                </Text>
                                <Text>
                                    Data de criação: {item.created_at}. Último push: {item.pushed_at}
                                </Text>
                            </View>
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
        flex:1,
        // flexGrow:1,
        // paddingBottom: 100,
    },
    activity:{
        marginTop: 20,
        marginBottom: 20,
    },
});

export default HomeScreen;

