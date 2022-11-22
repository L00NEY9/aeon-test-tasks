import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootStateType} from "../store";

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
