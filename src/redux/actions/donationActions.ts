import { AppDispatch } from "@/redux/store";
import apiClient from "@/apiClient";

// Tipos de acciones
export const FETCH_DONATIONS_REQUEST = "FETCH_DONATIONS_REQUEST";
export const FETCH_DONATIONS_SUCCESS = "FETCH_DONATIONS_SUCCESS";
export const FETCH_DONATIONS_FAILURE = "FETCH_DONATIONS_FAILURE";

export interface Donation {
  _id: string;
  refugee_id: string;
  user_id: { id: string; name: string; email: string };
  amount: number;
  reason: string;
  createdAt: string;
}

export interface FetchDonationsRequestAction {
  type: typeof FETCH_DONATIONS_REQUEST;
}

export interface FetchDonationsSuccessAction {
  type: typeof FETCH_DONATIONS_SUCCESS;
  payload: Donation[];
}

export interface FetchDonationsFailureAction {
  type: typeof FETCH_DONATIONS_FAILURE;
  payload: string;
}

export type DonationActions =
  | FetchDonationsRequestAction
  | FetchDonationsSuccessAction
  | FetchDonationsFailureAction;

// Acciones
export const fetchDonationsRequest = (): FetchDonationsRequestAction => ({
  type: FETCH_DONATIONS_REQUEST,
});

export const fetchDonationsSuccess = (
  donations: Donation[]
): FetchDonationsSuccessAction => ({
  type: FETCH_DONATIONS_SUCCESS,
  payload: donations,
});

export const fetchDonationsFailure = (
  error: string
): FetchDonationsFailureAction => ({
  type: FETCH_DONATIONS_FAILURE,
  payload: error,
});

// Acción para obtener todas las donaciones
export const fetchDonations = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchDonationsRequest());
    try {
      const response = await apiClient.get("/donations"); // Asegúrate de que este endpoint existe en tu backend
      dispatch(fetchDonationsSuccess(response.data));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "Error al obtener las donaciones.";
      dispatch(fetchDonationsFailure(errorMessage));
    }
  };
};


export const fetchUserDonations = () => {
    return async (dispatch: AppDispatch) => {
      dispatch(fetchDonationsRequest());
      try {
        const response = await apiClient.get("/donation-requests/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        dispatch(fetchDonationsSuccess(response.data.donations));
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || "Error al obtener las donaciones del usuario.";
        dispatch(fetchDonationsFailure(errorMessage));
      }
    };
  };