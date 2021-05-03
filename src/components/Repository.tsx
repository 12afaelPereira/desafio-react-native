import React,{ FC } from "react";
import { Text, View } from "react-native";
import {RepositoryProps} from "../interfaces"


const Repository: FC<RepositoryProps> = (props) => {

    return (
        <View>
            <Text>
                Nome: {props.name}
            </Text>
            <Text>
                Linguagem: {props.language || "Sem linguagem especificada"}
            </Text>
            <Text>
                Descrição: {props.description || "Sem descrição"}
            </Text>
            <Text>
                Data de criação: {props.created_at}. Último push: {props.pushed_at}
            </Text>
        </View>
    );
}

export default Repository;