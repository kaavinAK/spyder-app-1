import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import { List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { Switch } from 'react-native-paper';
import Asyncstorage from '@react-native-async-storage/async-storage'
import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment'

const MySwitch = ({size,id,hour,minute,timezone}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  React.useEffect(()=>
  {
           Asyncstorage.getItem('alarms',async(err,result)=>
           {
             
             if(result)
             {
              result=JSON.parse(result)
              result=result.map(alrm=>
                {
                  console.log("inside --- ",alrm,id)
                  if(alrm.id==id)
                  {
                    if(isSwitchOn)
                    {
                      
                      Alert.alert("alarm is active ",id.toString())
                        return {
                          ...alrm,active:true
                        }
                    }
                    else
                    {
                      Alert.alert("alarm is disabled "+id.toString())
                         return {
                           ...alrm,active:false
                         }
                    }
                  }
                  else
                  {
                    return {
                      ...alrm
                    }
                  }
                })
                result=JSON.stringify(result)
                await Asyncstorage.setItem('alarms',result)
             }
           })
          
  },[isSwitchOn])

  return <Switch color={'#EE82EE'} thumbColor={'#720e9e'}  trackColor={{false:"#E6E6FA",true:"#720e9e"}} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} value={isSwitchOn} onValueChange={onToggleSwitch} />;
};



const MyComponent = ({hour,minute,timezone,style,id}) => {
return <>

  <List.Item
    title={props=><Text style={{
        fontSize:35,
        color: 'white'
    }}>{hour+":"+minute+" "+timezone}</Text>}
    description=""
    left={props =>{props.color=timezone=='PM'?'yellow':'#E1EBEE'
        return <>{timezone=='PM'?<Icon color={'blue'}  size={50} {...props} name="partly-sunny"/>:<Icon color='white' size={50} {...props} name="cloudy-night"/>}</>}}
    right={props=><MySwitch  size={20} id={id} hour={hour} minute={minute} timezone={timezone}/>}
    style={{
        padding: 30,
        fontSize:10,
        backgroundColor:'#1A2228'
    }}
    id={id}
/>

</>    
  
};

export default MyComponent;