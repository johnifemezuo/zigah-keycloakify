/* eslint-disable jsx-a11y/alt-text */
import type { PageProps } from "keycloakify/account/pages/PageProps";
import { clsx } from "keycloakify/tools/clsx";
import passwordSvg from "../assets/svgs/profileIcon.svg";
import { Profile } from "../components/Profile";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Account(
  props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { url, realm, messagesPerField, stateChecker, account, referrer } = kcContext;

  const { msg } = i18n;


  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="account">
      <div className="">
        <div className="zigah-title-Container">
          <div className=" zigah-title-wrapper">
            <h2 className="my-page-title">Account Info</h2>
            <p className="para">You can manage your account information here.</p>
          </div>
          <div className="w-[100px] h-12 text-3xl">
            <img src={passwordSvg} className=" w-12 h-12" />
          </div>
        </div>

        <Profile account={account} />
      </div>

      <form action={url.accountUrl} className="form-horizontal zigah-form-wrapper" method="post">
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
              disabled={true}
              defaultValue={account.email ?? ""}
            />
          </div>
        </div>

        <div className="my-flex-input">
          <div className={clsx("", messagesPerField.printIfExists("email", "has-error"))}>
            <div className="my-label-wrapper">
              <label htmlFor="phoneNumber" className="my-label">
                {msg("phoneNumber")}
              </label>{" "}
              <span className="required">*</span>
            </div>

            <div className="my-input-wrapper">
              <input
                type="text"
                className="my-input"
                id="phoneNumber"
                name="phoneNumber"
                autoFocus
                disabled={true}
                defaultValue={account.phoneNumber ?? ""}
              />
            </div>
          </div>

          <div className={clsx("", messagesPerField.printIfExists("email", "has-error"))}>
            <div className="my-label-wrapper">
              <label htmlFor="referralCode" className="my-label">
                Referral
              </label>
              <span className="required">*</span>
            </div>

            <div className="my-input-wrapper">
              <input
                type="text"
                className="my-input"
                id="referralCode"
                name="referralCode"
                autoFocus
                disabled={true}
                defaultValue={account.referralCode ?? ""}
              />
            </div>
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
