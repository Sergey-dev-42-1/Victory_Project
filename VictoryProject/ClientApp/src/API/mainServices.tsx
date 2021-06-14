import axios from "axios";
import * as types from "../Additional/Types";

const instance = axios.create({
  baseURL: "https://localhost:5001/api",
});

export async function register(user: types.User) {
  let response = await instance.post(`register`, user);
  return response;
}

export async function login(credentials: any) {
  let response:any;
  try{
    response = await instance.post(`login`, credentials);
  }
 catch(error){
    console.log(error.response)
    return error.response
  }
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
  let response = await instance.post(`addcontest`, Contest);
  return response;
} 
export async function getAllContests() {
  let response = await instance.get(`getallcontests`);
  return response;
}
export async function getAffiliatedContests() {
    let response = await instance.get(`getaffiliatedcontests`);
    return response;
}
export async function deleteContest(contestId:number) {
    let response = await instance.post(`deletecontest/contestId=${contestId}`);
    return response;
}
