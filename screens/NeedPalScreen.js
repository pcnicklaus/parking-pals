import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, Text, ScrollView, Button, Alert, TouchableHighlight } from 'react-native';
import t from 'tcomb-form-native';

import { createBlankMarker } from '../actions';

const Form = t.form.Form;
const validate = t.validate;


class NeedPalScreen extends Component {

  state = {
            value: {},
          }

  PalRequest = t.struct({
    address: t.String,
    carMake: t.String,
    carModel: t.String,
    carColor: t.String,
    timeLeft: t.String,
    reward: t.String
  });

  options = {
    fields: {
      address:  { label: 'where is your car?', placeholder: '200 Blake St' },
      carMake:  { label: 'who makes your car?', placeholder: 'Volvo' },
      carModel: { label: 'what model is it?', placeholder: 'S70' },
      carColor: { label: 'what color', placeholder: 'Bright Pink' },
      timeLeft: { label: 'one hour', placeholder: 'An hour' },
      reward:   { label: 'filler reward', placeholder: 'A dollar' }
    }
  }

  onChange = (value) => { this.setState({ value }); }
  clearForm = () => { this.setState({ value: null}); }

// 1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  handleSubmit = async () => {
    let address = this.state.value.address.replace(/ /g, "+")
    console.log('address\n', address)

    this.props.createBlankMarker(address, this.state.value, () => { this.props.navigation.navigate('map') });



    // this.props.navigation.navigate('map')
  }

  onPress = () => {
    // console.log('this.state.value',this.state.value)
    // let value = this.refs.form.getValue();
    // console.log('this.refs', this.refs.form)
    // let result = validate(value, this.PalRequest);
    //
    // if (result.isValid()) {
      // this.handleSubmit(result)
      // console.log('value \n', value)
    // this.handleSubmit(value)

    // } else {
    //   const text = result.firstError().message;
    //   Alert.alert(
    //     'there was a problem...\n',
    //     text,
    //     [ { text: 'Ok', onPress: () => { console.log('Ok pressed') } } ]
    //   )
    // }
  }

  render () {
    const navigation = this.props;

    return (
      <View>
        <Form
          ref="form"
          type={ this.PalRequest }
          options={ this.options }
          value={ this.state.value }
          onChange={ this.onChange }
          style={{ padding: 0, margin: 0 }}
        />
        <TouchableHighlight onPress={this.handleSubmit} underlayColor='#99d9f4'>
          <Text>Save</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default connect(null, { createBlankMarker })(NeedPalScreen);



//
// {
//     "address": "200 Blake St"
//     "carMake": "Volvo",
//     "carModel": "S70",
//     "carColor": "Bright Pink",
//     "timeLeft": "hour",
//     "reward": "dollar",
//     "coordinates": {
//         "latitude": 37.99999,
//         "longitude": -104.9999
//     }
// }
