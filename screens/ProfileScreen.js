import React from 'react';
import {View, SafeAreaView, Animated,StyleSheet, Alert,RefreshControl} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import Share from 'react-native-share';

import firebase from '../Firebase/firebaseConfig';


const ProfileScreen = ({navigation}) => {

  const [refreshing, setRefreshing] = React.useState(false);
    const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
        });
    };
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
  
      wait(1000).then(() => setRefreshing(false));
    }, []);

  const [data, setData] = React.useState({
    nameUser: '',
    surname: '',
    numberPhone: '',
    username: '',
    packChoisi: '',
    imageUser: '',
    uid: '',
    isValidNumberPhone: false,
    loadingLogin: false,
    correct: false,
  });
  const [payerUser,setPayerUser] = React.useState('');
  React.useEffect(() =>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        try {
          data.uid = user.uid

          firebase.firestore().collection('Studente').doc(data.uid).onSnapshot((snapshot) => {
            setData({
              ...data,
              nameUser: snapshot.data().Prenom,
              surname: snapshot.data().Nom,
              numberPhone: snapshot.data().Telephone,
              username: snapshot.data().E_mail,
              packChoisi: snapshot.data().pack_choisi,
              imageUser: snapshot.data().ImageUrl
            })
          })
          firebase
            .database()
            .ref("/Studente/"+data.uid)
            .child('payer')
            .on('value',function(snapshot){
              setPayerUser(snapshot.val())
            })
        } catch (error) {
          Alert.alert('Erreur','difficulté à lire les données')
        }
      } else {
        return firebase.auth().currentUser;
      }
    })
  },[firebase.auth().currentUser])
  const scrollY = React.useRef(new  Animated.Value(0)).current
  return (
    <Animated.ScrollView  
      style={styles.container} 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={data.imageUser === ''?  
            {uri: 'https://api.adorable.io/avatars/80/abott@adorable.png'}
            :
            {uri: data.imageUser}
            }
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{data.nameUser}</Title>
            <Caption style={styles.caption}>@{data.surname}</Caption>
          </View>
        </View>
      </View>
      
      <View style={styles.userInfoSection}>
        {payerUser === data.uid?
          <View style={styles.row}>
            <Icon name="check-circle" color="#008000" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>pack payé</Text>
          </View>
          :
          <View style={styles.row}>
            <Icon name="close-circle" color="#f00" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>Aucun pack payé</Text>
          </View>
        }
        <View style={styles.row}>
          <Icon name="fax" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{data.packChoisi === ''? 'Aucun pack choisi' : data.packChoisi}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{data.numberPhone === ''? 'Aucun numéro ajouté' : data.numberPhone}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{data.username}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
          </View>
          <View style={styles.infoBox}>
           
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('UploadScreens',{screen:'PaymentScreen'})}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#23a4df" size={25}/>
            <Text style={styles.menuItemText}>Chargez la facture du paiement</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('UploadScreens',{screen:'BourseScreen'})}>
          <View style={styles.menuItem}>
            <Icon name="wallet-outline" color="#23a4df" size={25}/>
            <Text style={styles.menuItemText}>Chargez les documents pour la bourse</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('UploadScreens',{screen:'InscriptionScreen'})}>
          <View style={styles.menuItem}>
            <Icon name="file" color="#23a4df" size={25}/>
            <Text style={styles.menuItemText}>Chargez les documents d'inscriptions</Text>
          </View>
        </TouchableRipple>

      </View>
    </Animated.ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});