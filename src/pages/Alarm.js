import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Appbar from '../components/Appbar'
import { useFocusEffect } from '@react-navigation/native';
import Asyncstorage from '@react-native-async-storage/async-storage'
import TimeItem from '../components/Alarmtimecard' 
export default function Alarm({navigation,route}) {
    let [alarms,setalarms]=useState([])
useFocusEffect(

  React.useCallback(()=>
  {
    Asyncstorage.getItem('alarms').then(value=>
      {
        console.log("alarms----- "+value)
        if(value)
        {
          console.log("alarms-----indie 0-----  "+value,'--------',JSON.parse(value))
          
          setalarms(JSON.parse(value))
   
        }
      })
  },[])
    
)
console.log("final alarm console ",alarms)
     
  return (
    <View style={{borderColor:'blue',borderWidth:1}}>
    <Appbar setalarms={setalarms} alarms={alarms} navigation={navigation}/>
    <View style={{borderColor:'green',borderWidth:1,height:'90%'}}>
    <ScrollView>
           {alarms.length>0?alarms.map(alarm=>
           {
             
               return <>
                      
                      <TimeItem style={{
       height: '60%',
       borderColor:'red',
       borderWidth:1
    }} hour={alarm.hour} minute={alarm.minute} timezone={alarm.timezone} id={alarm.id} />
               </>
           }):<Text>No Alarms Active</Text>}
    </ScrollView>
    </View>
    </View>
  );
}
