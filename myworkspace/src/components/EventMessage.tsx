import { nanoid } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addAlert } from "./alert/alertSlice";
const EventMessage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 한번만 연결이 되면 되기 때문에 useEffect를 사용해 컴포넌트가 마운트 될때만 연결할수 있게 했다.
  useEffect(() => {
    let clientId = sessionStorage.getItem("event-client-id");

    if (!clientId) {
      clientId = nanoid();
      sessionStorage.setItem("event-client-id", clientId);
    }

    // const clientId = nanoid();
    const eventUrl = `http://localhost:9090/event/${clientId}`;
    const eventSource = new EventSource(eventUrl);

    eventSource.onmessage = (event) => {
      console.log(event);
      if (event.data !== "connected") {
        dispatch(
          addAlert({ id: nanoid(), variant: "info", message: event.data })
        );
      }
    };
  }, [dispatch]);

  return <></>;
};

export default EventMessage;