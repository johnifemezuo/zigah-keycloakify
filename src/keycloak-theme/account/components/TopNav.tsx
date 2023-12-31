/* eslint-disable jsx-a11y/alt-text */
import { Logo } from "../assets/Icons/Logo";
import svgIcon from "../assets/svgs/menuIcon.svg";

export const TopNav = ({
  url,
  msg,
  referrer,
  openSidebar,
  open,
}: {
  url: any;
  msg: any;
  referrer: any;
  openSidebar: (val: boolean) => void;
  open: boolean;
}) => {
  return (
    <div className="my-nav ">
      <div className="my-logo-container">
        <div onClick={() => openSidebar(!open)} className="menuIcon">
          <img src={svgIcon} className=" w-12 h-12" />
        </div>
        <Logo className="my-logo" />
      </div>

      <h1 className="my-nav-title">Manage Account</h1>
      <div className="my-nav-links">
        <a className="my-nav-link" href={url.getLogoutUrl()}>
          <button className="my-button-secondary my-button-ring">{msg("doSignOut")}</button>
        </a>

        {referrer?.url && (
          <button className="my-button-secondary my-button-ring">
            <a href={referrer?.url} id="referrer">
              {msg("backTo", referrer?.name)}
            </a>
          </button>
        )}
      </div>
    </div>
  );
};
