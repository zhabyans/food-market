import { showMessage } from "react-native-flash-message";

export const showToast = (message, type) => {
  showMessage({
    message,
    type: type === "success" ? "success" : "danger",
    backgroundColor: type === "success" ? "#1ABC9C" : "#D9435E",
  });
};
