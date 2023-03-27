import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,

    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_EDIT_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

} from "../Constants/productConstants";
import axios from 'axios';

export const addProduct = (product) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_ADD_REQUEST,
        });

        const { data } = await axios.post('https://naigtest.pythonanywhere.com/api/products/create', product); //create a new product

        dispatch({
            type: PRODUCT_ADD_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const { data } = await axios.delete(
            `https://naigtest.pythonanywhere.com/api/products/delete/${id}/`,
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const editProduct = (id, product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_EDIT_REQUEST,
        });

        const { data } = await axios.put(`https://naigtest.pythonanywhere.com/api/products/update/${id}/`, product)

        dispatch({
            type: PRODUCT_EDIT_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

// export function getProduct() {
//     return axios.get('http://127.0.0.1:8000/product/')
//         .then(res => {
//             return res.data
//         })
// }

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        const { data } = await axios.get('https://naigtest.pythonanywhere.com/api/products'); //fetch the products from rest api

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        });

        const { data } = await axios.get(`https://naigtest.pythonanywhere.com/api/products/${id}`); //fetch the products from rest api

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}