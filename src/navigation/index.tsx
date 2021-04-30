import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import RecentUsersScreen from '../screens/RecentUsersScreen';
import { RootStackParamList } from '../types';

const Stack = createStackNavigator();

const MainNavigator: FC = () => {
    const { Navigator, Screen } = Stack;

    return (
        <NavigationContainer>
            <Navigator initialRouteName="Home">
                <Screen name="Home" component={HomeScreen} />
                <Screen name="Recent Users" component={RecentUsersScreen} />
            </Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;