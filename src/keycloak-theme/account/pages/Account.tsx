import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Account(
  props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes: {
      ...classes,
      kcBodyClass: clsx(classes?.kcBodyClass, "user"),
    },
  });

  const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;

  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
      <div className="row">
        <div className="col-md-10 my-page-title">
          <h2>{msg("editAccountHtmlTitle")}</h2>
        </div>
        <div className="col-md-2 subtitle">
          <span className="subtitle">
            <span className="required">*</span> {msg("requiredFields")}
          </span>
        </div>
      </div>

      <form action={url.accountUrl} className="form-horizontal" method="post">
        <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

        {!realm.registrationEmailAsUsername && (
          <div className={clsx("", messagesPerField.printIfExists("username", "has-error"))}>
            <div className="my-label-wrapper">
              <label htmlFor="username" className="my-label">
                {msg("username")}
              </label>
              {realm.editUsernameAllowed && <span className="required">*</span>}
            </div>

            <div className="my-input-wrapper">
              <input
                type="text"
                className="my-input"
                id="username"
                name="username"
                disabled={!realm.editUsernameAllowed}
                defaultValue={account.username ?? ""}
              />
            </div>
          </div>
        )}

        <div className={clsx("", messagesPerField.printIfExists("email", "has-error"))}>
          <div className="my-label-wrapper">
            <label htmlFor="email" className="my-label">
              {msg("email")}
            </label>{" "}
            <span className="required">*</span>
          </div>

          <div className="my-input-wrapper">
            <input
              type="text"
              className="my-input"
              id="email"
              name="email"
              autoFocus
              defaultValue={account.email ?? ""}
            />
          </div>
        </div>

        <div className="my-flex-input">
          <div className={clsx("", messagesPerField.printIfExists("firstName", "has-error"))}>
            <div className="my-label-wrapper">
              <label htmlFor="firstName" className="my-label">
                {msg("firstName")}
              </label>{" "}
              <span className="required">*</span>
            </div>

            <div className="my-input-wrapper">
              <input
                type="text"
                className="my-input"
                id="firstName"
                name="firstName"
                defaultValue={account.firstName ?? ""}
              />
            </div>
          </div>

          <div className={clsx("", messagesPerField.printIfExists("lastName", "has-error"))}>
            <div className="my-label-wrapper">
              <label htmlFor="lastName" className="my-label">
                {msg("lastName")}
              </label>{" "}
              <span className="required">*</span>
            </div>

            <div className="my-input-wrapper">
              <input
                type="text"
                className="my-input"
                id="lastName"
                name="lastName"
                defaultValue={account.lastName ?? ""}
              />
            </div>
          </div>
        </div>

        <div className=" ">
          <div id="kc-form-buttons" className="submit">
            <div className="my-button-wrapper">
              {referrer !== undefined && <a href={referrer?.url}>{msg("backToApplication")}</a>}
              <button
                type="submit"
                className="my-button-primary my-button-ring"
                name="submitAction"
                value="Save"
              >
                {msg("doSave")}
              </button>
              <button
                type="submit"
                className="my-button-secondary my-button-ring"
                name="submitAction"
                value="Cancel"
              >
                {msg("doCancel")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Template>
  );
}
