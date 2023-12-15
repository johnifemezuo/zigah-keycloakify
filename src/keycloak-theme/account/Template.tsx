/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { type TemplateProps } from "keycloakify/account/TemplateProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import { useState } from "react";
import { Profile } from "./components/Profile";
import { TopNav } from "./components/TopNav";
import type { I18n } from "./i18n";
import type { KcContext } from "./kcContext";
import svgIcon from "./assets/svgs/closeIcon.svg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;
  const [open, setOpen] = useState(true);

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { locale, url, features, realm, message, referrer, account } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
            `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
            `${url.resourcesPath}/css/account.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": clsx("admin-console", "user", getClassName("kcBodyClass"))
    });

    if (!isReady) {
        return null;
    }

    return (
        <>
            <header className="navbar navbar-default navbar-pf navbar-main header my-navbar">
                <TopNav open={open} openSidebar={setOpen} url={url} msg={msg} referrer={referrer} />
            </header> 

            <div className="layout">
                <div className="bs-sidebar my-sidebar col-sm-2" style={{display: open ? "block" : "none"}}>
                    <div onClick={() => setOpen(false)} className="close-icon">
                        <img src={svgIcon}  />
                    </div>

                    <div className="zigah-profile-nav-wrapper">
                        <div style={{paddingTop: "70px"}} />
                 <Profile account={account} />
                </div>                
                    <ul>
                        <li className={clsx(active === "account" && "my-active-link")}>
                            <a href={url.accountUrl}>{msg("account")}</a>
                        </li>
                        {features.passwordUpdateSupported && (
                            <li className={clsx(active === "password" && "my-active-link")}>
                                <a href={url.passwordUrl}>{msg("password")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "totp" && "my-active-link")}>
                            <a href={url.totpUrl}>{msg("authenticator")}</a>
                        </li>
                        {features.identityFederation && (
                            <li className={clsx(active === "social" && "active")}>
                                <a href={url.socialUrl}>{msg("federatedIdentity")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "sessions" && "my-active-link")}>
                            <a href={url.sessionsUrl}>{msg("sessions")}</a>
                        </li>
                        <li className={clsx(active === "applications" && "my-active-link")}>
                            <a href={url.applicationsUrl}>{msg("applications")}</a>
                        </li>
                        {features.log && (
                            <li className={clsx(active === "log" && "my-active-link")}>
                                <a href={url.logUrl}>{msg("log")}</a>
                            </li>
                        )}
                        {realm.userManagedAccessAllowed && features.authorization && (
                            <li className={clsx(active === "authorization" && "my-active-link")}>
                                <a href={url.resourceUrl}>{msg("myResources")}</a>
                            </li>
                        )}
                    </ul>
                </div>

                    <div className="page-content">
                    {message !== undefined && (
                        <div className={clsx("alert", `alert-${message.type}`)}>
                            {message.type === "success" && <span className="pficon pficon-ok"></span>}
                            {message.type === "error" && <span className="pficon pficon-error-circle-o"></span>}
                            <span className="kc-feedback-text">{message.summary}</span>
                        </div>
                    )}

                        <div className="page-container">

                        {children}
                        </div>
                    </div>
            </div>
        </>
    );
}
