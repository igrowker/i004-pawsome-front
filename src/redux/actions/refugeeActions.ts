import { AppDispatch } from "../store";
import { apiUrls } from "@/config";
import { IRefuge } from "@/interfaces/IRefugee";

export const FETCH_REFUGEES_REQUEST = "FETCH_REFUGEES_REQUEST";
export const FETCH_REFUGEES_SUCCESS = "FETCH_REFUGEES_SUCCESS";
export const FETCH_REFUGEES_FAILURE = "FETCH_REFUGEES_FAILURE";

export interface FetchRefugeesRequestAction {
  type: typeof FETCH_REFUGEES_REQUEST;
}

export interface FetchRefugeesSuccessAction {
  type: typeof FETCH_REFUGEES_SUCCESS;
  payload: IRefuge[];
}

export interface FetchRefugeesFailureAction {
  type: typeof FETCH_REFUGEES_FAILURE;
  payload: string;
}

export type RefugeeActions =
  | FetchRefugeesRequestAction
  | FetchRefugeesSuccessAction
  | FetchRefugeesFailureAction;

export const fetchRefugeesRequest = (): FetchRefugeesRequestAction => ({
  type: FETCH_REFUGEES_REQUEST,
});

export const fetchRefugeesSuccess = (
  refugees: IRefuge[]
): FetchRefugeesSuccessAction => ({
  type: FETCH_REFUGEES_SUCCESS,
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
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido.";
      dispatch(fetchRefugeesFailure(errorMessage));
    }
  };
};
