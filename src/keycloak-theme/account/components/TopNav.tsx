import { Logo } from "../assets/Icons/Logo";
import svgIcon from "../assets/svgs/menuIcon.svg";

export const TopNav = ({ url, msg, referrer, openSidebar }: { url: any; msg: any; referrer: any; openSidebar: (val: boolean) => void }) => {
  return (
    <div className="my-nav ">
      <div className="my-logo-container">
        <div onClick={() => openSidebar(true)} className="menuIcon">
          <img src={svgIcon} className=" w-12 h-12" />
        </div>
        <Logo className="my-logo" />
      </div>

      <h1 className="my-nav-title">Manage Account</h1>
      <div className="my-nav-links">
        <a className="my-nav-link" href={url.getLogoutUrl()}>
          {msg("doSignOut")}
        </a>

        {referrer?.url && (
          <li className="my-nav-link">
            <a href={referrer?.url} id="referrer">
              {msg("backTo", referrer?.name)}
            </a>
          </li>
        )}
        
      </div>
    </div>
  );
};
