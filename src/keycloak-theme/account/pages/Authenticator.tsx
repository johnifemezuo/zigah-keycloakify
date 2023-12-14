/* eslint-disable jsx-a11y/alt-text */
import type { PageProps } from "keycloakify/account/pages/PageProps";
import passwordSvg from "../assets/svgs/totpIcon.svg";
import type { I18n } from "../i18n";
import type { KcContext } from "../kcContext";

export default function Authenticator(
  props: PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
  const { totp, url, stateChecker, messagesPerField } = kcContext;

  const { msg } = i18n;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="totp">
      <div className="">
        <div className="zigah-title-Container">
          <div className=" zigah-title-wrapper">
            <h2 className="my-page-title">{msg("authenticatorTitle")}</h2>
            <p className="para">
              Verify your identity using our two factor authenticator or barcode.
            </p>
          </div>
          <div className="w-[100px] h-12 text-3xl">
            <img src={passwordSvg} className="max-w-sm" />
          </div>
        </div>
      </div>

      <div className="zigah-totp-step">
        <h2 className="zigah-title-h3">Auth Steps</h2>
        {totp?.enabled ? (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th colSpan={totp.otpCredentials.length > 1 ? 4 : 3}>
                  {msg("configureAuthenticators")}
                </th>
              </tr>
            </thead>
            <tbody>
              {totp?.otpCredentials.map((credential) => (
                <tr key={credential.id}>
                  <td className="provider">{msg("mobile")}</td>
                  {totp?.otpCredentials.length > 1 && <td className="provider">{credential.id}</td>}
                  <td className="provider">{credential.userLabel || ""}</td>
                  <td className="action">
                    <form action={url.totpUrl} method="post" className="form-inline">
                      <input
                        type="hidden"
                        id="stateChecker"
                        name="stateChecker"
                        value={stateChecker}
                      />
                      <input type="hidden" id="submitAction" name="submitAction" value="Delete" />
                      <input
                        type="hidden"
                        id="credentialId"
                        name="credentialId"
                        value={credential.id}
                      />
                      <button id="remove-mobile" className="my-button-primary">
                        <i className="pficon pficon-delete"></i>
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <>
            <hr />
            <ol>
              <li className="zigah-title-h2">
                <p>{msg("totpStep1")}</p>
                <ul className="list-disc">
                  {totp?.supportedApplications.map((app) => (
                    <li key={app}>{msg(app)}</li>
                  ))}
                </ul>
              </li>

              {totp?.mode && totp?.mode === "manual" ? (
                <>
                  <li>
                    <p>{msg("totpManualStep2")}</p>
                    <p className="zigah-para">
                      <span id="kc-totp-secret-key">{totp?.totpSecretEncoded}</span>
                    </p>
                    <p>
                      <a href={totp?.qrUrl} id="mode-barcode">
                        {msg("totpScanBarcode")}
                      </a>
                    </p>
                  </li>
                  <li className="zigah-title-h2">
                    <p>{msg("totpManualStep3")}</p>
                    <ul className="zigah-para">
                      <li id="kc-totp-type">
                        {msg("totpType")}: {msg(("totp." + totp?.policy.type) as any)}
                      </li>
                      <li id="kc-totp-algorithm">
                        {msg("totpAlgorithm")}: {totp?.policy.getAlgorithmKey()}
                      </li>
                      <li id="kc-totp-digits">
                        {msg("totpDigits")}: {totp?.policy.digits}
                      </li>
                      {totp?.policy.type === "totp" ? (
                        <li id="kc-totp-period">
                          {msg("totpInterval")}: {totp?.policy.period}
                        </li>
                      ) : totp?.policy.type === "hotp" ? (
                        <li id="kc-totp-counter">
                          {msg("totpCounter")}: {totp?.policy.initialCounter}
                        </li>
                      ) : null}
                    </ul>
                  </li>
                </>
              ) : (
                <li className="zigah-title-h2">
                  <p>{msg("totpStep2")}</p>
                  <p className="zigah-para">
                    <img
                      src={`data:image/png;base64, ${totp?.totpSecretQrCode}`}
                      alt="Figure: Barcode"
                    />
                  </p>
                  <p className="zigah-para">
                    <a href={totp?.manualUrl} id="mode-manual">
                      {msg("totpUnableToScan")}
                    </a>
                  </p>
                </li>
              )}
              <li className="zigah-title-h2">
                <p>{msg("totpStep3")}</p>
                <p className="zigah-para">{msg("totpStep3DeviceName")}</p>
              </li>
            </ol>
            <hr />

            <div className="zigah-auth-container">
              <form action={url.totpUrl} className="form-horizonta" method="post">
                <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker} />

                <div className="my-flex-input">
                  <div className="form-grou">
                    <div className="my-label-wrapper">
                      <label htmlFor="totp" className="my-label">
                        {msg("authenticatorCode")} <span className="required">*</span>
                      </label>
                    </div>
                    <div className="my-input-wrapper">
                      <input
                        type="text"
                        className="my-input"
                        id="totp"
                        name="totp"
                        autoComplete="off"
                        autoFocus
                      />
                      <input
                        type="hidden"
                        id="totpSecret"
                        name="totpSecret"
                        value={totp?.totpSecret}
                      />
                    </div>
                  </div>
                  <div
                    className={`${messagesPerField.printIfExists(
                      "userLabel",
                      "" || ""
                    )}`}
                  >
                    <div className="my-label-wrapper">
                      <label htmlFor="userLabel" className="my-label">
                        {msg("totpDeviceName")}{" "}
                        {totp?.otpCredentials && totp?.otpCredentials.length >= 1 && (
                          <span className="required">*</span>
                        )}
                      </label>
                    </div>
                    <div className="my-input-wrapper">
                      <input
                        type="text"
                        className="my-input"
                        id="userLabel"
                        name="userLabel"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div id="kc-form-buttons" className="my-button-wrapper ">
                    <button
                      type="submit"
                      className="my-button-primary my-button-ring"
                      id="saveTOTPBtn"
                      name="submitAction"
                      value="Save"
                    >
                      {msg("doSave")}
                    </button>
                    <button
                      type="submit"
                      className="my-button-secondary my-button-ring"
                      id="cancelTOTPBtn"
                      name="submitAction"
                      value="Cancel"
                    >
                      {msg("doCancel")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </Template>
  );
}
