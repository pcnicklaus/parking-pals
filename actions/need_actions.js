import axios from 'axios';
import { Alert } from 'react-native';

const BASE_URL = "http://localhost:3090"
const GOOGLE_BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address="

const API_KEY = "&key=AIzaSyAL54wdz49xeiRANryZbQqiTonzT8ynsoY"

import { CREATE_BLANK_MARKER, FETCH_NEEDS } from './types';
/*
  create a blank marker
  put it in global state
  navigate me to map where marker is rendered.
*/


export const createBlankMarker = (address, object, callback) => async(dispatch) => {
  try {
    let coords = await axios.get(`${GOOGLE_BASE_URL}${address}${API_KEY}`)
    let { location } = coords.data.results[0].geometry;
    let coordinate = {
      latitude: location.lat,
      longitude: location.lng,
    }
    console.log('coord', coordinate);
    let needRequest = {
      title: "Where is your car exactly?!?",
      address: object.address,
      coordinate,
    }
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
    dispatch({ type: FETCH_NEEDS, payload: response.data })
    callback();
  } catch(error) {
    Alert.alert("something bad happened...", error);
    callback();
  }
}
