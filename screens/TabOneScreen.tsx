import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const axios = require('axios');

    axios.get('http://192.168.35.69:3000/users/list')
    .then(function (response: any) {
      setUsers(response.data)
    })
    .catch(function (error: any) {
      console.log(error);
    })

  }, [])

  const renderItem = ({ item }: any) => (
    <>
      <View style={styles.container}>
        <Text style={{fontSize: 30}}>{item.id}</Text>
        <Text style={{fontSize: 40}}>{item.firstName}</Text>
        <Text style={{fontSize: 40}}>{item.lastName}</Text>
      </View>
    </>
  );

  return (
    <View>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#fc0",
    marginBottom: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
