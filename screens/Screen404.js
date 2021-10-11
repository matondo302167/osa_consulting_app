import { Linking } from 'expo';
import * as React from 'react';
import { Image, Animated, Text, View, Dimensions, StyleSheet, StatusBar, ScrollView,RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const url = 'https://firebasestorage.googleapis.com/v0/b/firstapp-a8bdd.appspot.com/o/Apis%2Fnews%2Fnews.json?alt=media&token=dfb9f249-2ad2-48be-b942-7c05713cc0af';
const { width, height } = Dimensions.get('screen');

export const Screen404 = () => {

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
        fetch(url)
        .then((response) => response.json())
        .then((json) => setDados(json.news))
        .catch((error) => {
            alert(error);
        })
        .finally(() => setCarregando(false))
    },[])

    const scrollY = React.useRef(new  Animated.Value(0)).current
    return (
        <Animated.ScrollView>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../assets/network-failed.png')}/>
                <Text style={styles.paragraph}>Vérifiez la conneion</Text>
            </View> 
        </Animated.ScrollView>                           
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center'
    },
    featuredImage: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        marginRight: 20,
        borderRadius: 10,
    },
    bottomActions: {
        height: 80,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    image: { width: '100%', height: height * 0.4, resizeMode: 'cover', marginBottom: 20 },
    featuredTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginVertical: 20,
    },
    heading: {
        marginTop:10,
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 30,
    },
    paragraph: {
        flex: 1,
        marginBottom: 5,
        //fontFamily: 'Georgia',
        color:'gray',
        fontSize: 12,
        lineHeight: 16 * 1.5,
        alignSelf:'center',
        textAlign: 'justify'
    },
    icon: {
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});