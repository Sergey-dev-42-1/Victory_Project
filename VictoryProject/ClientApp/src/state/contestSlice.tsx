import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState} from "./store"

type State = {
    contests: object[]
}
//В экосистеме React и Redux не принято хранить объекты классов и другие несериалезуемые объекты(date например) в хранилище
//поэтому здесь не используется Contest а в Types, Contest имеет типы number вместо Date для дат
const initialState :State = {contests:[]}

const contestSlice = createSlice({
    name: "contest",
    initialState: initialState,
    reducers: {
        receive: (state,action:PayloadAction<object[]>) => {
            state.contests = action.payload
        },
    },
});

export const { receive } = contestSlice.actions;

export const selectContests = (state: RootState) => state.contest.contests;
export default contestSlice.reducer;
