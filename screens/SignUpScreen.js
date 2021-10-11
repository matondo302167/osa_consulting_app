import React from 'react';
import { 
    View, 
    Text,  
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    TouchableWithoutFeedback,
    Image,
    Modal,
    Animated,
    ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';
import firebase from '../Firebase/firebaseConfig';

const SignInScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [visible, setVisible] = React.useState(false);
    const [data, setData] = React.useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        message: '',
        check_textInputChange: false,
        check_textInputChangeName: false,
        check_textInputChangeSurname: false,
        secureTextEntry: true,
        isValidName: true,
        isValidSurname: true,
        isValidUser: true,
        isValidPassword: true,
        loadingLogin: false,
        allValids: false,
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

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    //ModalChildren
    const ModalChildren = () => {
        return(
            <>
                <View style={{alignItems: 'center'}}>
                    <View style={[styles.header,{height: 30,alignItems: 'flex-end',justifyContent: 'center',}]}>
                        <TouchableWithoutFeedback onPress={() => {data.allValids? navigation.goBack() : setVisible(false)}}>
                            <Image
                                source={require('../assets/x.png')}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    {data.allValids?   
                        <Image
                            source={require('../assets/success.png')}
                            style={{height: 150, width: 150, marginVertical: 10}}
                        />
                        :
                        <Image
                            source={require('../assets/wrong-circle.png')}
                            style={{height: 150, width: 150, marginVertical: 10}}
                        />
                    }
                </View>
                <Text style={{marginVertical:30, fontSize:20, textAlign: 'center'}}>{data.message}</Text>
            </>
        );
    }
    
    //Create ACCOUNT  if (data.isValidName && data.isValidSurname && data.isValidPassword)
    const createAccount =  () => {
        setData({...data, loadingLogin:true})
        if (data.check_textInputChangeName && data.check_textInputChangeSurname && data.isValidPassword) {
            console.log("début: " ,data.isValidName,data.isValidSurname,data.isValidPassword)
            firebase
            .auth()
            .createUserWithEmailAndPassword(data.username.trim(),data.password.trim())
            .then((authUser) => {

                authUser.user.sendEmailVerification().then(function() {
                    // Email sent.
                    setData({
                        ...data,
                        allValids: true,
                        message: 'mail envoyé avec succès à ' + authUser.user.email,
                    })

                    firebase.firestore().collection('Studente').doc(authUser.user.uid).set({
                        Prenom: data.name,
                        Nom: data.surname,
                        E_mail: data.username,
                        Bourse: '',
                        Inscription: '',
                        Paiement: '',
                        ImageUrl: '',
                        Telephone: '',
                        pack_choisi: ''
                    })
                    
                   firebase.database().ref('/Studente/'+authUser.user.uid).set({
                        Prenom: data.name,
                        Nom: data.surname,
                        E_mail: data.username,
                        Telephone: "",
                        ImageUrl: "",
                        payer: "",
                    })
                    
            
                }).catch(function(error) {
                    // An error happened.
                    setData({
                        ...data,
                        message: error
                    })
                });
                setData({...data, loadingLogin:true})
            })
            .catch((error) =>{
                if (error.code === 'auth/invalid-disabled-fiel') {
                    setData({
                        ...data,
                        message: 'assurez-vous que vous avez tout rempli'
                    })
                }
                else if (error.code === 'auth/email-already-in-use') {
                    setData({
                        ...data,
                        message: 'adress e-mail déjà utilisé'
                    })
                }
                else if (error.code === 'auth/invalid-email') {
                    setData({
                        ...data,
                        message: 'adress e-mail non existant'
                    })
                }
                else if (error.code === 'auth/invalid-password') {
                    setData({
                        ...data,
                        message: 'password faible'
                    })
                }
                else{
                    setData({
                        ...data,
                        message: 'données inserés sont incorects'
                    })
                }

            })
        }else{
            setData({
                ...data,
                message: "Vérifiez d'avoir inséré les données corrects"
            })
        }
        //lebabenny@gmail.com
        setVisible(true) 
    } 

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#232654' barStyle="light-content"/>
          <ModalPoup visible={visible}>
            {data.loadingLogin?<ActivityIndicator size="large" color="#678ff0" />  :  <ModalChildren />}
        </ModalPoup>
        <View style={styles.header}>
            <Text style={styles.text_header}>Enregistrez-vous!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Prénom</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Votre prénom"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeName(val)}
                />
                {data.check_textInputChangeName ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidName ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Prénom invalide</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer,{marginTop:28}]}>Nom</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Votre nom"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChangeSurname(val)}
                />
                {data.check_textInputChangeSurname ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidSurname ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Nom invalide</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer,{marginTop:28}]}>E-mail</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Votre email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>email doit avoir plus de 4 characters</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 28
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Votre mot de passe"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>le mot de passe doit avoir plus de 8 characters</Text>
            </Animatable.View>
            }

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    en vous inscrivant, vous acceptez nos
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>conditions d'utilisations</Text>
                <Text style={styles.color_textPrivate}>{" "}et</Text>
                <Text 
                    style={[styles.color_textPrivate, {fontWeight: 'bold'}]} 
                    onPress={()=>{Linking.openURL(privacy_link)}}
                >
                    {" "}notre politique de
                </Text>
                <Text 
                    style={[styles.color_textPrivate, 
                    {fontWeight: 'bold'}]}
                    onPress={()=>{}}
                >
                    confidentialité.
                </Text>
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    onPress={createAccount}
                    style={[styles.signIn, {
                        backgroundColor:'#232654',
                        marginTop: 5
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FFF'
                    }]}>Enregistrez-vous</Text>
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
    );
};

export default SignInScreen;

//MODAL
const ModalPoup = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
      toggleModal();
    }, [visible]);
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                style={[styles.modalContainer, {transform: [{scale: scaleValue}]}]}>
                {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#232654',
      marginTop: -20
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        marginTop: Platform.OS === 'ios' ? -40 : -30,
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
        marginTop: 10,
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
        marginTop: 50
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
        marginTop: 15,
        marginBottom: -40
    },
    color_textPrivate: {
        color: 'grey'
    },
    modalBackGround: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
});