import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {ProjectAPI} from "../API/project";
import projectSlice from "./slices/project.slice";

export const rootReducer = combineReducers({
  [ProjectAPI.reducerPath]: ProjectAPI.reducer,
  project: projectSlice,
})

export const setupStore = () => configureStore({
  devTools: false,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      ProjectAPI.middleware
  ])
})

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
