import {
    SUBMIT_FORM_START,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_ERROR,
    FormAction,
  } from "../actions/volunteeringFormActions";
  
  export interface FormState {
    full_name: string;
    birth: string;
    gender: string;
    address: string;
    telephone: string;
    email: string;
    availableDays: string;
    availableHours: string;
    frecuency: string;
    experience: string;
    preferenceArea: string;
    knowledge: string;
    volunteer: string;
    learn: string;
    volunteering_option: string;
    role: string;
    work_preference: string;
    medical_conditions: string;
    data_consent: string;
    aditional_info: string;
    error?: string;
    
  }
  
  const initialState: FormState = {
    full_name: "",
  birth: "",
  gender: "",
  address: "",
  telephone: "",
  email: "",
  availableDays: "",
  availableHours: "",
  frecuency: "",
  experience: "",
  preferenceArea: "",
  knowledge: "",
  volunteer: "",
  learn: "",
  volunteering_option: "",
  role: "",
  work_preference: "",
  medical_conditions: "",
  data_consent: "",
  aditional_info: "",
  error: ""
  };
  
  const volunteeringFormReducer = (state = initialState, action: FormAction): FormState => {
    switch (action.type) {
      case SUBMIT_FORM_START:
        return { ...state, error: "" }; // Limpiar error al comenzar el submit
      case SUBMIT_FORM_SUCCESS:
        return { ...state, ...action.payload, error: "" }; // Limpia el error si el submit es exitoso
      case SUBMIT_FORM_ERROR:
        return { ...state, error: action.payload }; // Si ocurre un error, lo asignamos al estado
      default:
        return state;
    }
  };
  
  
  export default volunteeringFormReducer;
  