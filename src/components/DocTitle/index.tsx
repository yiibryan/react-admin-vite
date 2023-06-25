import {getAppEnvConfig} from "@/utils/env";
import React, {PropsWithChildren} from "react";

export type DocTitleProps = {
  title: string;
  Component: React.FC;
  route?: any;
};

const {
  VITE_GLOB_APP_TITLE,
} = getAppEnvConfig();

export function getPageTitle(pageTitle: string) {
  return pageTitle ? `${pageTitle} - ${VITE_GLOB_APP_TITLE}` : VITE_GLOB_APP_TITLE;
}

const DocTitle = ({route, title, Component} : PropsWithChildren<DocTitleProps> ) => {
  document.title = getPageTitle(title);
  return <Component route={route}/>
}

export default DocTitle;
