import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
  SafeAreaView,
  ScrollView,
  Switch
} from 'react-native';
import { VictoryChart, VictoryGroup, VictoryTheme, VictoryLine } from 'victory-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBBWbhF64yMvIe37PO8BwVfvrhwqOM6PYk",
  authDomain: "heart-disease-project.firebaseapp.com",
  projectId: "heart-disease-project",
  storageBucket: "heart-disease-project.appspot.com",
  messagingSenderId: "26359258609",
  appId: "1:26359258609:web:8a49acb033b6ab4a277850",
  measurementId: "G-XWZL8JR3LR"
};

var firebaseApp;

if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else {
  firebaseApp = firebase.app();
}

const db = firebaseApp.firestore();

var appname = 'HDPA';
var hf_sentiment = 'negative';
var chance_of_heart_disease = 0.72380704;
var chol_level = 120;
var bpm = 80;
var hd_data = [
  {x:'5:03', y:0.72355574},
  {x:'5:08', y:0.7235084},
  {x:'5:13', y:0.7236245},
  {x:'5:18', y:0.7238984},
  {x:'5:23', y:0.7239612},
  {x:'5:28', y:0.7233901},
  {x:'5:33', y:0.7236074},
  {x:'5:38', y:0.7236031},
  {x:'5:43', y:0.72387886},
  {x:'5:48', y:0.72380704}
];

var chol_data = [
  {x:'5:03', y:113},
  {x:'5:08', y:115},
  {x:'5:13', y:124},
  {x:'5:18', y:123},
  {x:'5:23', y:119},
  {x:'5:28', y:118},
  {x:'5:33', y:116},
  {x:'5:38', y:117},
  {x:'5:43', y:119},
  {x:'5:48', y:120}
];

var bpm_data = [
  {x:'5:03', y:74},
  {x:'5:08', y:67},
  {x:'5:13', y:61},
  {x:'5:18', y:82},
  {x:'5:23', y:91},
  {x:'5:28', y:57},
  {x:'5:33', y:73},
  {x:'5:38', y:71},
  {x:'5:43', y:86},
  {x:'5:48', y:80}
];


function inputPage({ navigation }) {
  const [age, setAgeInputValue] = React.useState('');
  const [sex, setSexInputValue] = React.useState('');
  const [fbs, setfbsInputValue] = React.useState('');
  const [bp, setbpInputValue] = React.useState('');
  const [cp, setcpInputValue] = React.useState('');

  return ( 
    <View style={styles.container}>
      <Text style={{paddingBottom: 30, fontSize: 40}}>{appname}</Text>
      <Text style={styles.att_text}>Age</Text>
      <TextInput style={styles.att_input}  placeholder="Enter your age"
        onChangeText={text => {setAgeInputValue(text)}}
        defaultValue={age}
      />
      <Text style={styles.att_text}>Sex</Text>
      <TextInput style={styles.att_input} placeholder="Enter your gender (M/F)"
        onChangeText={text => {setSexInputValue(text)}}
        defaultValue={sex}
      />
      <Text style={styles.att_text}>Fasting Blood Sugar</Text>
      <TextInput style={styles.att_input} placeholder="Enter your FBS" 
        onChangeText={text => {setfbsInputValue(text)}}
        defaultValue={fbs}
      />
      <Text style={styles.att_text}>Blood Pressure</Text>
      <TextInput style={styles.att_input} placeholder="Enter your BP"
        onChangeText={text => {setbpInputValue(text)}}
        defaultValue={bp}
      />
      <Text style={styles.att_text}>Chest pain at least once a day?</Text>
      <Switch
        onChange={(val) => {cp = val}}
        onValueChange={() => {console.log('switch!')}}
      />
      <Button style={{ marginTop: 40 }} title="Start Measuring" onPress={() => navigation.navigate('Stats')} />
    </View>
  );
}

function statPage() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.desc_text}>Prediction of heart disease: {hf_sentiment}</Text>
        <Text style={styles.val_text}>{chance_of_heart_disease*100 + '%'}</Text>
        <VictoryGroup theme={VictoryTheme.material}>
          <VictoryChart>
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
              }}
              data={hd_data}
            />
          </VictoryChart>
        </VictoryGroup>
        <Text style={styles.desc_text}>Cholesterol Level</Text>
        <Text style={styles.val_text}>{chol_level + ' mg/dl'}</Text>
        <VictoryGroup theme={VictoryTheme.material}>
          <VictoryChart>
            <VictoryLine
              style={{
                data: { stroke: "#2f77c4" },
                parent: { border: "1px solid #ccc"}
              }}
              data={chol_data}
            />
          </VictoryChart>
        </VictoryGroup>
        <Text style={styles.desc_text}>Heart Rate</Text>
        <Text style={styles.val_text}>{bpm + ' bpm'}</Text>
        <VictoryGroup theme={VictoryTheme.material}>
          <VictoryChart>
            <VictoryLine
              style={{
                data: { stroke: "#388f13" },
                parent: { border: "1px solid #ccc"}
              }}
              data={bpm_data}
            />
          </VictoryChart>
        </VictoryGroup>
      </ScrollView>
    </SafeAreaView>
  );
}

const stack = createStackNavigator();

export default function App() {  
  return(
    <NavigationContainer>
      <stack.Navigator initialRouteName="Input">
        <stack.Screen name="Input" component={inputPage}/>
        <stack.Screen name="Stats" component={statPage}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  apptitle: {
    fontSize: 32,
    position: 'absolute',
    top: 60,
  },
  att_input: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7f8581',
    paddingLeft: 10,
    fontSize: 20,
    height: 50
  },
  att_text: {
    fontSize: 25,
    paddingTop: 20
  },
  desc_text: {
    paddingLeft: 50,
    paddingTop: 65
  },
  val_text: {
    paddingLeft: 50,
    fontSize: 35
  }
});