import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';

import * as actions from '../actions';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 39.7378825;
const LONGITUDE = -104.99324;
// const LATITUDE_DELTA = 0.0922;
const LATITUDE_DELTA = 0.00215;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LONGITUDE_DELTA = 0.00148;
const SPACE = 0.01;

function log(eventName, e) {
  console.log(eventName, e.nativeEvent);
}

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="my-location" size={30} color={tintColor} />;
      }
    }
  }

  state = {
    mapLoaded: false,
    region: {
      longitude: this.props.needs[0].coordinate.longitude,
      latitude: this.props.needs[0].coordinate.latitude,
      longitudeDelta: LONGITUDE_DELTA,
      latitudeDelta: LATITUDE_DELTA
    },
    longitude: null,
    latitude: null,
    error: null,
    markers: [
       {
         coordinate: { latitude: 39.7334, longitude: -104.9988 },
         address: "suck it",
         carMake: "buick",
         carModel: "regal",
         carColor: "maroon",
         timeLeft: "1 hour",
         reward: "1 dollar",
       },
       {
         coordinate: { latitude: 39.739, longitude: -104.9959 },
         address: "whatttt",
         carMake: "caddy",
         carModel: "bitches",
         carColor: "thas",
         timeLeft: "riiiiiiiiiggggght",
         reward: "my dick",
       }
    ]
  }

  addMarker(position) {
    // console.log('position \n ', position)
    let marker = { coordinate: { latitude: position.coords.latitude, longitude: position.coords.longitude }}
    this.setState({
      markers: [ marker, ...this.state.markers ]
    })
  }

  componentDidMount() {
    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //     this.addMarker(position);
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
  }

  render() {
    console.log('this.props', this.props.needs[0].coordinate.latitude)
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    // console.log('this.state.markers', this.state.markers)

    return (
      <View style={{ flex: 1 }}>
        <MapView
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          { this.props.needs.map( (marker) => {
              console.log('marker',marker);
              console.log('marker.coord', marker.coordinate)
              return (
                <MapView.Marker
                  coordinate={ marker.coordinate }
                  title="Scooby doobie doo, where art thou?"
                  onDragEnd={ (e) => console.log('OnDragEnd', e) }
                  key={ `${marker.coordinate.longitude}${marker.coordinate.latitude}` }
                  draggable
                />
              )
            })
          }

        </MapView>
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Yep, thats exactly where my car is!"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={ this.onButtonPress }
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps({ needs }) {
  return { needs }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(mapStateToProps, actions)(MapScreen);
