import axios from "axios";
import * as types from "../Additional/Types";
const instance = axios.create({
  baseURL: "http://localhost:25532/api/",
});

export async function register(user: types.User) {
  let response = await instance.post(`register`, user);
  return response.data;
}
export async function login(credentials: any) {
  let response = await axios.post(
    `https:/localhost:44337/api/login`,
    credentials
  );
  return response.data;
}
export async function createContest(Contest: types.Contest) {
  let response = await axios.post(
    `https:/localhost:44337/api/addcontest`,
    Contest
  );
  return response.data;
}
export async function getAllContests() {
  let response = await axios.get(`https:/localhost:44337/api/get_all_contests`);
  return response.data;
}
