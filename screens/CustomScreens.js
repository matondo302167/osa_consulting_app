import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons';
import {useTheme,Avatar} from 'react-native-paper';
import {View,TouchableOpacity,StyleSheet} from 'react-native';

//Screens
import HomeScreen from './HomeScreen';
import AproposScreen from './AproposScreen';
import NotificationScreen from './NotificationScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import PackScreen from './PackScreen';
import NewsScreen from './NewsScreen';
import PaymentScreen from '../UploadsScrens/PaymentScreen';
import BourseScreen from '../UploadsScrens/BourseScreen';
import InscriptionScreen from '../UploadsScrens/InscriptionScreen'


//Navigator
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const PackStack = createStackNavigator();
const AproposStack = createStackNavigator();
const NewsStack = createStackNavigator();
const PaymentStack = createStackNavigator();
const InscriptionStack = createStackNavigator();
const BourseStack = createStackNavigator();
const ProfileStack = createStackNavigator();

export const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
      },
        headerTintColor: '#000',
        headerTitleStyle: {
        fontWeight: 'bold'
      },
  }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
      title:'Accueil',
      headerLeft: () => (
         <></> // per non lasciare aparire arrow-back
      ),
      headerTitleAlign: 'center',
  }} />
  </HomeStack.Navigator>
);


export const PackStackScreen = ({navigation}) => (
    <PackStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#232654',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <PackStack.Screen
        name="Nos packs"
        component={PackScreen}
        options={{
          title: 'Nos packs',
          headerLeft: () => (
            <View>
              <FontAwesome.Button
                name="chevron-left"
                size={25}
                backgroundColor="#232654"
                color="#fff"
                onPress={() => navigation.goBack()}
              />
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </PackStack.Navigator>
);



export const NotificationStackScreen = ({navigation}) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#232654',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
    <NotificationStack.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <></>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

export const AproposStackScreen = ({navigation}) => (
    <AproposStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <AproposStack.Screen
        name="A propos"
        component={AproposScreen}
        options={{
          headerLeft: () => (
            <></>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </AproposStack.Navigator>
);

export const AssistanceStackScreen = ({navigation}) => (
    <NewsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#232654',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <NewsStack.Screen
        name="Nouvelles informations"
        component={NewsScreen}
        options={{
          headerLeft: () => (
            <FontAwesome.Button
              name="chevron-left"
              size={25}
              backgroundColor="#232654"
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => (
            <FontAwesome 
              name="question-circle" 
              size={30} 
              backgroundColor="#232654"
              color="#fff" 
            />
          ),
          headerTitleAlign: 'center',
          
        }}
      />
    </NewsStack.Navigator>
  );

  //PaymentStackScreen
  export const PaymentStackScreen = ({navigation}) => (
    <PaymentStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#232654',
        },
        title:'Facture du paiment',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <PaymentStack.Screen
        name="Assistance"
        component={PaymentScreen}
        options={{
          headerLeft: () => (
            <FontAwesome.Button
              name="chevron-left"
              size={25}
              backgroundColor="#232654"
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </PaymentStack.Navigator>
  );
  
  //BourseStackScreen
  export const BourseStackScreen = ({navigation}) => (
    <BourseStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#232654',
        },
        title:'Documents de la Bourse',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <BourseStack.Screen
        name="Nos news"
        component={BourseScreen}
        options={{
          headerLeft: () => (
            <FontAwesome.Button
              name="chevron-left"
              size={25}
              backgroundColor="#232654"
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </BourseStack.Navigator>
  );

  //InscriptionStackScreen
  export const InscriptionStackScreen = ({navigation}) => (
    <InscriptionStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#232654',
        },
        title:"Documents d'inscription",
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}>
      <InscriptionStack.Screen
        name="InscriptionScreen"
        component={InscriptionScreen}
        options={{
          headerLeft: () => (
            <FontAwesome.Button
              name="chevron-left"
              size={25}
              backgroundColor="#232654"
              color="#fff"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </InscriptionStack.Navigator>
  );
//profileStackScreen
export const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: "#000",
      }}>
      <ProfileStack.Screen
        name="Profiles"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerLeft: () => (
            <></>
          ), 
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor="#fff"
                color="#000"
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
