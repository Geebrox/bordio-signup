import React from "react";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../services/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NotificationProvider } from "../context/Notification";
import { generateFontsURL } from "../utils";
import { SignUpForm } from "./Auth";
import { Page } from "./UI";
import { NotificationList } from "./Notification";

import "../assets/tailwind.scss";

const App: React.FC = () => {
  console.log(process.env);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Bordio | Sign up</title>
        <link href={generateFontsURL()} rel="stylesheet" />
      </Helmet>
      <ApolloProvider client={apolloClient}>
        <NotificationProvider>
          <Page>
            <SignUpForm />
            <NotificationList />
          </Page>
        </NotificationProvider>
      </ApolloProvider>
    </HelmetProvider>
  );
};

export default App;
