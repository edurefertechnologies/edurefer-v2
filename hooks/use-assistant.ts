"use client";

import { useState } from "react";

export function useAssistant() {

  const [messages, setMessages] = useState([]);

  return {

    messages,

    setMessages,

  };

}