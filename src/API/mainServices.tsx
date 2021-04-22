import axios from "axios";
import * as types from "../Additional/Types";
export async function register(user: types.User) {
  let response = await axios.post(`https:/localhost:1521/api/register`, user);
  return response.data;
}
export async function login(credentials: any) {
  let response = await axios.post(
    `https:/localhost:1521/api/login`,
    credentials
  );
  return response.data;
}
export async function createContest(Contest: types.Contest) {
  let response = await axios.post(
    `https:/localhost:1521/api/add_contest`,
    Contest
  );
  return response.data;
}
export async function getAllContests() {
  let response = await axios.get(`https:/localhost:1521/api/get_all_contests`);
  return response.data;
}
