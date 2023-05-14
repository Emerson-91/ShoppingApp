import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { db, doc, updateDoc, deleteDoc  } from '../firebase/index'

// shopping object 
/*
    1. id
    2. title
    3. isChecked

*/

const ShoppingItem = (props) => {
    const [isChecked, setIsChecked] = useState(props.isChecked);

    const updateIsChecked = async () => {
        const shoppingRef = doc(db, "shopping", props.id);

        // Set the "isChecked" field
        await updateDoc(shoppingRef, {
            isChecked: isChecked,
        });
    }
    const deleteShoppingItem = async() => {
        await deleteDoc(doc(db, "shopping", props.id));
        props.getShoppingList();
    }

    useEffect(() =>{
       updateIsChecked(); 
    }, [isChecked])
    return (
        <View style={styles.container}>
            {/* Checked icon */}
            <Pressable onPress={() => setIsChecked(!isChecked)}>
                {
                    isChecked ? <AntDesign name="checkcircle" size={24} color="black" />
                        : <AntDesign name="checkcircleo" size={24} color="black" />
                }
            </Pressable>
            {/* shopping Text */}
            <Text style={styles.title}>{props.title}</Text>
            {/* Deleted Button */}
            <Pressable onPress={deleteShoppingItem}>
                <MaterialIcons name="delete" size={24} color="#800" />
            </Pressable>

        </View>
    )
}
export default ShoppingItem;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#483D8B',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    title: {
        color: '#FFF',
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontWeight: '500',
    }
})