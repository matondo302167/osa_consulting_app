import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Platform,
  BackHandler,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Card} from '../Components/Card'
import { MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons';

const Accueil = ({navigation}) => {
  const [carregando,setCarregando] = React.useState(true);
  const [articlesCard,setDados] = React.useState([]);
  const url = 'https://firebasestorage.googleapis.com/v0/b/firstapp-a8bdd.appspot.com/o/Apis%2FappCard%2Fdata.json?alt=media&token=aad62189-8da3-4e6b-9f01-4228e5a2db22';
  React.useEffect(() => {
      fetch(url)
      .then((response) => response.json())
      .then((json) => setDados(json.articles))
      .catch((error) => {
          alert(error);
      })
      .finally(() => setCarregando(false))
      navigation.addListener('beforeRemove', (e) => {
  
        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert(
          'Voulez-vous sortir?',
          'Si vous clicquez sur oui vous devriez mettre de nouveau vos coordonnées',
          [
            { text: "Non", style: 'cancel', onPress: () => {} },
            {
              text: 'Oui',
              style: 'destructive',
              // If the user confirmed, then we dispatch the action we blocked earlier
              // This will continue the action that had triggered the removal of the screen
              onPress: () => navigation.dispatch(e.data.action),
            },
          ]
        );
      })
  },[])

  return (
  <>
    <StatusBar
      barStyle={'dark-content'}
      backgroundColor="#fff"
      translucent
    />
    {carregando?
      <ActivityIndicator size="large" color="black" style={styles.container}/>

      :
      <ScrollView style={[styles.container]}>
        <View style={styles.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#fff">
            <View style={styles.slide}>
              <Image
                source={require('../assets/rome.png')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assets/florence.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
            <View style={styles.slide}>
              <Image
                source={require('../assets/sienne.jpg')}
                resizeMode="cover"
                style={styles.sliderImage}
              />
            </View>
          </Swiper>
        </View>

        <View style={styles.categoryContainer}>
        </View>
        <View style={[styles.categoryContainer, {marginTop: 10}]}>
          <TouchableOpacity 
            style={styles.categoryBtn}
            onPress = {()=> navigation.navigate('OtherHome',{screen:'PackStackScreen'})}
          >
            <View style={[styles.categoryIcon,{backgroundColor:'#c8cbe8'}]}>
              <MaterialIcons name="group-work" size={35} color="#232654" />
            </View>
            <Text style={styles.categoryBtnTxt}>Nos packs</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.categoryBtn} 
            onPress = {()=> navigation.navigate('OtherHome',{screen:'AssistanceScreen'})}
          >
            <View style={[styles.categoryIcon,{backgroundColor:'#fbd3d5'}]}>
              <MaterialCommunityIcons  name="newspaper" size={35} color="#ec454a"/>
            </View>
            <Text style={styles.categoryBtnTxt}>Voir les news</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardsWrapper}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333',
            }}>
            Toutes les informations sur les villes où nous travaillons
          </Text>
        </View>
        <View style={styles.cardsWrapper}>
          {articlesCard.map((item,index) => {
            return(
              <View key={index}>
                <Card item={item} navigation={navigation} />
              </View>
            )
          })}
        </View>
      </ScrollView>
    
    }
  </>
  );
};

export default Accueil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor:'#232654',
  },
  fake_icon_box: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    //backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#232654',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});