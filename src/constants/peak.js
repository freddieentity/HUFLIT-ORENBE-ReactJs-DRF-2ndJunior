import React from "react";
import { toast } from "react-toastify";
import ErrorIcon from "@material-ui/icons/Error";

const peak = (type, message) => {
  switch (type) {
    case "warning":
      return toast.warning(message);
    case "error":
      return toast.error(
        <div>
          <ErrorIcon /> {message}
        </div>
      );
    case "success":
      return toast.success(message);
    case "info":
      return toast.info(message);
    case "dark":
      return toast.dark(message);
    default:
      return toast(message);
  }
};
export default peak;
