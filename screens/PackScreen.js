import * as React from 'react';
import { Image, Animated, Text, View, Dimensions, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const url = 'https://firebasestorage.googleapis.com/v0/b/firstapp-a8bdd.appspot.com/o/Apis%2Fpacks%2Ftarif.json?alt=media&token=3b957eba-3b80-45c3-b027-1dd84ef22afa';
const { width, height } = Dimensions.get('screen');
const getImage = (i) => `https://source.unsplash.com/600x${400 + i}/?blackandwhite`;

export default () => {

    const [carregando,setCarregando] = React.useState(true);
    const [articleParagraphs,setDados] = React.useState([]);

    React.useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((json) => setDados(json.tarifs))
        .catch((error) => {
            alert(error);
        })
        .finally(() => setCarregando(false))
    },[])

    const scrollY = React.useRef(new  Animated.Value(0)).current
    return (
        <>
            <StatusBar
                barStyle={'light-content'}
                backgroundColor="#232654"
                translucent
            />
            {carregando?
                <ActivityIndicator size="large" color="black" style={styles.container}/>
                :
                <View>
                    <Animated.ScrollView 
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
                        contentContainerStyle={{padding:20}}
                    >
                        {articleParagraphs.map((item,index) => {
                            return(
                                <View key={index}>
                                  <Text style={styles.heading}>{item.name_pack}</Text>
                                    <Text style={styles.paragraph}>{item.description}</Text>
                                </View>
                            )
                        })}
                        <View style={[styles.bottomActions]}/>
                    </Animated.ScrollView>
                </View>

            }
        </>
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
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 30,
    },
    paragraph: {
        flex: 1,
        marginBottom: 10,
        //fontFamily: 'Georgia',
        fontSize: 14,
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