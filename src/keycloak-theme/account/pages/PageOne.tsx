import type { PageProps } from "keycloakify/account/pages/PageProps";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";

export default function PageOne(props: PageProps<Extract<KcContext, { pageId: "pageOne.ftl" }>, I18n>) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  // someCustomValue is declared by you in ../kcContext.ts

  return (
    <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} active="pageOne">
      <h1>pageOne</h1>
    </Template>
  );
}
