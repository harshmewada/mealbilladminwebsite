import axios from "axios";

let set_IMG_URL = "http://localhost:3000/public/images/";
let set_LOCAL_URL = "http://localhost:3000/";

export const IMG_URL = set_IMG_URL;
export const LOCAL_URL = set_LOCAL_URL;
// export const ROOT_URL = "http://172.105.184.246:9874/";
export const ROOT_URL = "http://172.105.33.144:9874/";
export const DISPLAY_PRODUCT_TYPE = false;

export function setAuth(token) {
  if (token) {
    localStorage.setItem("tkn", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function getToken() {
  return localStorage.getItem("tkn");
}
export function removeAuth() {
  delete axios.defaults.headers.common["Authorization"];
}

export function setFormState(state, key, event) {
  let keyObject = { ...state };

  keyObject[key] = event;

  return keyObject;
}
