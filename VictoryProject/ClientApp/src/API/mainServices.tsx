import axios from "axios";
import * as types from "../Additional/Types";
const instance = axios.create({
  baseURL: "https://localhost:44337/api",
});

export async function register(user: types.User) {
  let response = await instance.post(`register`, user);
  return response;
}
export async function login(credentials: any) {
  let response = await instance.post(`login`, credentials);
  console.log(response.data);
  console.log(response.statusText);
  return response;
}

export async function logout() {
  try {
    let response = await instance.get(`logout`);
    console.log(response);
    return response;
  } catch {
    console.log("Ошибка сервера");
  }
}

export async function createContest(Contest: types.Contest) {
  let response = await instance.post(`add_contest`, Contest);
  return response;
}
export async function getAllContests() {
  let response = await instance.get(`https:/localhost:44337/get_all_contests`);
  return response;
}
