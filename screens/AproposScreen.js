import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  Linking,
} from 'react-native'
// Import react-native-vector-icons
// from "https://github.com/oblador/react-native-vector-icons"
import { FontAwesome5,Entypo} from '@expo/vector-icons';

// Import react-native-reanimated
// from "https://github.com/software-mansion/react-nativ
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated

const Apropos = () => {
  return(
    <SafeAreaView style={styles.safe_area_view}> 
        <Animated.ScrollView contentContainerStyle={{padding:20}}>
          <Text style={styles.heading}>OSA Consulting</Text>

          <Text style={styles.paragraph}>
            est une structure spécialisée dans l'orientation, le soutien et l'assistance 
            aux élèves et étudiants qui désirent suivre une formation universitaire en Italie.{'\n'}
            Étudier à l'étranger peut s'avérer très fastidieux si l'on ignore les bonnes démarches à suivre.{'\n'} 
            OSA Consulting se définit ainsi comme un repère pour l'étudiant 
            qui l'encadre dans le choix de sa faculté, la procédure d'inscription, 
            la recherche de logement, l'obtention du titre de séjour et bien d'autres.{'\n'}
            Nous sommes basés en Italie et proposons nos services principalement dans les villes de Parme, 
            Sienne, Florence et Rome.
          </Text>

          <View style={[styles.fake_post, {backgroundColor: '#a1da68',marginBottom:10}]} />

          <Text 
            style={{fontSize:20,fontWeight:'bold',alignItems:'center',left:20,marginBottom:20,color:'#fff'}}>
            Suivez-nous sur les résaux sociaux
          </Text>

          <View style={styles.menuItem}>
            <Entypo name="facebook" color="#00f" size={20}/>
            <Text style={styles.menuItemText}
              onPress={() => Linking.openURL("https://www.facebook.com/profile.php?id=100063756371568")}
            >
              facebook.com/
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Entypo name="instagram" color="#987190" size={20}/>
            <Text style={styles.menuItemText}
              onPress={() => Linking.openURL("https://www.instagram.com/osaconsultinggabonitalie/")}
            >
              instagram.com/osaconsultinggabonitalie/
            </Text>
          </View>
          <View style={styles.menuItem}>
            <FontAwesome5 name = "linkedin" size = {24} color = "#23a4df" />
            <Text style={styles.menuItemText}
              onPress={() => Linking.openURL("https://www.linkedin.com/in/osa-consulting-396378207")}
            >
              linkedin.com/in/osa-consulting-396378207
            </Text>
          </View>

          <View style={styles.menuItem}>
            <FontAwesome5 name = "whatsapp" size = {24} color = "#0f0" />
            <Text style={styles.menuItemText}
              onPress={() => Linking.openURL("https://chat.whatsapp.com/B4g9BTKEotu1pxG11APsmh")}
            >
              https://chat.whatsapp.com/
            </Text>
          </View>

          <View style={styles.menuItem}>
            <FontAwesome5 name = "globe" size = {24} color = "#000" />
            <Text style={styles.menuItemText}
              onPress={() => Linking.openURL("https://osaconsultingitaly.it")}
            >
              osaconsultingitaly.it
            </Text>
          </View>
          
          <View style={[styles.fake_post, {backgroundColor: '#23a4df',marginBottom:10}]} />
          
          <Text 
            style={{fontSize:20,fontWeight:'bold',alignItems:'center',left:20,marginBottom:20,color:'#fff'}}>
            Contactez-nous
          </Text>

          <View style={styles.menuItem}>
            <Entypo name = "mail" size = {24} color = "#23a4df" />
            <Text style={styles.menuItemText}
              onPress={() => {}}
            >
              osaconsulting.contact@gmail.com
            </Text>
          </View>
          
          <View style={[styles.fake_post, {backgroundColor: '#f7c378',marginBottom:10}]} />

          <Text 
            style={{fontSize:20,fontWeight:'bold',alignItems:'center',left:20,marginBottom:10,color:'gray'}}>
            Développeur
          </Text>

          <View style={styles.menuItem}>
            <Entypo name="user" color="gray" size={20}/>
            <Text style={styles.menuItemText}>Benison matondo simao{'\n\n'}</Text>
          </View>
  
        </Animated.ScrollView>
      </SafeAreaView>
  );
}
export default Apropos;
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  safe_area_view: {
    flex: 1,
    backgroundColor:'#fff'
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomColor:'#000',
  },
  menuItemText: {
    color: 'gray',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  fake_post: {
    height: 50,
    width:"100%",
    right:16,
    marginHorizontal: 16,
    marginTop: 16,
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
  heading: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
  },
})