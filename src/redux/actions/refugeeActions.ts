import { AppDispatch } from "../store";
import { apiUrls } from "@/config";
import { IRefuge } from "@/interfaces/IRefugee";
import apiClient from "@/apiClient";

export const FETCH_REFUGEES_REQUEST = "FETCH_REFUGEES_REQUEST";
export const FETCH_REFUGEES_SUCCESS = "FETCH_REFUGEES_SUCCESS";
export const FETCH_REFUGEES_FAILURE = "FETCH_REFUGEES_FAILURE";
export const FETCH_REFUGEE_BY_ID = "FETCH_REFUGEE_BY_ID";
export const SELECT_REFUGEE_BY_ID = "SELECT_REFUGEE_BY_ID"
export interface FetchRefugeesRequestAction {
  type: typeof FETCH_REFUGEES_REQUEST;
}

export interface FetchRefugeesSuccessAction {
  type: typeof FETCH_REFUGEES_SUCCESS;
  payload: IRefuge |IRefuge[] ;
}

export interface FetchRefugeesFailureAction {
  type: typeof FETCH_REFUGEES_FAILURE;
  payload: string;
}

export interface FetchRefugeesById {
  type: typeof FETCH_REFUGEE_BY_ID;
  payload: IRefuge | null;
}

export type RefugeeActions =
  | FetchRefugeesRequestAction
  | FetchRefugeesSuccessAction
  | FetchRefugeesFailureAction
  | FetchRefugeesById;

export const fetchRefugeesRequest = (): FetchRefugeesRequestAction => ({
  type: FETCH_REFUGEES_REQUEST,
});

export const fetchRefugeesSuccess = (
  refugees : any
): FetchRefugeesSuccessAction => ({
  type: FETCH_REFUGEES_SUCCESS,
  payload: refugees,
});
export const fetchRefugeesSuccessById = (
  refugees : any
): FetchRefugeesById => ({
  type: FETCH_REFUGEE_BY_ID,
  payload: refugees,
});

export const fetchRefugeesFailure = (
  error: string
): FetchRefugeesFailureAction => ({
  type: FETCH_REFUGEES_FAILURE,
  payload: error,
});

export const fetchRefugees = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRefugeesRequest());
    try {
      const response = await fetch(apiUrls.getAllRefugee());
      if (!response.ok) {
        throw new Error("Error al obtener los refugios.");
      }
      const data = await response.json();
      dispatch(fetchRefugeesSuccess(data.refugees));
      console.log(data.refugees)
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido.";
      dispatch(fetchRefugeesFailure(errorMessage));
    }
  };
};

export const fetchRefugeeById = (id: string|undefined)  => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchRefugeesRequest());

    try {
      const response = await apiClient.get(`/refugees/${id}`);
      dispatch(fetchRefugeesSuccessById(response.data.refugee));
      console.log(response)
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Error al obtener el refugio.";
      dispatch(fetchRefugeesFailure(errorMessage));
    }
  };
};
