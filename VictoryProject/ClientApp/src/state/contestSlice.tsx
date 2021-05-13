import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Contest} from "../Additional/Types"
import {RootState} from "./store"

type State = {
    contests: Contest[]
}
const initialState :State = {contests:[]}

const contestSlice = createSlice({
    name: "contest",
    initialState: initialState,
    reducers: {
        receive: (state,action:PayloadAction<Contest[]>) => {
            state.contests = action.payload
        },
    },
});

export const { receive } = contestSlice.actions;

export const selectContests = (state: RootState) => state.contest.contests;
export const selectContest = (state: RootState, id:string) => state.contest.contests.find((item)=>{return item.id===id});
export default contestSlice.reducer;
