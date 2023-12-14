import { getFirstLetters } from "../utils/formatText";

export const Profile = ( { account }: { account: any }) => {
    return (
      <div className="zigah-profile-wrapper">
        <div className="zigah-profile">
          {getFirstLetters(account.firstName, account.lastName as string)}
        </div>

        <div className="zigah-profile-title-wrapper">
          <div className="zigah-profile-name">
            {account.firstName} {account.lastName}
          </div>
          <div className="zigah-profile-email">{account.email}</div>
        </div>
      </div>
    );
}