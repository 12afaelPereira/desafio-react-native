import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    HomeScreen: undefined;
    RecentUsersScreen: undefined;
};

// HomeScreen 
export type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList, 'HomeScreen'
>;

export type HomeScreenRouterProp = RouteProp<
    RootStackParamList, 'HomeScreen'
>;

export type HomeProps = {
    router: HomeScreenRouterProp;
    navigation: HomeScreenNavigationProp;
}

// // RecentUsersScreen
// export type RecentUsersScreen = StackNavigationProp<
//     RootStackParamList, 'RecentUsersScreen'
// >;

// export type RecentUsersScreenRouterProp = RouteProp<
//     RootStackParamList, 'RecentUsersScreen'
// >;

// export type RecentUsersProps = {
//     router: RecentUsersScreenRouterProp;
//     navigation: RootStackParamList;
// }


