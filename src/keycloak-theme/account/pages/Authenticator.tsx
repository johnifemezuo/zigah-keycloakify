import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Authenticator(
  props: PageProps<Extract<KcContext, { pageId: "authenticator.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="authenticator">
      <h1>Authenticator</h1>
    </Template>
  );
}
