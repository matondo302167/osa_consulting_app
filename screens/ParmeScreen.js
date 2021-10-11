import React, {useRef} from 'react';
import {View, StyleSheet,Text,ScrollView, Image, Animated} from 'react-native';
import { ParmeComponent } from '../Components/ParmeComponent';
import {BANNER_H} from '../Components/constants';
import TopNavigation from '../Components/TopNavigation';

const ParmeScreen = ({navigation}) => {
  const scrollA = useRef(new Animated.Value(0)).current;
  return (
    <View>
      <TopNavigation title="Parme" scrollA={scrollA} />
      <Animated.ScrollView
        // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.bannerContainer}>
          <Animated.Image
            style={styles.banner(scrollA)}
            source={require('../assets/parme.jpg')}
          />
        </View>
        <ParmeComponent/>
      </Animated.ScrollView>
    </View>
  );
};

const styles1 = StyleSheet.create({
  title:{
    margin:24,
    fontSize:20,
    color:'#ec454a',
    textAlign:'center',
    fontWeight:'bold',
  },
  image:{
    margin:24,
    fontSize:18,
    fontStyle:'italic',
    color:'#232654',
    fontWeight:'bold',
    marginBottom:-10
  },
  fake_post: {
    height: 250,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom:20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
})
const styles = StyleSheet.create({
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
});

export default ParmeScreen;