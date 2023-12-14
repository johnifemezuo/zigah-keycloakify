import type { PageProps } from "keycloakify/account/pages/PageProps";
import React from "react";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Overview(props: PageProps<Extract<KcContext, { pageId: "deviceActivities.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, sessions, stateChecker } = kcContext;

  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="overview">
      <>
        <div className="row">
          <div className="col-md-10 my-page-title">
            <h2>Overview </h2>
          </div>
        </div>
      </>
    </Template>
  );
}
