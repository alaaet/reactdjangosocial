import axios from "axios";
import { createMessage } from "./messages";
import { ADD_LEAD, DELETE_LEAD, GET_ERRORS, GET_LEADS } from "./types";

// GET LEADS
export const getLeads = () => dispatch => {
  axios
    .get("/api/leads/")
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// DELETE LEAD
export const deleteLead = id => dispatch => {
  axios
    .delete(`/api/leads/${id}/`)
    .then(res => {
      dispatch(
        createMessage({
          leadDeleted: `Lead with the id: ${id} was deleted successfully! `
        })
      );
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD LEAD
export const addLead = lead => dispatch => {
  axios
    .post("/api/leads/", lead)
    .then(res => {
      dispatch(
        createMessage({
          leadAdded: `Lead with the id: ${res.data.id} was created successfully!`
        })
      );
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.status
      };
      dispatch({ type: GET_ERRORS, payload: errors });
    });
};
