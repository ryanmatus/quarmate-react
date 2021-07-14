import * as React from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TextInput, TouchableHighlight} from "react-native";
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import Modal from 'react-native-modal';

export class Profile extends React.Component {
  
	constructor(props) {
		super(props);
		this.state={
			name: '',
			testStatus: '',
			testDate: '',
			id: null,
			residence: '',
			residenceAddress: '',
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
			newGuest: '',
			newGuestStatus: '',
			newStatus: '',
			newResidenceName: '',
			newResidenceAddress: '',
			modalVisible1: false,
			modalVisible2: false,
			modalVisible3: false
		}
	}

	componentDidMount(){
		this.getTestingStatus()
		this.getName()
		this.getResidence()
		this.getGuests()
		/* focusListener so that name on top updates correctly */
		this.focusListener = this.props.navigation.addListener('focus', () => {
			this.getName();
		})
	}

	componentDidUpdate(prevProps){
		if (this.props.residence !== prevProps.residence) {
		  this.getResidence()
		}

		if (this.props.name !== prevProps.name) {
			this.getName()
		  }
	  }

	setModalVisible1 = (visible) => {
		var self = this;

		self.setState({ modalVisible1: visible });
	}

	  setModalVisible2 = (visible) => {
		var self = this;

		self.setState({ modalVisible2: visible });
	}

	setModalVisible3 = (visible) => {
		var self = this;

		self.setState({ modalVisible3: visible });
	}

