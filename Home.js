import * as React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TextInput, TouchableHighlight } from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import StatusBarBackground from './StatusBarBackground'
import {Picker} from '@react-native-picker/picker';


export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      room1: '',
      room2: '',
      room3: '',
      room4: '',
      room5: '',
      roommate1: '',
      roommate2: '',
      roommate3: '',
      roommate4: '',
      roommate5: '',
      guest1: '',
      guest2: '',
      guest3: '',
      guest4: '',
      guest5: '',
      testStatus1: '',
      testStatus2: '',
      testStatus3: '',
      testStatus4: '',
      testStatus5: '',
      roomNameToBeAdded: '',
      roommateName: '',
      email: '',
      status: '',
      address: '',
      residence_name: '',
      visitRoommate: '',
      visitRoom: '',
      visitGuest: '',
      visitingGuest1 : '',
      visitingGuest11 : '',
      visitingGuest2 : '',
      visitingGuest22 : '',
      visitingGuest3 : '',
      visitingGuest33 : '',
      visitingGuest4 : '',
      visitingGuest44 : '',
      visitingGuest5 : '',
      visitingGuest55 : '',
      visitingRoom1 : '',
      visitingRoom1 : '',
      visitingRoom2 : '',
      visitingRoom22 : '',
      visitingRoom3 : '',
      visitingRoom33 : '',
      visitingRoom4 : '',
      visitingRoom44 : '',
      visitingRoom5 : '',
      visitingRoom55 : '',
      visitingHousemate1 : '',
      visitingHousemate11 : '',
      visitingHousemate2 : '',
      visitingHousemate22 : '',
      visitingHousemate3 : '',
      visitingHousemate33 : '',
      visitingHousemate4 : '',
      visitingHousemate44 : '',
      visitingHousemate5 : '',
      visitingHousemate55 : '',
    }
  }

  componentDidMount(){
   this.getRoom()
   this.getRoommate()
   this.getAccount()
   this.getGuest()
   this.getVisits()
   this.translateGuest()
   this.translateHousemate()
   this.translateRoom()
   this.focusListener = this.props.navigation.addListener('focus', () => {
     this.getAccount();
     this.getVisits();
     this.getRoommate();
     this.getGuest();
     this.getRoom();
   })
  }

  componentDidUpdate(prevProps){
    if (this.props.residence_name !== prevProps.residence_name) {
      this.getAccount()
    }
    if (this.props.roommate2 !== prevProps.roommate2) {
      this.getRoommate()
    }
  }

  getRoom = () => {
    var self = this;

    {/* Update room list */}
    axios.get('http://127.0.0.1:8000/room/')
    .then(function (response) {
      console.log(response.data);
      self.setState({room1: response.data[0].room_name})
      self.setState({room2: response.data[1].room_name})
      self.setState({room3: response.data[2].room_name})
      self.setState({room4: response.data[3].room_name})
      self.setState({room5: response.data[4].room_name})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addRoom = () => {
    var self = this; 

    axios.post('http://127.0.0.1:8000/room/', {
      room_name: this.state.roomNameToBeAdded,
    })
    .then(function (response) {
      console.log(response);
      self.getRoom();
      self.forceUpdate();
      Alert.alert("Room successfully created");
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert("Room creation failed");
    });
  }

  handleCreateRoomName = (text) => {
    this.setState({ roomNameToBeAdded: text })
  }

  handleRoommateName = (text) => {
    this.setState({ roommateName: text })
  }

  handleEmail = (text) => {
    this.setState({ email: text })
  }

  handleStatus = (text) => {
    this.setState({ status: text })
  }

  getRoommate = () => {
    var self = this;

    axios.get('http://127.0.0.1:8000/housemates/')
    .then(function (response) {
      console.log(response.data);
      self.setState({roommate1: response.data[0].person_name})
      self.setState({testStatus1: '- ' + response.data[0].status})
      self.setState({roommate2: response.data[1].person_name})
      self.setState({testStatus2: '- ' + response.data[1].status})
      self.setState({roommate3: response.data[2].person_name})
      self.setState({testStatus3: '- ' + response.data[2].status})
      self.setState({roommate4: response.data[3].person_name})
      self.setState({testStatus4: '- ' + response.data[3].status})
      self.setState({roommate5: response.data[4].person_name})
      self.setState({testStatus5: '- ' + response.data[4].status})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addRoommate = () => {
    var self = this; 

    axios.post('http://127.0.0.1:8000/housemates/', {
      "person_name": this.state.roommateName,
      "status": this.state.status,
      "email": this.state.email,
      "guests": []
    })
    .then(function (response) {
      console.log(response);
      self.getRoommate();
      self.forceUpdate();
      Alert.alert("Roommate added successfully");
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert("Roommate failed to add");
    });
  }

  addVisit = () => {
    var self = this;

    var a = this.state.visitRoommate.slice(-1);
    if(this.state.visitRoommate.slice(-1) == ''){
      a = '1';
    }

    var b = this.state.visitRoom.slice(-1);
    if(this.state.visitRoom.slice(-1) == ''){
      b = '1';
    }

    var c = this.state.visitGuest.slice(-1);
    if(this.state.visitGuest.slice(-1) == ''){
      c = '1';
    }

    axios.post('http://127.0.0.1:8000/visit/', {
      "housemate": "http://127.0.0.1:8000/housemates/" + a + "/",
      "rooms": ["http://127.0.0.1:8000/room/" + b + "/"],
      "guests": ["http://127.0.0.1:8000/guests/" + c + "/"]
    })
    .then(function (response){
      console.log(response);
      self.getVisits();
      self.forceUpdate();
      Alert.alert("Visit logged successfully")
    })
    .catch(function (error){
      console.log(error);
    });
  }


  getAccount = () => {
    var self = this;
    
    axios.get('http://127.0.0.1:8000/residence/')
    .then(function (response) {
      console.log(response);
      self.setState({address: response.data[0].address});
      self.setState({residence_name: response.data[0].residence_name});
    })
    .catch(function (error) {
      console.log(error);
      
    });
  }

  getGuest = () => {
    var self = this;
    
    axios.get('http://127.0.0.1:8000/guests/')
    .then(function (response) {
      console.log(response);
      self.setState({guest1: response.data[0].person_name});
      self.setState({guest2: response.data[1].person_name});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getVisits = () => {
    var self = this;

    axios.get('http://127.0.0.1:8000/visit/')
    .then(function (response){
      console.log(response);
      self.setState({visitingHousemate1: response.data[0].housemate});
      self.setState({visitingRoom1: response.data[0].rooms[0]});
      self.setState({visitingGuest1: response.data[0].guests[0]});
      self.setState({visitingHousemate2: response.data[1].housemate});
      self.setState({visitingRoom2: response.data[1].rooms[0]});
      self.setState({visitingGuest2: response.data[1].guests[0]});
      self.setState({visitingHousemate3: response.data[2].housemate});
      self.setState({visitingRoom3: response.data[2].rooms[0]});
      self.setState({visitingGuest3: response.data[2].guests[0]});
      self.setState({visitingHousemate4: response.data[3].housemate});
      self.setState({visitingRoom4: response.data[3].rooms[0]});
      self.setState({visitingGuest4: response.data[3].guests[0]});
      self.setState({visitingHousemate5: response.data[4].housemate});
      self.setState({visitingRoom5: response.data[4].rooms[0]});
      self.setState({visitingGuest5: response.data[4].guests[0]});
    })
    .catch(function (error){
      console.log(error);
    });
  }

  translateHousemate = () => {
    var self = this;

    axios.get('http://127.0.0.1:8000/housemates/1/')
    .then(function (response){
      console.log(response);
      self.setState({visitingHousemate11: response.data.person_name + ' in'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/housemates/2/')
    .then(function (response){
      console.log(response);
      self.setState({visitingHousemate22: response.data.person_name + ' in'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/housemates/3/')
    .then(function (response){
      console.log(response);
      self.setState({visitingHousemate33: response.data.person_name + ' in'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/housemates/4/')
    .then(function (response){
      console.log(response);
      self.setState({visitingHousemate44: response.data.person_name + ' in'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/housemates/5/')
    .then(function (response){
      console.log(response);
      self.setState({visitingHousemate55: response.data.person_name + ' in'});
    })
    .catch(function (error){
      console.log(error);
    });
  }

  translateRoom = () => {
    var self = this;



    axios.get('http://127.0.0.1:8000/room/1/')
    .then(function (response){
      console.log(response);
      self.setState({visitingRoom11: response.data.room_name});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/room/2/')
    .then(function (response){
      console.log(response);
      self.setState({visitingRoom22: response.data.room_name});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/room/3/')
    .then(function (response){
      console.log(response);
      self.setState({visitingRoom33: response.data.room_name});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/room/4/')
    .then(function (response){
      console.log(response);
      self.setState({visitingRoom44: response.data.room_name});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/room/5/')
    .then(function (response){
      console.log(response);
      self.setState({visitingRoom55: response.data.room_name});
    })
    .catch(function (error){
      console.log(error);
    });
  }

  translateGuest = () => {
    var self = this;

    axios.get('http://127.0.0.1:8000/guests/1/')
    .then(function (response){
      console.log(response);
      self.setState({visitingGuest11: response.data.person_name + ' visited'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/guests/2/')
    .then(function (response){
      console.log(response);
      self.setState({visitingGuest22: response.data.person_name + ' visited'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/guests/3/')
    .then(function (response){
      console.log(response);
      self.setState({visitingGuest33: response.data.person_name + ' visited'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/guests/4/')
    .then(function (response){
      console.log(response);
      self.setState({visitingGuest44: response.data.person_name + ' visited'});
    })
    .catch(function (error){
      console.log(error);
    });
    axios.get('http://127.0.0.1:8000/guests/5/')
    .then(function (response){
      console.log(response);
      self.setState({visitingGuest55: response.data.person_name + ' visited'});
    })
    .catch(function (error){
      console.log(error);
    });
  }

  render(){
    return (
      <ScrollView>
          <View>
            <StatusBarBackground />
          </View>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>{this.state.residence_name}</Text>
              <Text style={styles.bodyText}>{this.state.address}</Text>
              <Text></Text>
            </View>
          </View>
  
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>Rooms</Text>
              <Text style={styles.bodyText}>{this.state.room1}</Text>
              <Text style={styles.bodyText}>{this.state.room2}</Text>
              <Text style={styles.bodyText}>{this.state.room3}</Text>
              <Text style={styles.bodyText}>{this.state.room4}</Text>
              <Text style={styles.bodyText}>{this.state.room5}</Text>
              <Text>______________________________________</Text>
              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Room Name"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleCreateRoomName}
               textAlign='center'
              />
              <Button
                icon={<AntDesign name="pluscircleo" size={15} color="white" />}
                title="Add Room"
                onPress={ this.addRoom }
                buttonStyle={{
                  backgroundColor: "#BA4048",
                  borderRadius: 9,
                  height: 46,
                  width: 290,  
                }}
              />
            </View>
          </View>
  
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>Roommates</Text>
              <Text style={styles.bodyText}>{this.state.roommate1} {this.state.testStatus1}</Text>
              <Text style={styles.bodyText}>{this.state.roommate2} {this.state.testStatus2}</Text>
              <Text style={styles.bodyText}>{this.state.roommate3} {this.state.testStatus3}</Text>
              <Text style={styles.bodyText}>{this.state.roommate4} {this.state.testStatus4}</Text>
              <Text style={styles.bodyText}>{this.state.roommate5} {this.state.testStatus5}</Text>
              <Text>______________________________________</Text>
              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Roommate Name"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = { this.handleRoommateName }
               textAlign='center'
              />
              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = { this.handleEmail }
               textAlign='center'
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#7DCE82" }}
                onPress={
				          () => {this.state.status = "Negative";}
                }
              >
                <Text style={styles.buttonText}>Negative</Text>
              </TouchableHighlight>
			        <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#FF8360" }}
                onPress={
				          () => {this.state.status = "Positive";}
                }
              >
                <Text style={styles.buttonText}>Positive</Text>
              </TouchableHighlight>
			        <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#333333" }}
                onPress={
				          () => {this.state.status = "Pending";}
                }
              >
                <Text style={styles.buttonText}>Pending</Text>
              </TouchableHighlight>
              <Text style={styles.buttonText}></Text>
              <Button
                icon={<AntDesign name="pluscircleo" size={15} color="white" />}
                title="Add Roommate"
                onPress={ this.addRoommate }
                buttonStyle={{
                  backgroundColor: "#BA4048",
                  borderRadius: 9,
                  height: 46,
                  width: 290,  
                }}
              />
            </View>
          </View>
          {/*
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>Visit Log</Text>
              <Text style={styles.bodyText}>{this.state.visitingGuest11} {this.state.visitingHousemate11} {this.state.visitingRoom11}</Text>
              <Text style={styles.bodyText}>{this.state.visitingGuest22} {this.state.visitingHousemate22} {this.state.visitingRoom22}</Text>
              <Text style={styles.bodyText}>{this.state.visitingGuest33} {this.state.visitingHousemate33} {this.state.visitingRoom33}</Text>
              <Text style={styles.bodyText}>{this.state.visitingGuest44} {this.state.visitingHousemate44} {this.state.visitingRoom44}</Text>
              <Text style={styles.bodyText}>{this.state.visitingGuest55} {this.state.visitingHousemate55} {this.state.visitingRoom55}</Text>
            </View>
          </View>
            */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.selectText}>Select roommate:</Text>
              <Picker
              selectedValue={this.state.visitRoommate}
              style={{width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({visitRoommate: itemValue})
              }>
              <Picker.Item label={this.state.roommate1} value="roommate1" />
              <Picker.Item label={this.state.roommate2} value="roommate2" />
              <Picker.Item label={this.state.roommate3} value="roommate3" />
              <Picker.Item label={this.state.roommate4} value="roommate4" />
              <Picker.Item label={this.state.roommate5} value="roommate5" />
            </Picker>

            <Text style={styles.selectText}>Select room:</Text>
              <Picker
              selectedValue={this.state.visitRoom}
              style={{width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({visitRoom: itemValue})
              }>
              <Picker.Item label={this.state.room1} value="room1" />
              <Picker.Item label={this.state.room2} value="room2" />
              <Picker.Item label={this.state.room3} value="room3" />
              <Picker.Item label={this.state.room4} value="room4" />
              <Picker.Item label={this.state.room5} value="room5" />
            </Picker>

            <Text style={styles.selectText}>Select guest:</Text>
              <Picker
              selectedValue={this.state.visitGuest}
              style={{width: 150}}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({visitGuest: itemValue})
              }>
              <Picker.Item label={this.state.guest1} value="guest1" />
              <Picker.Item label={this.state.guest2} value="guest2" />
              <Picker.Item label={this.state.guest3} value="guest3" />
              <Picker.Item label={this.state.guest4} value="guest4" />
              <Picker.Item label={this.state.guest5} value="guest5" />
            </Picker>

            <Button 
              icon={<AntDesign name="pluscircleo" size={15} color="white" />}
                title="Request Visit"
                onPress={() => 
                  this.addVisit()}
                buttonStyle={{
                  backgroundColor: "#BA4048",
                  borderRadius: 9,
                  height: 46,
                  width: 290,   
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
  input: {
    margin: 15,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    width: 150
 },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 290,
  },
  headingText: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 18,
    padding: 15
  },
  buttonText: {
    textAlign: "center",
    fontSize: 12,
    padding: 5,
    color: 'white'
   },
  selectText: {
    marginBottom: 5,
    textAlign: "center",
    fontSize: 18,
    padding: 15
  },
  bodyText: {
    textAlign: "center",
    fontSize: 12
  }
});