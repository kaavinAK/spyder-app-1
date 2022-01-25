import { View, Text } from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import AlarmHome from '../pages/Alarm'
import Setalarm from '../pages/Setalarm'
let Alarmstack = createStackNavigator()

export default function AlarmStack() {

  return <>
  
      <Alarmstack.Navigator screenOptions={{
        headerShown:false
      }}>
          <Alarmstack.Screen  name="AlarmHome"  component={AlarmHome}/>
          <Alarmstack.Screen  name="Setalarm" component={Setalarm}  />
      </Alarmstack.Navigator>

  </>
}
