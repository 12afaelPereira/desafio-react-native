import React,{ FC } from "react";
import { Text, View } from "react-native";
import {RepositoryProps} from "../commom/interfaces";
import { RepositoryText, RepositoryWrap } from "../screens/index";



const Repository: FC<RepositoryProps> = (props) => {

    return (
        <RepositoryWrap>
            <RepositoryText>
                Nome: {props.name}
            </RepositoryText>
            <RepositoryText>
                Linguagem: {props.language || "Sem linguagem especificada"}
            </RepositoryText>
            <RepositoryText>
                Descrição: {props.description || "Sem descrição"}
            </RepositoryText>
            <RepositoryText>
                Data de criação: {props.created_at}Último push: {props.pushed_at}
            </RepositoryText>
            <RepositoryText>
                Último push: {props.pushed_at}
            </RepositoryText>
        </RepositoryWrap>
    );
}

export default Repository;