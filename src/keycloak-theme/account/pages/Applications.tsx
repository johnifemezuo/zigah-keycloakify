/* eslint-disable jsx-a11y/alt-text */
import type { PageProps } from "keycloakify/account/pages/PageProps";
import React from "react";
import svgIcon from "../assets/svgs/applicationIcon.svg";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Applications(
  props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, stateChecker, applications } = kcContext;
  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="applications">
      <div className="zigah-title-Container">
        <div className=" zigah-title-wrapper">
          <h2 className="my-page-title">Application</h2>
          <p className="para">Manage your application permissions</p>
        </div>
        <div className="w-[100px] h-12 text-3xl">
          <img src={svgIcon} className="max-w-sm" />
        </div>
      </div>

      <form action={url.applicationsUrl} method="post">
        <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
        <input type="hidden" id="referrer" name="referrer" value={stateChecker} />

        <table>
          <thead>
            <tr>
              <th>{msg("applicationName")}</th>
              <th>{msg("applicationType")}</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications?.applications.map((application, i) => (
              <tr className="my-td" key={i}>
                <td>
                  {application.client.clientId}
                </td>

                <td>
                  {application?.client.consentRequired ? "Third party app" : "Internal"}
                </td>

                <td>
                  {application.client.inUse ? "In Use": "Not In Use"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </Template>
  );
}
