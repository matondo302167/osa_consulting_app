import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import {ActivityIndicator, useTheme} from 'react-native-paper';
import { TouchableOpacity as TouchableOpacityAndroid} from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import firebase from '../Firebase/firebaseConfig';

//import ImagePicker from 'react-native-image-crop-picker';

const EditProfileScreen = () => {
  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();

  const [data, setData] = React.useState({
    name: '',
    surname: '',
    numberPhone: '',
    message: '',
    nameUser:'',
    check_textInputChange: false,
    check_textInputChangeName: false,
    check_textInputChangeSurname: false,
    check_textInputChangeNumberPhone: false,
    isValidName: false,
    isValidSurname: false,
    isValidNumberPhone: false,
    loadingLogin: false,
    correct: false,
  });

  const textInputChangeName = (val) => {
    if( val.length >= 2 ) {
        setData({
            ...data,
            name: val,
            check_textInputChangeName: true,
            isValidName:true,
        });
    } else {
        setData({
            ...data,
            name: val,
            check_textInputChangeName: false,
            isValidName:false,
        });
    }
  }
  const textInputChangeSurname = (val) => {
    if( val.length >= 2 ) {
        setData({
            ...data,
            surname: val,
            check_textInputChangeSurname:true,
            isValidSurname:true,
        });
    } else {
        setData({
            ...data,
            surname: val,
            check_textInputChangeSurname:false,
            isValidSurname:false,
        });
    }
  }

  const textInputChangeNumberPhone = (val) => {
    if( val.length >= 6 ) {
        setData({
            ...data,
            numberPhone: val,
            check_textInputChangeNumberPhone:true,
            isValidNumberPhone:true,
        });
    } else {
        setData({
            ...data,
            numberPhone: val,
            check_textInputChangeNumberPhone:false,
            isValidNumberPhone:false,
        });
    }
  }

  const update = async () => {
    setData({...data,loadingLogin:true})
    if (data.isValidName && data.isValidNumberPhone && data.isValidSurname) {
      var userUid = firebase.auth().currentUser.uid;

      await firebase.firestore().collection('Studente').doc(userUid).update({
        Prenom: data.name,
        Nom: data.surname,
        Telephone: data.numberPhone
      }).catch((error) =>{
        Alert.alert('Erreur','errore firestore')
        setData({...data, message: 'errore firestore'})
        setData({...data,loadingLogin:false})
      }).finally(() => {setData({...data, message: 'errore firestore'})})

      await firebase.database().ref('/Studente/' + userUid).update({
        Prenom: data.name,
        Nom: data.surname,
        Telephone: data.numberPhone
      }).catch((error) => {
        Alert.alert('Erreur','errore database')
        setData({...data, message: 'errore database'})
        setData({...data,loadingLogin:false})
      }).finally(() =>{ setData({...data, loadingLogin:false})})

      Alert.alert('sucess','vos données ont été modifiés')

    } else {
      Alert.alert('Erreur','vous devez remplir tous les camps')
      setData({...data, message: 'errore incorrect fields'})
      setData({...data,loadingLogin:false})
    }
  }

  const updatePicture = async () => {
    setData({...data,loadingLogin:true})
    const blob = await new Promise((resolve, reject) => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      } catch (error) {
        Alert.alert('Erreur','operation non conclue')
        setData({...data,loadingLogin:false})
      }
    });
    const ref = firebase
      .storage()
      .ref()
      .child('/profil_picture/'+'/'+firebase.auth().currentUser.email+'/'+firebase.auth().currentUser.email)
    const snapshot = await ref.put(blob);
  
    // We're done with the blob, close and release it
    blob.close();

    Alert.alert('chargement','operation conclue avec succès')
    
    return await snapshot.ref.getDownloadURL().then((url) => {
      firebase.firestore().collection('Studente').doc(firebase.auth().currentUser.uid).update({
        ImageUrl: url
      }).catch((error) => {
        console.log(error.code)
        setData({...data,loadingLogin:false})
      })

      firebase.database().ref('Studente').child(firebase.auth().currentUser.uid).update({
        ImageUrl: url
      }).catch((error) => {
        console.log(error.code)
        setData({...data,loadingLogin:false})
      })
    }).catch((error) => {
      console.log(error.code)
      setData({...data,loadingLogin:false})
    }).finally(() => {
      setData({...data,loadingLogin:false})
    })
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Chargez la photo</Text>
        <Text style={styles.panelSubtitle}>Actualisez votre photo de profile</Text>
      </View>
      {Platform.OS === 'ios'?
      <>
       {data.correct?
        <TouchableOpacity style={styles.panelButton} onPress={updatePicture}>
          <Text style={styles.panelButtonTitle}>Sauvegardez</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choisir une photo dans la gallerie</Text>
        </TouchableOpacity>
       }
        <TouchableOpacity
          style={styles.panelButton}
          onPress={cancel}>
          <Text style={styles.panelButtonTitle}>Annulez</Text>
        </TouchableOpacity>
      </>
      :
      <>
        {data.correct?
          <TouchableOpacityAndroid style={styles.panelButton} onPress={updatePicture}>
            <Text style={styles.panelButtonTitle}>Sauvegardez</Text>
          </TouchableOpacityAndroid>
          :
          <TouchableOpacityAndroid style={styles.panelButton} onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choisir une photo dans la gallerie</Text>
          </TouchableOpacityAndroid>
        }
        <TouchableOpacityAndroid
          style={styles.panelButton}
          onPress={cancel}>
          <Text style={styles.panelButtonTitle}>Annulez</Text>
        </TouchableOpacityAndroid>
      </>
      }
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
    const choosePhotoFromLibrary = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setData({...data,correct:true})
    }
  };
  
  const cancel = () => {
    bs.current.snapTo(1)
    setData({...data,correct:false})
  }

  const bs = React.createRef();
  const fall = new Animated.Value(1);


  return (
    <>
      {data.loadingLogin? 
        <ActivityIndicator size="large" color="#000" style={styles.container}/>
        :
        <View style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
        <Animated.View style={{margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={
                    {uri: image,}
                  }
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15,}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#77777777'
  
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.9,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {data.nameUser}
            </Text>
          </View>
          
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Prénom"
              placeholderTextColor="#666666"
              onChangeText={(val) => textInputChangeName(val)}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="Nom"
              placeholderTextColor="#666666"
              onChangeText={(val) => textInputChangeSurname(val)}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color={colors.text} size={20} />
            <TextInput
              placeholder="Numéro de téléphone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              onChangeText={(val) => textInputChangeNumberPhone(val)}
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <TouchableOpacity style={styles.commandButton} onPress={update}>
            <Text style={styles.panelButtonTitle}>Sauvegardez</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      }
    </>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#232654',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#26456777',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});