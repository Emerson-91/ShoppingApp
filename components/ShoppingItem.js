import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign,MaterialIcons } from '@expo/vector-icons';

// shopping object 
/*
    1. id
    2. title
    3. isChecked

*/

const ShoppingItem = (props) => {
  return (
    <View style={styles.container}>
        {/* Checked icon */}
        <Pressable>
            <AntDesign name="checkcircleo" size={24} color="black" />
        </Pressable>
        {/* shopping Text */}
        <Text style={styles.title}>{props.title}</Text>
        {/* Deleted Button */}
        <Pressable>
            <MaterialIcons name="delete" size={24} color="#800" />
        </Pressable>

    </View>
  )
}
export default ShoppingItem;

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        flexDirection:'row',
        backgroundColor:'#483D8B',
        justifyContent:'space-between',
        padding:10,
        alignItems:'center',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
    },
    title:{
        color:'#FFF',
        flex:1,
        marginLeft:10,
        fontSize:17,
        fontWeight:'500',
    }
})