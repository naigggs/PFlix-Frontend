import {
  DIRECTORS_LIST_REQUEST,
  DIRECTORS_LIST_SUCCESS,
  DIRECTORS_LIST_FAIL,
  DIRECTORS_DETAILS_REQUEST,
  DIRECTORS_DETAILS_SUCCESS,
  DIRECTORS_DETAILS_FAIL,
  DIRECTORS_ADD_REQUEST,
  DIRECTORS_ADD_SUCCESS,
  DIRECTORS_ADD_FAIL,
} from "../Constants/directorConstants";
import axios from "axios";

export const listDirectors = () => async (dispatch) => {
  try {
    dispatch({
      type: DIRECTORS_LIST_REQUEST,
    });

    const { data } = await axios.get("https://naigtest.pythonanywhere.com/api/directors"); //fetch the products from rest api

    dispatch({
      type: DIRECTORS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIRECTORS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailDirector = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DIRECTORS_DETAILS_REQUEST,
    });

    const {
        productDetails: {product}
    } = getState()

    console.log(product)

    const { data } = await axios.get(`https://naigtest.pythonanywhere.com/api/directors/${product.director}`); //fetch the products from rest api

    dispatch({
      type: DIRECTORS_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIRECTORS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDirector = (director) => async (dispatch) => {
  try {
    dispatch({
      type: DIRECTORS_ADD_REQUEST,
    });

    const { data } = await axios.post("https://naigtest.pythonanywhere.com/api/director/create", director); //create a new product

    dispatch({
      type: DIRECTORS_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DIRECTORS_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
