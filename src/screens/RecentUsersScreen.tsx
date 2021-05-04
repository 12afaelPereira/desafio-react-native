import React, { FC, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, TouchableOpacity, View } from 'react-native';
import { User } from '../commom/interfaces';
import { FlatList } from 'react-native-gesture-handler';

const RecentUsersScreen: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

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
                setUsers(JSON.parse(jsonValue));
            }
        } catch (e) {
            // read error
        }
        
        console.log('Done.')
    }


    return (
        <View>
            <Text>Buscas Recentes</Text>

            {/* <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    <View>
                        <Text>{users.name}</Text>
                        <Text>Login: {user.login}</Text>
                        <Text>{users.location}</Text>
                    </View>
                }}
            /> */}
        </View>
    );
}

export default RecentUsersScreen;