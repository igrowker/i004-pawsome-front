
export const SUBMIT_FORM_START = "SUBMIT_FORM_START";
export const SUBMIT_FORM_SUCCESS = "SUBMIT_FORM_SUCCESS";
export const SUBMIT_FORM_ERROR = "SUBMIT_FORM_ERROR";


interface SubmitFormStartAction {
  type: typeof SUBMIT_FORM_START;
}

interface SubmitFormSuccessAction {
  type: typeof SUBMIT_FORM_SUCCESS;
  payload: Record<string, string>; 
}

interface SubmitFormErrorAction {
  type: typeof SUBMIT_FORM_ERROR;
  payload: string; 
}

export type FormAction =
  | SubmitFormStartAction
  | SubmitFormSuccessAction
  | SubmitFormErrorAction;

