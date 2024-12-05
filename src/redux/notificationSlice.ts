import { Reducer } from "redux";

export interface Notification {
  id: string;
  type: "success" | "error";
  message: string;
}

export interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const ADD_NOTIFICATION = "notifications/addNotification" as const;
export const REMOVE_NOTIFICATION = "notifications/removeNotification" as const;

export const addNotification = (notification: Omit<Notification, "id">) => ({
  type: ADD_NOTIFICATION,
  payload: { ...notification, id: Date.now().toString() } as Notification,
});

export const removeNotification = (id: string) => ({
  type: REMOVE_NOTIFICATION,
  payload: id,
});

type NotificationAction =
  | ReturnType<typeof addNotification>
  | ReturnType<typeof removeNotification>;

const notificationReducer: Reducer<NotificationState, NotificationAction> = (
  state = initialState,
  action
): NotificationState => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default notificationReducer;
