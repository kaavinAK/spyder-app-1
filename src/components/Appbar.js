
import React from "react";
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native'
import { VStack, HStack, Button, IconButton, NativeBaseProvider, Center, Box, StatusBar,AddIcon } from "native-base";
//import { MaterialIcons } from '@expo/vector-icons';
//import {MaterialIcons} from 'react-native-vector-icons'
import Icon from 'react-native-vector-icons/AntDesign';
let styles = StyleSheet.create({
plusbutton:{
   
alignSelf:'flex-end',


paddingLeft:'70%',
paddingTop:'5%'
},
Alarmtitle:{
color:'white',
fontSize:25,
fontWeight:'bold',
alignSelf:'flex-start',

paddingTop:'3%',
paddingLeft:'3%'

},
containerBox:{
    backgroundColor:'#16161d',
    width: '100%',
    height: '10%',
    display: "flex",
    flexDirection:'row',
   
  
    
    
}
})
export default function AppBar({setalarms,alarms,navigation}){
    let addalarmpage=()=>
    {
      console.log("alarms now ---- ",alarms)
          navigation.push('Setalarm',{
            alarms
          })
    }
  return <>
  <View style={styles.containerBox}>
<Text style={styles.Alarmtitle} >Alarm</Text>
<TouchableOpacity style={styles.plusbutton} onPress={addalarmpage}>
<NativeBaseProvider>

      
      <AddIcon size='6' color='white' />
    
    </NativeBaseProvider>
    </TouchableOpacity>
 
  </View>
  </>
}