	getTestingStatus = () => {
		var self = this;

		{/* Update testing status */}
		axios.get('http://127.0.0.1:8000/persons/')
		.then(function (response){
			console.log(response);
			self.setState({testStatus: response.data[0].status})
			self.setState({testDate: response.data[0].date})
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	getName = () => {
		var self = this;

		axios.get('http://127.0.0.1:8000/persons/')
		.then(function (response) {
			console.log(response);
			self.setState({name: response.data[0].person_name})
			self.setState({id: response.data[0].person_id})
		})
		.catch(function (error){
			console.log(error);
		});
	}

	getResidence = () => {
		var self = this;

		axios.get('http://127.0.0.1:8000/residence/')
		.then(function (response){
			console.log(response);
			self.setState({residence: response.data[0].residence_name})
			self.setState({residenceAddress: response.data[0].address})
		})
		.catch(function (error){
			console.log(error);
		})
	}

	getGuests = () => {
		var self = this;

		axios.get('http://127.0.0.1:8000/guests/')
		.then(function (response){
			console.log(response);
			self.setState({guest1 : response.data[0].person_name})
			self.setState({testStatus1: '- ' + response.data[0].status})
			self.setState({guest2 : response.data[1].person_name})
			self.setState({testStatus2: '- ' + response.data[1].status})
			self.setState({guest3 : response.data[2].person_name})
			self.setState({testStatus3: '- ' + response.data[2].status})
			self.setState({guest4 : response.data[3].person_name})
			self.setState({testStatus4: '- ' + response.data[3].status})
			self.setState({guest5 : response.data[4].person_name})
			self.setState({testStatus5: '- ' + response.data[4].status})
		})
		.catch(function (error){
			console.log(error);
		})
	}

	changeResidence = () => {
		var self = this;

		axios.patch('http://127.0.0.1:8000/residence/1/', {
			residence_name: this.state.newResidenceName,
			address: this.state.newResidenceAddress
		})
		.then(function (response){
			console.log(response);
			self.getResidence();
			self.forceUpdate();
		})
		.catch(function (error){
			console.log(error);
		})
	}

	changeTestingStatus = () => {
		var self = this;

		axios.patch('http://127.0.0.1:8000/persons/1/', {
			status: this.state.newStatus,
		})
		.then(function (response){
			console.log(response);
			self.getTestingStatus();
			self.forceUpdate();
		})
		.catch(function (error){
			console.log(error);
		});
	}

	addGuests = () => {
		var self = this;

		axios.post('http://127.0.0.1:8000/guests/', {
			"person_name": this.state.newGuest,
			"status": this.state.newGuestStatus
		})
		.then(function (response) {
			console.log(response);
			self.getGuests();
			self.forceUpdate();
		})
		.catch(function (error){
			console.log(error);
		});
	}
	
	handleChangeTestingStatus = (text) => {
		this.setState({ newStatus: text })
	}
	
	handleChangeResidence = (text) => {
		this.setState({ newResidenceName: text })
	}

	handleChangeResidenceAddress = (text) => {
		this.setState({ newResidenceAddress: text })
	}
	
	handleGuestName = (text) => {
		this.setState({ newGuest: text })
	}
	/*
	handleGuestStatus = (text) => {
		this.setState({ newGuestStatus: text })
	}
	*/
	render(){
	return (
	  <ScrollView>
		  <View style={styles.centeredView}>
			<View style={styles.modalView}>
			<Text style={styles.headingText}>{this.state.name}</Text>
			</View>
		  </View>
  
		  <View style={styles.centeredView}>
		  <Modal
		  animationType="slide"
          transparent={true}
          visible={this.state.modalVisible1}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        	>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>Pick Your Status Below</Text>
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#7DCE82" }}
                onPress={
				  () => {this.state.newStatus = "Negative"; this.changeTestingStatus(); this.setModalVisible1(false);}
                }
              >
                <Text style={styles.buttonText}>Negative</Text>
              </TouchableHighlight>
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#FF8360" }}
                onPress={
				  () => {this.state.newStatus = "Positive"; this.changeTestingStatus(); this.setModalVisible1(false);}
                }
              >
                <Text style={styles.buttonText}>Positive</Text>
              </TouchableHighlight>
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#333333" }}
                onPress={
				  () => {this.state.newStatus = "Pending"; this.changeTestingStatus(); this.setModalVisible1(false);}
                }
              >
                <Text style={styles.buttonText}>Pending</Text>
              </TouchableHighlight>
            </View>
          	</View>
        	</Modal>
			
			<View style={styles.modalView}>
			  <Text style={styles.headingText}>Testing Status</Text>
			  <Text style={styles.bodyText}>{this.state.testStatus}</Text>
			  <Text style={styles.bodyText}>as of {this.state.testDate}</Text>
			  <Text style={styles.bodyText}></Text>
			  <Button
				title="Change Testing Status"
				iconRight
				icon={<AntDesign name="caretright" size={15} color="white" />}
				onPress={this.setModalVisible1}
				buttonStyle={{
				  backgroundColor: "#6FCF97",
				  borderRadius: 9,
				  height: 46,
				  width: 290,  
				}}
			  />
			</View>
		  </View>
  
		  <View style={styles.centeredView}>
		  <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        	>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>Fill In Household Info</Text>
			  <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Residence Name"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleChangeResidence}
              />
			  <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Residence Address"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleChangeResidenceAddress}
              />
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#4a4a4a" }}
                onPress={
				  () => {this.changeResidence(); this.setModalVisible2(false);}
                }
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableHighlight>
            </View>
          	</View>
        	</Modal>

			<View style={styles.modalView}>
			  <Text style={styles.headingText}>Household</Text>
			  <Text style={styles.bodyText}>{this.state.residence}</Text>
			  <Text style={styles.bodyText}>{this.state.residenceAddress}</Text>
			  <Text style={styles.bodyText}></Text>
			  <Button
				title="Manage Household"
				iconRight
				icon={<AntDesign name="caretright" size={15} color="white" />}
				onPress={this.setModalVisible2}
				buttonStyle={{
				  backgroundColor: "#6FCF97",
				  borderRadius: 9,
				  height: 46,
				  width: 290,  
				}}
			  />
			</View>
		  </View>
  
		  <View style={styles.centeredView}>
		  <Modal
          animationType="slide"
          transparent={true}
		  visible={this.state.modalVisible3}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        	>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.headingText}>Fill In Guest Info</Text>
			  <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Guest Name"
               placeholderTextColor = "#000000"
               autoCapitalize = "none"
               onChangeText = {this.handleGuestName}
              />
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#7DCE82" }}
                onPress={
				  () => {this.state.newGuestStatus = "Negative";}
                }
              >
                <Text style={styles.buttonText}>Negative</Text>
              </TouchableHighlight>
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#FF8360" }}
                onPress={
				  () => {this.state.newGuestStatus = "Positive";}
                }
              >
                <Text style={styles.buttonText}>Positive</Text>
              </TouchableHighlight>
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#333333" }}
                onPress={
				  () => {this.state.newGuestStatus = "Pending";}
                }
              >
                <Text style={styles.buttonText}>Pending</Text>
              </TouchableHighlight>
			  <Text style={styles.bodyText}></Text>
			  <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#4a4a4a" }}
                onPress={
				  () => {this.addGuests(); this.setModalVisible3(false);}
                }
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableHighlight>
            </View>
          	</View>
        	</Modal>
			<View style={styles.modalView}>
			  <Text style={styles.headingText}>Guests</Text>
			  <Text style={styles.bodyText}>{this.state.guest1} {this.state.testStatus1}</Text>
              <Text style={styles.bodyText}>{this.state.guest2} {this.state.testStatus2}</Text>
			  <Text style={styles.bodyText}>{this.state.guest3} {this.state.testStatus3}</Text>
			  <Text style={styles.bodyText}>{this.state.guest4} {this.state.testStatus4}</Text>
			  <Text style={styles.bodyText}>{this.state.guest5} {this.state.testStatus5}</Text>
			  <Text style={styles.bodyText}></Text>
			  <Button
				title="Manage Guests"
				iconRight
				icon={<AntDesign name="caretright" size={15} color="white" />}
				onPress={this.setModalVisible3}
				buttonStyle={{
				  backgroundColor: "#6FCF97",
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
 buttonText: {
	marginBottom: 5,
	textAlign: "center",
	fontWeight: 'bold',
	fontSize: 18,
	padding: 15,
	color: 'white'
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
  bodyText: {
	textAlign: "center",
	fontSize: 12
  }
});