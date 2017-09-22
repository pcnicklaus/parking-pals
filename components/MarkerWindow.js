import React, { Component } from 'react';
import { View, Text } from 'react-native';

class MarkerWindow extends Component {
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.bubble}>
          <Text>Yo</Text>
          <Text>My name</Text>
          <Text>is slim shady</Text>
        </View>
      </View>
    )

  }
}

const styles = {
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#FF5A5F',
    padding: 2,
    borderRadius: 3,
    borderColor: '#D23F44',
    borderWidth: 0.5,
  },

}

export default MarkerWindow
// const { address, carMake, carModel, carColor, timeLeft, reward } = this.props.marker;
// if (!this.props.marker) { return }
// <Text>{ carColor }</Text>
// <Text>{ timeLeft }</Text>
// <Text>{ reward }</Text>
