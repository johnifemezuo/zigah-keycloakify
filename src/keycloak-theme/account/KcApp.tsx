import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { PageProps } from "keycloakify/account";
import type { KcContext } from "./kcContext";
import { useI18n } from "./i18n";
import Account from "./pages/Account";

const Template = lazy(() => import("./Template"));

const Password = lazy(() => import("./pages/Password"));
const Authenticator = lazy(() => import("./pages/Authenticator"));
const Applications = lazy(() => import("./pages/Applications"));
const Sessions = lazy(() => import("./pages/Sessions"));
const Fallback = lazy(()=> import("keycloakify/account"));

const classes: PageProps<any, any>["classes"] = {
    "kcBodyClass": "my-root-account-class"
};

export default function KcApp(props: { kcContext: KcContext; }) {

    const { kcContext } = props;

    const i18n = useI18n({ kcContext });

    if (i18n === null) {
        return null;
    }

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                  case "password.ftl":
                    return (
                      <Password
                        {...{ kcContext, i18n, Template, classes }}
                        doUseDefaultCss={true}
                      />
                    );
                  case "account.ftl":
                    return (
                      <Account {...{ kcContext, i18n, Template, classes }} doUseDefaultCss={true} />
                    );
                  case "totp.ftl":
                    return (
                      <Authenticator
                        {...{ kcContext, i18n, Template, classes }}
                        doUseDefaultCss={true}
                      />
                    );
                  case "applications.ftl":
                    return (
                      <Applications
                        {...{ kcContext, i18n, Template, classes }}
                        doUseDefaultCss={true}
                      />
                    );
                  case "sessions.ftl":
                    return (
                      <Sessions
                        {...{ kcContext, i18n, Template, classes }}
                        doUseDefaultCss={true}
                      />
                    );

                  default:
                    return (
                      <Fallback
                        {...{ kcContext, i18n, classes }}
                        Template={Template}
                        doUseDefaultCss={true}
                      />
                    );
                }
            })()}
        </Suspense>
    );

}
