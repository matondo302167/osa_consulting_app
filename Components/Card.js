import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'

const { width, height } = Dimensions.get('window')

export const Card = ({item,navigation}) => {
    console.log(item)
    return (
        <View style={styles.cardView}>
            <TouchableOpacity onPress={()=> navigation.navigate('infoCity',{screen: item.screen_name})}>
                <Text style={styles.title}> {item.title}</Text>
                <Text style={styles.author}>{item.author} </Text>
                {/* <Image style={styles.image} source = {{uri: item.urlToImage}}/> */}
                <Image style={styles.image} source={item.urlToImage ? {uri: item.urlToImage } : null}/>
                <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: 'white',
        margin: width * 0,
        borderRadius: width * 0.05,
        marginLeft: width * 0,
        marginRight: width * 0,
        shadowOffset: { width:0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 3,
        marginBottom: 15
    },
    title: {
        marginHorizontal: width * 0.05,
        marginVertical: width * 0.03,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    description: {
        marginVertical: width * 0.02,
        marginHorizontal: width * 0.05,
        color: 'gray',
        fontSize: 12,
        textAlign:'justify',
        alignSelf: 'auto'
    },
    image: {
        height: height / 6,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginVertical: height * 0.02
    },
    author: {
        marginBottom: width * 0.0,
        marginHorizontal: width * 0.05,
        fontSize: 15,
        color: 'gray',
        textAlign:'justify',
        alignSelf: 'auto'
    }

})
