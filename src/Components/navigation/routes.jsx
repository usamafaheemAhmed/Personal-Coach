// src/routes.jsx
import React from "react";

import { MdHome } from "react-icons/md";
import Home from "../Public/Home";
import DynamicComp from "../../assets/DynamicComps/DynamicComp";
import CVAnalyzer from "../CVAnalyzer/CVAnalyzer";
import ChatAPiTest from "../CVAnalyzer/ChatAPiTest";
import Results from "../Results/Results";
import DightAnalyzer from "../CVAnalyzer/DightAnalyzer";

const routes = [
    {
        name: "Home",
        layout: "/",
        path: "",
        icon: <MdHome />,
        component: <Home />,
    },
    {
        name: "DightAnalyzer",
        layout: "/",
        path: "DightAnalyzer",
        icon: <MdHome />,
        component: <DightAnalyzer />,
    },
    {
        name: "ChatAPiTest",
        layout: "/",
        path: "ChatAPiTest",
        icon: <MdHome />,
        component: <ChatAPiTest />,
    },
    {
        name: "CVAnalyzer",
        layout: "/",
        path: "CVAnalyzer",
        icon: <MdHome />,
        component: <CVAnalyzer />,
    },
    {
        name: "Results",
        layout: "/",
        path: "Results",
        icon: <MdHome />,
        component: <Results />,
    },
    {
        name: "DynamicComp",
        layout: "/",
        path: "DynamicComp",
        icon: <MdHome />,
        component: <DynamicComp />,
    },
    // Add more routes here as needed
];

export default routes;
