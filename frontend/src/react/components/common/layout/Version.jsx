// Version.js
import PropTypes from "prop-types";

function Version({ version, date }) {
  return (
    <p>
      Version {version} du {date}
    </p>
  );
}

Version.propTypes = {
  version: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Version;
