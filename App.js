import 'react-native-gesture-handler';
import * as React from 'react'
import {StyleSheet, View, Text, Image,Dimensions} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
//screens
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPassword from './screens/ForgotPassword';
//import OnboardingScreen from './screens/OnboardingScreen';
//network
import NetInfo from '@react-native-community/netinfo';

//Custom Screen 
import {   
  AproposStackScreen,
  AssistanceStackScreen,
  HomeStackScreen,
  ProfileStackScreen,
  PackStackScreen,
  PaymentStackScreen,
  BourseStackScreen,
  InscriptionStackScreen,
} from './screens/CustomScreens';
//City Component
import rome from './screens/RomeScreen.js';
import parme from './screens/ParmeScreen';
import sienne from './screens/SienneScreen'
import bologne from './screens/BologneScreen';
import florence from './screens/FlorenceScreen';

//Navigator
const Stack = createStackNavigator();
const City = createStackNavigator();
const OtherHomeStack = createStackNavigator();
const UploadStack= createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const { width, height } = Dimensions.get('screen');

function App() {
    
    const [netInfo, setNetInfo] = React.useState('');
    const [isInternetReachable, SetIsInternetReachable] = React.useState(true)
    const [connected, setConnected] = React.useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
        });
    };
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
  
      wait(2000).then(() => setRefreshing(false));
    }, []);
    React.useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((state) => {
        setNetInfo(
            `Connection type: ${state.type}
            Is connected?: ${state.isConnected}
            IP Address: ${state.details.ipAddress}`
        );
        setConnected(state.isWifiEnabled)
        SetIsInternetReachable(state.isInternetReachable)
        });

        return () => {
        // Unsubscribe to network state updates
        unsubscribe();
        };
    }, []);

    if (isInternetReachable) {
        return (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen 
                    name="SignInScreen" 
                    component={SignInScreen}  
                    options={{headerShown:false}} 
                />
                <Stack.Screen 
                    name="SignUpScreen" 
                    component={SignUpScreen}
                    options={{headerShown:false}} 
                />
                <Stack.Screen 
                    name="ForgotPassword" 
                    component={ForgotPassword}
                    options={{headerShown:false}} 
                />
                 <Stack.Screen 
                    name="Home" 
                    component={Home}
                    options={{headerShown:false}} 
                />
                <Stack.Screen 
                    name="infoCity" 
                    component={infoCity}
                    options={{headerShown:false}} 
                />
                <Stack.Screen 
                    name="OtherHome" 
                    component={OtherHome}
                    options={{headerShown:false}} 
                />
                <Stack.Screen 
                    name="UploadScreens" 
                    component={UploadScreens}
                    options={{headerShown:false}} 
                />
              </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <View style={styles.container}>
                <LottieView style={styles.image} source={require('./assets/offline.json')} loop autoPlay/>
                <Text style={styles.textStyle}>Veuillez de vérifier votre connexions internet</Text>
            </View>
        );
    }


}

//table
function Home() {
    return(
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#ec454a"
            barStyle={{ 
                backgroundColor: '#fff',
                
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarColor: '#232654',
                    tabBarIcon: ({ color }) => (
                    <Icon name="ios-home" color={color} size={26} />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStackScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarColor: '#232654',
                    tabBarIcon: ({ color }) => (
                    <Icon name="ios-person" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Apropos"
                component={AproposStackScreen}
                options={{
                    tabBarLabel: 'A propos',
                    tabBarColor: '#232654',
                    tabBarIcon: ({ color }) => (
                    <Icon name="ios-people" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


//city
function infoCity() {
  return(
    <City.Navigator>
        <City.Screen 
            name="rome" 
            component={rome}
            options={{headerShown:false}} 
        />
        <City.Screen 
            name="florence" 
            component={florence}
            options={{headerShown:false}} 
        />
        <City.Screen 
            name="bologne" 
            component={bologne}
            options={{headerShown:false}} 
        />
        <City.Screen 
            name="sienne" 
            component={sienne}
            options={{headerShown:false}} 
        />
          
        <City.Screen 
            name="parme" 
            component={parme}
            options={{headerShown:false}} 
        />
    </City.Navigator>
  )
}

function OtherHome() {
  return(
      <OtherHomeStack.Navigator>
        <OtherHomeStack.Screen
          name="PackStackScreen" 
          component={PackStackScreen} 
          options={{headerShown:false,}} 
        />
         <OtherHomeStack.Screen
          name="AssistanceScreen" 
          component={AssistanceStackScreen} 
          options={{headerShown:false,}} 
        />
      </OtherHomeStack.Navigator>
  )
}

function UploadScreens() {
    return(
        <UploadStack.Navigator>
            <UploadStack.Screen 
                name="BourseScreen" 
                component={BourseStackScreen} 
                options={{headerShown:false,}} 
            />
            <UploadStack.Screen 
                name="InscriptionScreen" 
                component={InscriptionStackScreen} 
                options={{headerShown:false,}} 
            />
            <UploadStack.Screen 
                name="PaymentScreen" 
                component={PaymentStackScreen} 
                options={{headerShown:false,}} 
            />
            
        </UploadStack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems:'center',
    },
    header: {
      fontSize: 22,
      fontWeight: '600',
      color: 'black',
      textAlign: 'center',
    },
    textStyle: {
      fontSize: 16,
      textAlign: 'justify',
      color: 'black',
    },
    image: { width: '100%', height: height * 0.4, marginBottom: 10 },
  });
export default App;