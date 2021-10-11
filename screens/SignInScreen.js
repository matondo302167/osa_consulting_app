import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Image,
    Animated,
    Modal,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import firebase from '../Firebase/firebaseConfig';
import { useTheme } from 'react-native-paper';


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


const SignInScreen = ({navigation}) => {
     
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        loadingLogin: false,
        notVerified: false
    });
    const [visible, setVisible] = React.useState(false);
    const { colors } = useTheme();

    //Gesture TextInput
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
                        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                            <Image
                                source={require('../assets/x.png')}
                                style={{height: 30, width: 30}}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('../assets/wrong-circle.png')}
                        style={{height: 150, width: 150, marginVertical: 10}}
                    />
                </View>
                <Text style={{marginVertical:30, fontSize:20, textAlign: 'center'}}>
                    {data.notVerified?  "email non vérifié Veuillez de cliquer sur le lien envoyé par cet addresse" : "mot de passe ou e-mail incorrect"}
                </Text>
            </>
        );
    }

    //Login function
    const loginHandle = async () => {
        setData({...data,loadingLogin:true})
        setVisible(true)
        firebase
            .auth()
            .signInWithEmailAndPassword(data.username.trim(),data.password.trim())
            .then((authUser) => {
                if(authUser.user.emailVerified){ //This will return true or false
                    setVisible(false)
                    navigation.navigate('Home',{
                        screen: 'HomeScreen'
                    });
                }else{
                    setData({...data, notVerified: true})
                    setData({...data,loadingLogin:false})
                }
                console.log('email is verified')
                
            })
            .catch((error) =>{
                console.log("all right: non")
                setData({...data,loadingLogin:false})
            })
            
            
    } 

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#232654' barStyle="light-content"/>
        <ModalPoup visible={visible}>
            {data.loadingLogin? <ActivityIndicator size="large" color="#232654" />  :  <ModalChildren />}
        </ModalPoup>
        <View style={styles.header}>
            <Text style={styles.text_header}>Accedez!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>E-mail</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Votre email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
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
                color: colors.text,
                marginTop: 35
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
            <Text style={styles.errorMsg}>le mot de passe doit avoir au moins 8 characters</Text>
            </Animatable.View>
            }
            
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={{color: '#ec454a', marginTop:15}}>mot de passe oublié?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    onPress={loginHandle}
                    style={[styles.signIn, {
                        backgroundColor:'#232654',
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#FFF'
                    }]}>Accedez</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#ec454a',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#ec454a'
                    }]}>Enresgistrez-vous</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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
        flex: 3,
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

  });