import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function Sessions(props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  // someCustomValue is declared by you in ../kcContext.ts
  console.log(`TODO: Do something with: ${kcContext.someCustomValue}`);

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="sessions">
      <h1>Sessions</h1>
    </Template>
  );
}
