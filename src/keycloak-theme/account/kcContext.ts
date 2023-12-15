import { createGetKcContext } from "keycloakify/account";
import { MessageKey } from "keycloakify/account/i18n/i18n";
import { DeepPartial } from "keycloakify/tools/DeepPartial";

export type KcContextExtension =
  | {
      pageId: "totp.ftl";
      stateChecker: string;
      totp: {
        manualUrl: string;
        totpSecret: string;
        totpSecretQrCode: string;
        mode: string;
        supportedApplications: any[];
        policy: {
          getAlgorithmKey: () => any;
          type: any;
          algorithm: string | undefined;
          digits: number | undefined;
          period: number | undefined;
          initialCounter: number | undefined;
        };
        totpSecretEncoded: string;
        qrUrl: string;
        otpCredentials: {
          id: string;
          userLabel: string;
        }[];
        url: {
          totpUrl: string;
        };
        enabled: boolean;
      };
    }
  | {
      pageId: "applications.ftl";
      stateChecker: string;
      advancedMsg: (val: any) => any;
      applications: {
        applications: {
          additionalGrants: any[];
          effectiveUrl: string;
          client: {
            inUse: boolean;
            name: string;
            clientId: string;
            consentRequired: boolean;
            id: string | number;
          };
          clientScopesGranted: any[];
          realmRolesAvailable: {
            description: string;
            role: string;
            name: string;
          }[];
          resourceRolesAvailable: any[];
        }[];
      };
    }
  | {
      pageId: "sessions.ftl";
      someCustomValue: string;
      sessions: {
        sessions: {
          ipAddress: string;
          started: string;
          lastAccess: string;
          expires: string;
          clients: string[];
        }[];
      };
      stateChecker: string;
    };

export const { getKcContext } = createGetKcContext<KcContextExtension>({
  mockData: [
    {
      pageId: "sessions.ftl",
      someCustomValue: "foo bar",
      sessions: {
        sessions: [
          {
            ipAddress: "127.0.0.1",
            started: "2022-01-01T00:00:00.000Z",
            lastAccess: "2022-01-01T00:00:00.000Z",
            expires: "2022-01-01T00:00:00.000Z",
            clients: ["foo", "bar"],
          },
        ],
      },
      stateChecker: "",
    },
    // {
    //   pageId: "applications.ftl",
    //   stateChecker: "",
    //   advancedMsg: (val: any) => val,
    //   applications: {
    //     applications: [
    //       {
    //         additionalGrants: [],
    //         effectiveUrl: "",
    //         client: {
    //           name: "",
    //           clientId: "",
    //           consentRequired: false,
    //           id: "",
    //         },
    //         clientScopesGranted: [],
    //         realmRolesAvailable: [],
    //         resourceRolesAvailable: [],
    //       },
    //     ],
    //   },
    // },
  ],
});

export const { kcContext } = getKcContext({
  // mockPageId: "account.ftl",
  // mockPageId: "password.ftl",
  // mockPageId: "totp.ftl",
  mockPageId: "applications.ftl",
  // mockPageId: "sessions.ftl",
});

export type KcContext = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;
