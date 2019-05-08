import React, {Component} from 'react';
import {Button, TextInput, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state={
      text: '',
      textoMostrar: ''
    }
  }

  gravar = async () => {
    try {
      if(this.state.text !== ''){
        await AsyncStorage.setItem('texto', this.state.text)
          .then( () => alert("Texto gravado com sucesso!"))
          .catch( error => console.log(error));
      } else{
        alert("O campo está vazio!");
      }
    } catch (e) {
        alert(e);
    }
  }

  recuperar = async () => {
    try {
      const value = await AsyncStorage.getItem('texto')
        .catch( error => alert(error));
      if (value !== null) {
        this.setState({ textoMostrar: value })
      }
    } catch (e) {
      alert(e)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{borderBottomColor: '#000', borderBottomWidth: 1, width: 150, marginBottom: 10}}
          onChangeText={ text => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title="Gravar"
          onPress={() => this.gravar()}
        />
        <View style={{height: 20}}></View>
        <Button
          title="Mostrar"
          onPress={() => this.recuperar()}
        />
        <Text style={{marginTop: 10}}>{this.state.textoMostrar}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
