import { Config } from '@config';
import Copyright from "./Copyright";
import Version from "./Version";

function Footer() {
  // const versionData = useSelector((state) => state.version.data);

  return (
    <footer className="footer">
      <Copyright />
      { <Version version={Config.version} date={"xx/xx/xxxx"}/>}
    </footer>
  );
}

export default Footer;
