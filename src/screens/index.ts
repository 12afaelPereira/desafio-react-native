import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';

export const Logo = styled.Text`
    color: rgba(68, 130, 195, 1);
    text-align:center;
    margin-top: 60px;
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
    flex:2;
    background-color: #EAEAEA;
    /* font-size: 18px; */
    padding-left:10px;
    border-top-left-radius:30px;
    border-bottom-left-radius:30px;

`

export const RecentUsersButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    padding-right: 10px;
    padding-left: 10px;
    border-top-right-radius:30px;
    border-bottom-right-radius:30px;
    background-color: rgba(68, 130, 195, 1);
`
export const RecentUsersText = styled.Text`
    color: white;
`