import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from 'query-string'
import {isAuth} from './auth'

// *********************** Create Blog **********************
export const createBlog = (blog, token) => {
  let createBlogEndpoint;

  if(isAuth() && isAuth().role===1){
    createBlogEndpoint = `${API}/api/blog`
  } else {
    createBlogEndpoint = `${API}/api/user/blog`
  }

  return fetch(`${createBlogEndpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err))
};

// *********************** listBlogWithTagsAndCategory ********************
export const listBlogWithTagsAndCategory = (skip, limit) => {
  const data = {
    limit,
    skip
  }

  return fetch(`${API}/api/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type' : 'application/json'
    },
    body :JSON.stringify(data)
    
  })
    .then(response => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// **************************** Single Blog *****************************
export const singleBlog = slug => {
      return fetch(`${API}/api/blog/${slug}`,{
        method : 'GET'
      }).then(res =>{
        return res.json();
      })
      .catch(err=> console.log(err))
}


// *********************** List all related blogs ****************************
export const listRelated = blog => {

  return fetch(`${API}/api/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(blog)
    
  })
    .then(response => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const list = () => {
  return fetch(`${API}/api/blogs`,{
    method : 'GET'
  }).then(res =>{
    return res.json();
  })
  .catch(err=> console.log(err))
}


export const removeBlog = (slug, token) => {
  return fetch(`${API}/api/blog/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const updateBlog = (blog, token, slug) => {
  return fetch(`${API}/api/blog/${slug}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = params => {
  console.log('search params', params);
  let query = queryString.stringify(params);
  console.log('query params', query);
  return fetch(`${API}/api/blog/search?${query}`, {
      method: 'GET'
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};