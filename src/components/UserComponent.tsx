import React,{ FC } from "react";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { UserProps } from "../commom/interfaces";

const UserComponent: FC<UserProps> = (props) => {
    return (
        <View>
            <TouchableOpacity
                // style={styles.touch}
                // onPress={() => { loadUserRepositoriesData() }}
            >
                <Image source={{ uri: props.avatar_url }}
                    style={styles.image}
                />
            </TouchableOpacity>
            <Text>{props.name}</Text>
            <Text>Login: {props.login}</Text>
            <Text>{props.location}</Text>
        </View>
    );

}
const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 100,
    },
});

export default UserComponent;