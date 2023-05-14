import { StatusBar, SafeAreaView, StyleSheet, Text, View, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import ShoppingItem from './components/ShoppingItem';
import { MaterialIcons } from '@expo/vector-icons';
import { app, db, getFirestore, collection, addDoc, getDocs } from './firebase/index'

export default function App() {
  const [title, setTitle] = useState("");
  const [shoppingList, setShoppingList] = useState([]);
  
  const addShoppingItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        title: title,
        isChecked: false,
      });
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getShoppingList = async () => {
    try{
    const querySnapshot = await getDocs(collection(db, "shopping"));
    const tempList = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      tempList.push({
        ...doc.data(),
        id: doc.id,
      })
    });
    setShoppingList(tempList);
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
  }
  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#000' />
      <View style={styles.header}>
        {/* heading */}
        <Text style={styles.heading}> Shopping List </Text>
        {/* no of shopping items */}
        <Text style={styles.noOfItems}>1</Text>
        {/* delete all */}
        <Pressable>
          <MaterialIcons name="delete" size={30} color="#800" />
        </Pressable>
      </View>
      {/** Flatlists */}
      {
        shoppingList.length > 0 
        ? (<FlatList
          data={shoppingList}
          renderItem={({item}) => <ShoppingItem title={item.title}/>}
          keyExtractor={item=> item.id}
          />)
        : (
          <ActivityIndicator />
        
      )}
      {/* Campo de Texto */}
      <TextInput
        placeholder='Digite o item...'
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addShoppingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,

  },
  header: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    color: '#778899',
    fontWeight: '500',
    flex: 1,
  },
  noOfItems: {
    color: '#778899',
    fontSize: 30,
    fontWeight: '500',
    marginRight: 20,
  },
  input: {
    padding: 10,
    borderRadius: 10,
    fontSize: 17,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#778899',
    marginTop: 'auto',
    marginBottom: 10,
  }
});
