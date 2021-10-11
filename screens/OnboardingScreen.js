import React from "react";
import { StyleSheet, Image, Dimensions, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Swiper from "react-native-swiper";
// import AppLoading from "expo-app-loading";


const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;


const App = ({navigation}) => {


  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // } else {
  return (
      <Swiper
        buttonWrapperStyle={{
          backgroundColor: "transparent",
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          left: 0,
          flex: 1,
          paddingHorizontal: 30,
          paddingVertical: 20,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
        style={styles.wrapper}
        showsButtons={true}
        paginationStyle={{
          marginRight: w * 0.7,
          marginBottom: h * 0.02,
        }}
        activeDotColor="#8A56AC"
        dotColor="#998FA2"
        nextButton={
          <View
            style={{
              height: 60,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              backgroundColor: "#8A56AC",
            }}
          >
            <AntDesign name="arrowright" size={22} color="#FFF" onPress={() => navigation.navigate('SignInScreen')}/>
          </View>
        }
        prevButton={
          <>
          </>
        }
      >
        <View style={styles.slide}>
          <Image source={require("../assets/image1.png")} style={styles.img} />
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.text}>
            When I was 5 years old, my mother always told me that happiness was
            the key to life. When I went to school, they asked me what I wanted
            to be when I grew up.
          </Text>
        </View>
      </Swiper>
  );
  // }
};

export default App;


const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingTop: 80,
    marginHorizontal: 30,
  },
  img: {
    alignSelf: "center",
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    height: h * 0.5,
    width: w * 0.9,
  },
  title: {
    //ontFamily: "Montserrat_700Bold",
    marginTop: 60,
    marginHorizontal: 10,
    fontSize: 32,
  },
  text: {
    color: "#767676",
    //fontFamily: "Montserrat_400Regular",
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
    marginLeft: 10,
  },
});