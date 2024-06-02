// Custom hook to use the QueueContext

import { useContext } from "react";
import { QueueContext } from "../contexts/QueueContext";

export const useQueue = () => {
    return useContext(QueueContext);
  };