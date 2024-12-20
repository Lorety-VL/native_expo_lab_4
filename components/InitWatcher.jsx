import { useContext, useEffect } from "react";
import { DBContext } from "./DatabasePrivider";

export default function InitWatcher() {
  const { setIsInit } = useContext(DBContext);
  useEffect(() => {
    setIsInit(() => true)
  }, []);
  return null
}