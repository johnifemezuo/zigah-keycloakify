import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        "classes": {
            ...classes,
            "kcBodyClass": clsx(classes?.kcBodyClass, "password")
        }
    });

    const { url, password, account, stateChecker } = kcContext;

    const { msg } = i18n;

    return (
      <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="password">
        <div className="row flex--items">
          <div className="col-md-10 my-page-title">
            <h2 className="">{msg("changePasswordHtmlTitle")}</h2>
          </div>
          <div className="">
            <span className="my-label">{msg("allFieldsRequired")}</span>
          </div>
        </div>

        <form action={url.passwordUrl} className="form-horizontal" method="post">
          <input
            type="text"
            id="username"
            name="username"
            value={account.username ?? ""}
            autoComplete="username"
            readOnly
            style={{ display: "none" }}
          />

          {password.passwordSet && (
            <div className="my-input-container">
              <div className="my-label-wrapper">
                <label htmlFor="password" className="my-label">
                  {msg("password")}
                </label>
              </div>

              <div className="my-input-wrapper">
                <input
                  type="password"
                  className="my-input"
                  id="password"
                  name="password"
                  autoFocus
                  autoComplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
          )}

          <div className="my-flex-input">
            <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

            <div className="my-input-container">
              <div className="my-label-wrapper">
                <label htmlFor="password-new" className="my-label">
                  {msg("passwordNew")}
                </label>
              </div>

              <div className="my-input-wrapper">
                <input
                  type="password"
                  className="my-input"
                  id="password-new"
                  name="password-new"
                  autoComplete="new-password"
                  placeholder="New password"
                />
              </div>
            </div>

            <div className="my-input-container">
              <div className="my-label-wrapper">
                <label htmlFor="password-confirm" className="my-label">
                  {msg("passwordConfirm")}
                </label>
              </div>

              <div className="my-input-wrapper">
                <input
                  type="password"
                  className="my-input"
                  id="password-confirm"
                  name="password-confirm"
                  autoComplete="new-password"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>

          <div className="my-button-wrapper">
            <div id="kc-form-buttons" className="">
              <div>
                <button
                  type="submit"
                  className="my-button-primary my-button-ring"
                  name="submitAction"
                  value="Save"
                >
                  {msg("doSave")}
                </button>
              </div>
            </div>
          </div>
        </form>
      </Template>
    );
}
