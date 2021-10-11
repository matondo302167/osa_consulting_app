import React, {useState} from 'react'
import { StatusBar,View,Text,StyleSheet,TextInput,TouchableOpacity,Alert,ScrollView, ActivityIndicator} from 'react-native'
import * as Animatable from 'react-native-animatable';
//import firebase from '../Firebase/firebaseConfig'
import { FontAwesome } from '@expo/vector-icons';
import firebase from '../Firebase/firebaseConfig'

const forgotPassword = ({navigation}) =>{
    const [email,setEmail] = useState('');
    const onchangeEmail = (txtEmail) => {
        setEmail(txtEmail)
    } 
    const [loading,setLoading] = useState({
        loadingLogin:false
    });
    const resetMail = async () =>{
        setLoading({
            loadingLogin:true
        })
        await firebase.auth().sendPasswordResetEmail(email).then(() => {
            Alert.alert("Validé","on vous enverra un mail dans un instant");
            navigation.goBack();
        }).catch((error) => {
            Alert.alert("Erreur","adresse e-mail non valide ");
            setLoading({
                loadingLogin:false
            })
        })
        setLoading({
            loadingLogin:false
        })   
    }
    return(
        <>
            <StatusBar backgroundColor='#232654' barStyle="light-content"/>
            {loading.loadingLogin?
                <ActivityIndicator size="large" color="black" style={{flex:1,justifyContent:'center',backgroundColor:'#fff'}}/>
                :
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.text_header}>Avez-vous oublié votre mot de passe?</Text>
                    </View>
                    
                    <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                        <ScrollView>
                            <Text style={[styles.text_header,{color:'#000',fontSize:20,marginBottom:50}]}>Veuillez suivre nos instructions</Text>
                            <Text style={styles.text_footer}>Mettez votre adress e-mail</Text> 
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="user-o"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput 
                                    placeholder="Adress électronic"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={txtEmail => onchangeEmail(txtEmail)}
                                /> 
                            </View>
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={[styles.signIn,{marginTop:30,backgroundColor:'#232654'}]}
                                    onPress = {resetMail}
                                >
                                    <Text style={[styles.textSign, {color:'#fff'}]}>Initialisez le mot de passe</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                    style={[styles.signIn, {
                                        borderColor: '#ec454a',
                                        borderWidth: 1,
                                        marginTop: 15
                                    }]}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#ec454a'
                                    }]}>Retour</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Animatable.View>
                </View>
            }
        </>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#232654'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: '#05375a'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });
export default forgotPassword