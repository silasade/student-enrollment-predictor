import React from "react";
import { Alert } from "antd";
type AlertProp={
    message:string,
    type: "success" | "error" |"warning" | "info"
}
function Alerts({message, type}: AlertProp) {
  return <Alert message={message} type={type} banner />;
}

export default Alerts;
