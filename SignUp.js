import * as React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, View, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import StatusBarBackground from './StatusBarBackground'

export class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      residence_name: '',
      address: '',
      name: '',
      roomName: ''
    }
  }

  handleResidenceName = (text) => {
    this.setState({ residence_name: text })
  }

  handleAddress = (text) => {
    this.setState({ address: text })
  }

  handlePersonName = (text) => {
    this.setState({ name: text })
  }

  createAccount = () => {

    var self = this;

    axios.post('http://127.0.0.1:8000/residence/', {
        residence_name: this.state.residence_name,
        address: this.state.address,
    })
    .then(function (response) {
      console.log(response);
      self.forceUpdate();
      Alert.alert("Account created successfully");
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert("Account creation failed.");
    });
  }

  updateName = () => {
    var self = this;

    axios.patch('http://127.0.0.1:8000/persons/1/', {
      person_name: this.state.name,
    })
    .then(function (response){
      console.log(response);
      self.forceUpdate();
    })
    .catch(function (error){
      console.log(error);
    })
  }

  updateRoom = () => {
    var self = this;
    roomName = this.state.name + "'s Room";

    axios.patch('http://127.0.0.1:8000/room/1/', {
      room_name: roomName,
    })
    .then(function (response){
      console.log(response);
      self.forceUpdate();
    })
    .catch(function (error){
      console.log(error);
    })
  }

  render(){
    return (
      <ScrollView style={styles.signUpView}>
          <View>
            <StatusBarBackground />
          </View>
          <View styles={styles.centeredView}>
            <Text style={styles.titleText}>(DO ONLY ONCE)</Text>
            <Text style={styles.titleText}></Text>
            <Text style={styles.titleText}>Your Name:</Text>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Enter Name"
                placeholderTextColor = "#000000"
                autoCapitalize = "none"
                onChangeText = {this.handlePersonName}
                textAlign='center'
              />

            <Text style={styles.titleText}>Residence Name:</Text>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Enter Residence Name"
                placeholderTextColor = "#000000"
                autoCapitalize = "none"
                onChangeText = {this.handleResidenceName}
                textAlign='center'
              />
      
            <Text style={styles.titleText}>Address:</Text>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Enter Address"
                placeholderTextColor = "#000000"
                autoCapitalize = "none"
                onChangeText = {this.handleAddress}
                textAlign='center'
              />

              <View style={styles.centeredView}>
                <Button
                icon={<AntDesign name="pluscircleo" size={15} color="white" />}
                title="Create account"
                onPress={ 
                  () => {this.updateName(); this.updateRoom(); this.createAccount();} 
                }
                buttonStyle={{
                  backgroundColor: "#BA4048",
                  borderRadius: 9,
                  height: 46,
                  width: 290,  
                  alignItems: "center",
                }}
              />
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  input: {
      margin: 15,
      height: 40,
      borderColor: '#000000',
      borderWidth: 1
  },
  signUpView: {
    flex: 1, 
    padding: 20,
  },
});