import { configureStore } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isModalVisible: false,
  content: null, // This will hold the JSX content
};

// Reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SHOW_MODAL":
      console.log(action.payload);
      return {
        ...state,
        isModalVisible: true,
        content: action.payload, // Set content from action payload
      };
    case "HIDE_MODAL":
      return {
        ...state,
        isModalVisible: false,
        content: null, // Clear content when modal is hidden
      };
    default:
      return state;
  }
};

// Configure the store
const store = configureStore({
  reducer,
});

export default store;
