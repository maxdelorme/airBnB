import colors from "../assets/css/colors";
import { Link } from "expo-router";

const SamllLink = ({ href, text }) => {
  return (
    <Link href={href} style={{ color: colors.grey }}>
      {text}
    </Link>
  );
};

export default SamllLink;
