// React Native NetInfo
// https://aboutreact.com/react-native-netinfo/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';

import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [netInfo, setNetInfo] = useState('');
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(
        `Connection type: ${state.type}
        Is connected?: ${state.isConnected}
        IP Address: ${state.details.ipAddress}`
      );
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          React Native NetInfo
          To Get NetInfo information
        </Text>
        <Text style={styles.textStyle}>
          {/*Here is NetInfo to get device type*/}
          {netInfo}
        </Text>
        <Button title="Get more detailed NetInfo" onPress={getNetInfo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    paddingVertical: 20,
  },
});

export default App;
