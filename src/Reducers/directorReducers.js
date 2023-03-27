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


export const directorsListReducer = (state = {directors:[]}, action) => {
    switch (action.type) {
        case DIRECTORS_LIST_REQUEST:
            return {loading:true, directors: []};
        case DIRECTORS_LIST_SUCCESS:
            return {loading:false, directors: action.payload};
        case DIRECTORS_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};


export const directorsDetailReducer = (state = {director: {}}, action) => {
    switch (action.type) {
        case DIRECTORS_DETAILS_REQUEST:
            return {loading:true, director: {}};
        case DIRECTORS_DETAILS_SUCCESS:
            return {loading:false, directors: action.payload};
        case DIRECTORS_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const directorAddReducer = (state = {}, action) => {
    switch (action.type) {
        case DIRECTORS_ADD_REQUEST:
            return { loading: true }
  
        case DIRECTORS_ADD_SUCCESS:
            return { loading: false, userInfo: action.payload }
  
        case DIRECTORS_ADD_FAIL:
            return { loading: false, error: action.payload }
  
        default:
            return state
    }
  }