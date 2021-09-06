import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Task from './comp/task';

export default function App() {
  const [task,setTask] = useState();

  const [taskItems,setTaskItems] = useState([])

  const addTask = () => {
    setTaskItems([...taskItems,task]);
    setTask(null);
    Keyboard.dismiss();
  }

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      
      <View style={styles.taskWrapper}>
        <Text style={styles.title}>Today's tasks</Text>

        <View style={styles.items}>
          
          {taskItems.map((item,index)=>{
            return (
              <TouchableOpacity key={index} onPress={()=>{deleteTask(index)}}>
                <Task key={index}>{item}</Task>
              </TouchableOpacity>
            )
            
          })}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS==='ios'?'padding':'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder='Write a task' value={task} onChangeText={text => setTask(text)}></TextInput>
        <TouchableOpacity onPress = {addTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20,
  },
  title:{
    fontSize:24,
    fontWeight:'bold'
  },
  items:{
    marginTop:20
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    justifyContent:'space-around',
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  },
  input:{
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    backgroundColor:'white',
    borderRadius:60,
    borderColor:'#c0c0c0'
  },
  addWrapper:{
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center'
  },
  addText:{

  },
});
