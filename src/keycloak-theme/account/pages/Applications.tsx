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

  const { url, stateChecker, applications, advancedMsg } = kcContext;
  const { msg } = i18n;

  console.log(applications);

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
                  {application.effectiveUrl && (
                    <a href={application.effectiveUrl}>
                      {application.client.name
                        ? advancedMsg(application.client.name)
                        : application.client.clientId}
                    </a>
                  )}
                </td>

                <td>
                  {application?.client.consentRequired ? (
                    application.clientScopesGranted.map((claim: any, index: any) => (
                      <React.Fragment key={index}>
                        {advancedMsg(claim)}
                        {index < application.clientScopesGranted.length - 1 && ", "}
                      </React.Fragment>
                    ))
                  ) : (
                    <strong>{msg("fullAccess")}</strong>
                  )}
                </td>

                <td>
                  {application.additionalGrants.map((grant: any, index: any) => (
                    <React.Fragment key={index}>
                      {advancedMsg(grant)}
                      {index < application.additionalGrants.length - 1 && ", "}
                    </React.Fragment>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </Template>
  );
}
