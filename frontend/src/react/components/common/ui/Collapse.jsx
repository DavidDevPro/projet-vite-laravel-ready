import { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

const Collapse = ({ title, classname, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen(!isOpen);
  
  return (
    <>
      <div
        className={classname}
        onClick={toggleCollapse}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleCollapse();
          }
        }}
        role="button"
        tabIndex="0"
        aria-expanded={isOpen}>
        <h3>{title}</h3>
        <FaChevronDown className={`chevron ${isOpen ? "rotated" : ""}`} />
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </>
  );
};

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  classname: PropTypes.string,
  children: PropTypes.node,
};

export default Collapse;
