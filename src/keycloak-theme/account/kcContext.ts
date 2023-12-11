import { createGetKcContext } from "keycloakify/account";

export type KcContextExtension =
  | { pageId: "authenticator.ftl" }
  | { pageId: "sessions.ftl"; someCustomValue: string };

export const { getKcContext } = createGetKcContext<KcContextExtension>({
  mockData: [
    {
      pageId: "sessions.ftl",
      someCustomValue: "foo bar",
    },
  ],
});

export const { kcContext } = getKcContext({
    // mockPageId: "password.ftl",
    // mockPageId: "account.ftl",
  mockPageId: "authenticator.ftl",
  // mockPageId: "sessions.ftl",
});

export type KcContext = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;
