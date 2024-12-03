import { useDispatch as useReduxDispatch } from "react-redux";
import type { AppDispatch } from "./store";

export const useDispatch = () => useReduxDispatch<AppDispatch>();
