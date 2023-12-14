/* eslint-disable jsx-a11y/alt-text */
import type { PageProps } from "keycloakify/account/pages/PageProps";
import React from "react";
import svgIcon from "../assets/svgs/sessionIcon.svg";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";
import { formatDate } from "../utils/formatDate";

export default function Sessions(
  props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { url, sessions, stateChecker } = kcContext;

  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="sessions">
      <>
        <div className="zigah-title-Container">
          <div className=" zigah-title-wrapper">
            <h2 className="my-page-title">{msg("sessionsHtmlTitle")}</h2>
            <p className="para">Sign out of any unfamiliar devices.</p>
          </div>
          <div className="w-[100px] h-12 text-3xl">
            <img src={svgIcon} className="max-w-sm" />
          </div>
        </div>

        <h2 className="zigah-title-h2">Signed in devices</h2>
        <div  className="my-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{msg("ip")}</th>
                <th>{msg("started")}</th>
                <th>{msg("lastAccess")}</th>
                <th>{msg("expires")}</th>
                <th>{msg("clients")}</th>
              </tr>
            </thead>

            <tbody>
              {sessions?.sessions.map((session, id) => (
                <tr key={id} className="my-td">
                  <td>{session.ipAddress}</td>
                  <td>{formatDate(session.started)}</td>
                  <td>{formatDate(session.lastAccess)}</td>
                  <td>{formatDate(session.expires)}</td>
                  <td >
                    {session.clients.map((client, id) => (
                      <React.Fragment key={id}>
                        {client}
                        <br />
                      </React.Fragment>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form action={url.sessionsUrl} method="post">
          <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />
          <button
            id="logout-all-sessions"
            className="
            my-button-secondary
            my-button-ring
            "
            style={{ width: "200px" }}
          >
            {msg("doLogOutAllSessions")}
          </button>
        </form>
      </>
    </Template>
  );
}
