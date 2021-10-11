import * as React from 'react';
import { Image, Animated, Text, View, Dimensions, StyleSheet, StatusBar, ScrollView,Linking } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const url = 'https://firebasestorage.googleapis.com/v0/b/firstapp-a8bdd.appspot.com/o/Apis%2FcityContains%2Fflorence.json?alt=media&token=00f8e867-20be-47c8-9497-76a351f44c08';
const { width, height } = Dimensions.get('screen');

export const FlorenceComponent = () => {

    const [carregando,setCarregando] = React.useState(true);
    const [articleParagraphs,setDados] = React.useState({});

    React.useEffect(() => {
        try {
            fetch(url)
            .then((response) => response.json())
            .then((json) => setDados(json.rome))
            .catch((error) => {
                alert('Erreur de connexion');
                setCarregando(true)
            })
            .finally(() => setCarregando(false))
        } catch (error) {
            setCarregando(true)
        }
    },[])

    const scrollY = React.useRef(new  Animated.Value(0)).current
    return (
        <>
            {carregando?
                <ActivityIndicator size="large" color="black" style={styles.container}/>
                :
                <View>
                    <Animated.ScrollView 
                        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
                        contentContainerStyle={{padding:20}}
                    >
                        <Text style={[styles.heading],{fontSize:32,textAlign:'center',color:'#232654'}}>Florence</Text>
                        {articleParagraphs.dummy.map( (item,index) => {
                            return(
                                <View key={index}>
                                    <Text style={styles.heading}>{item.title}</Text>
                                    <Text style={styles.paragraph}>{item.text_title}</Text>
                                    <Text style={styles.heading}>{item.subtitle}</Text>
                                    <Text style={styles.paragraph}>{item.text_subtitle}</Text>
                                    <Text 
                                        style={[styles.paragraph],{color:'#FD5963'}} 
                                        onPress={()=>{Linking.openURL(item.link)}}
                                    >
                                        {item.link}
                                    </Text>
                                </View>
                            )
                        })}
                        <View style={[styles.bottomActions]}/>
                        <Text style={[styles.heading],{fontSize:32,textAlign:'center',color:'#232654'}}>Sites touristiques importants</Text>
                        {articleParagraphs.tourisme.map( (item,index) => {
                            return(
                                <View key={index}>
                                    <Text style={styles.heading}>{item.name}</Text>
                                    <Image style={styles.image}  source={{uri: item.image_url}}/>
                                    <Text style={styles.paragraph}>{item.description}</Text>
                                </View>
                            )
                        })}
                        <View style={[styles.bottomActions]}/>
                        <Text style={[styles.heading],{fontSize:32,textAlign:'center',color:'#232654'}}>Universités</Text>
                        {articleParagraphs.university.map( (item,index) => {
                            return(
                                <View key={index}>
                                    <Text style={styles.heading}>{item.university}</Text>
                                    <Text style={styles.paragraph}>{item.description}</Text>
                                    <Text 
                                        style={[styles.paragraph],{color:'#FD5963'}} 
                                        onPress={()=>{Linking.openURL(item.link)}}
                                    >
                                        {item.link}
                                    </Text>
                                </View>
                            )
                        })}
                        <View style={[styles.bottomActions]}/>

                        <Text style={[styles.heading],{fontSize:32,textAlign:'center',color:'#232654'}}>Inscription</Text>
                        {articleParagraphs.inscription.map( (item,index) => {
                            return(
                                <View key={index}>
                                    <Text style={styles.heading}>{item.title}</Text>
                                    <Text style={styles.paragraph}>{item.text_title}</Text>
                                    <Text style={styles.heading}>{item.subtitle}</Text>
                                    <Text style={styles.paragraph}>{item.text_subtitle}</Text>
                                    <Text style={styles.paragraph}>{item.date}</Text>

                                </View>
                            )
                        })}
                        <View style={[styles.bottomActions]}/>

                        <Text style={[styles.heading],{fontSize:32,textAlign:'center',color:'#232654'}}>Bourse</Text>
                        {articleParagraphs.bourse.map( (item,index) => {
                            return(
                                <View key={index}>
                                    <Text style={styles.heading}>{item.title}</Text>
                                    <Text style={styles.paragraph}>{item.text_title}</Text>
                                    <Text style={styles.heading}>{item.date_limite}</Text>
                                    <Text style={styles.paragraph}>{item.text_date_limite}</Text>
                                    <Text style={styles.heading}>{item.bourse_valor}</Text>
                                    <Text style={styles.paragraph}>{item.text_bourse_valor}</Text>
                                    <Text style={styles.heading}>{item.obtention}</Text>
                                    <Text style={styles.paragraph}>{item.text_obtention}</Text>
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
        fontSize: 25,
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