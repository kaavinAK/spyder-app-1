import { View, Text, ScrollView,StyleSheet, Button, Alert } from 'react-native';
import React, { useState,useRef } from 'react';
import Asyncstorage from '@react-native-async-storage/async-storage'
import { createAlarm } from 'react-native-simple-alarm';
let styles = StyleSheet.create({
    fullview:{
        display: 'flex',
        flexDirection:'row',
        paddingTop:'15%',
        paddingLeft:'10%',
        height: '50%',
        borderColor:'yellow',
        borderWidth:1,
        marginTop:'1%'
    },
    minutescroll:{
        height:"60%"
    },
    hourscroll:{
        height:'60%'
    },
    number:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    },
    submitbutton:{
        backgroundColor:'red'
    },
    anumber:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:'blue'
    },
    time:{
borderColor:'yellow',
borderWidth:1,
height: '30%',
display: 'flex',
flexDirection:'row',
alignItems:'center',
paddingLeft:'20%'
    },
    timehour:{
        fontSize:55,
        padding:'3%'
      
    },
    timeminute:{
fontSize:55
    },
    timetimezone:{
fontSize:55
    }
})
export default function Setalarm({navigation,route}) {
    let [hour,sethour]=useState('00')
    let [minute,setminute]=useState('00')
    let [timezone,settime]=useState('AM')
    let hours=[];
    

    for(let i=0;i<=12;i++)
    {
        if(i<10)
        {
            hours.push('0'+i)
        }
        else
        {
            hours.push(i.toString())
        }
        
    }
    let minutes=[]
    for(let i=0;i<=60;i++)
    {
        
        if(i<10)
        {
            minutes.push('0'+i)
        }
        else
        {
            minutes.push(i.toString())
        }
    }
    let submit=async()=>
    {
        
        let data= {
            hour,minute,timezone,active:true,id:route.params.alarms.length
        }
        console.log('beruh-----',data,'----',route.params.alarms)
        data=[...route.params.alarms,data]
        console.log(data)
        data=JSON.stringify(data)
        console.log(data)
        try{
            await  Asyncstorage.setItem('alarms',data)
            
                await createAlarm({
                    active: false,
                    date: moment().format(),
                    message: 'message',
                    snooze: 1,
                    id:route.params.alarms.length
                  });
             Alert.alert("alarm is created using function ... ")
     
        }
        catch(e)
        {
console.log('error man e------- ',e)
        }
         navigation.push('AlarmHome',{
                 action:'alarmadded'
             
         })
    }
    console.log('hour----',hour,'---minute-----',minute);

  return (
      <>
      <View style={styles.time}>

          <Text style={styles.timehour}>{hour}</Text>
          <Text style={{fontSize:55,padding:'3%'}}>:</Text>
         
          <Text style={styles.timeminute}>{minute}</Text>
          <Text style={{fontSize:55,padding:'3%'}}></Text>
         
          <Text style={styles.timetimezone}>{timezone?timezone:''}</Text>
      </View>
    <View style={styles.fullview}>
      <ScrollView style={styles.hourscroll}>
          {
             hours.map(num=>
                {
                    
                    return <>
                    {hour==num?<Text style={styles.anumber} onPress={()=>{
                        
                        sethour(num)}}>{num}</Text>:
                    <Text  style={styles.number} onPress={()=>{
                        
                        sethour(num)}}>{num}</Text>}
                    </>
                })
          }
      </ScrollView>
      <ScrollView style={styles.minutescroll}>
           {
               minutes.map(num=>
                {
                    return <>
                    {minute==num?<Text style={styles.anumber} onPress={()=>{
                        
                        setminute(num)}}>{num}</Text>:<Text style={styles.number} onPress={()=>{
                        
                            setminute(num)}}>{num}</Text>}
                   
                    </>
                })
           }
      </ScrollView>
      <ScrollView>
              <Text style={styles.number} onPress={()=>{settime('AM')}} >AM</Text>
              <Text style={styles.number} onPress={()=>{settime('PM')}} >PM</Text>
      </ScrollView>
     
    </View>
    
     <Button style={styles.submitbutton} title='set Alarm' onPress={submit} />
  
     </>
  );
}
