
"use client"
import { store } from "@/redux/store";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux"; // Rename to avoid conflict

interface Props {
  children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default AppProvider;
