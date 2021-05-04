import React from 'react';
import Repository from '../components/Repository';
import styled from 'styled-components/native';

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 70px;
`

export const Logo = styled.Text`
    color: rgba(68, 130, 195, 1);
    text-align:center;
    
    font-size:20px;
    font-weight:bold;
`;


export const SearchWrap = styled.View`
    display:flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top:30px;
    margin-bottom: 30px;
    width: 80%;
    height: 30px;
    color: rgba(68, 130, 195, 1);
    /* background-color: orange; */

`

export const SearchBar = styled.TextInput`
    flex:1;
    background-color: #EAEAEA;
    padding-left:15px;
    border-top-left-radius:30px;
    border-bottom-left-radius:30px;

`

export const SearchBarButton = styled.TouchableOpacity`
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
    padding-left: 10px;
    border-top-right-radius:30px;
    border-bottom-right-radius:30px;
    background-color: rgba(68, 130, 195, 1);
`
export const SearchBarText = styled.Text`
    color: white;
`
// export const RecentUsersButton = styled.TouchableOpacity`
//     display: flex;
//     justify-content: center;
//     padding-right: 10px;
//     padding-left: 10px;
//     border-top-right-radius:30px;
//     border-bottom-right-radius:30px;
//     background-color: rgba(68, 130, 195, 1);
// `
// export const RecentUsersText = styled.Text`
//     color: white;
// `

export const UserImageButton = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export const TextCenter = styled.Text`
    text-align: center;
`

export const RepositoryWrap = styled.View`
    display: flex;
    align-self: center;
    width: 92%;
    margin-top:20px;
    padding: 20px;
    border-radius: 10px;
    background: #64A0DE;
`
export const RepositoryText = styled.Text`
    color: #fff;
`