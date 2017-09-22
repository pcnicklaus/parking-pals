import axios from 'axios';
import { Alert } from 'react-native';
// import { GOOGLE_API_KEY } from '../config'

const BASE_URL = "http://localhost:3090"
const GOOGLE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

const GOOGLE_API_KEY = ""

import { CREATE_BLANK_MARKER, FETCH_NEEDS, CREATE_NEED } from './types';
/*
  create a blank marker
  put it in global state
  navigate me to map where marker is rendered.
*/


export const createBlankMarker = (address, object, callback) => async(dispatch) => {
  try {
    console.log("google api kiey", GOOGLE_API_KEY)
    let coords = await axios.get(`${GOOGLE_BASE_URL}${address}${GOOGLE_API_KEY}`)
    let { location } = coords.data.results[0].geometry;
    let coordinate = {
      latitude: location.lat,
      longitude: location.lng,
    }
    let { carMake, carModel, carColor, timeLeft, reward } = object;

    let needRequest = {
      address,
      carMake,
      carModel,
      carColor,
      timeLeft,
      reward,
      coordinate,
    }
    console.log('needrequest', needRequest)
    dispatch({ type: CREATE_BLANK_MARKER, payload: needRequest });
    callback();
  } catch(error) {
    Alert.alert("somethin bad happened", error)
    callback();
  }


}

export const fetchMarkers = (callback) => async (dispatch) => {
  try {
    let response = await axios.get(`${BASE_URL}/needs`)
    console.log('response.data', response, '\n data \n', response.data)
    dispatch({ type: FETCH_NEEDS, payload: response.data })
    callback();
  } catch(error) {
    Alert.alert("something bad happened...", error);
    callback();
  }
}

export const createMarker = (e) => async(dispatch) => {
  try {
    let needs = await axios.post(`${BASE_URL}/need`, { e });
    console.log('needs, reate marker', needs);
    dispatch({ type: CREATE_NEED, payload: needs.data });
  } catch (error) {
    console.log('eeeeeeeeee', error)
  }
}
