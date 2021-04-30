import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import RecentUsersScreen from '../screens/RecentUsersScreen';

const Stack = createStackNavigator();

const MainNavigator: FC = () => {
    const { Navigator, Screen } = Stack;

    return (
        <NavigationContainer>
            <Navigator initialRouteName="Home">
                <Screen name="HomeScreen" component={HomeScreen} />
                <Screen name="RecentUsersScreen" component={RecentUsersScreen} />
            </Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;