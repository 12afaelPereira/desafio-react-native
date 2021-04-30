import React from 'react';
import { Button, Text, View } from 'react-native';
import { HomeProps } from '../types';



function HomeScreen({ navigation }: HomeProps) {
    return (
        <View>
            <Text>Hello from home!</Text>

            <Button title="Buscas recentes" onPress={() => { navigation.navigate('Recent Users') }} />
        </View>
    );
}

export default HomeScreen;