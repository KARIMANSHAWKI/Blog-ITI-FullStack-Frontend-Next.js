import fetch from "isomorphic-fetch";
import { API } from "../config";
import { handleResponse } from './auth';


// *********************** Create Category **********************
export const create = (tag, token) => {
  return fetch(`${API}/api/tag`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tag),
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};


// **************** List All Categories *******************
export const getTags = () => {
  return fetch(`${API}/api/tag`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


// ****************** Get Single Ctegory *****************
export const singleTag = (slug) => {
  return fetch(`${API}/api/tag/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// *********************** Delete Category **********************
export const removeTag = (slug, token) => {
  return fetch(`${API}/api/tag/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      handleResponse(response)
      return response.json();
    })
    .catch((err) => console.log(err));
};
