// PageWrapper.jsx
import PropTypes from 'prop-types';
import { APP_NAME } from "@config";
import { Header, BurgerMenu,Footer } from "@/react/components/common/layout";
import { Loader,BackToTopButton } from "@/react/components/common/ui";
import PageTitle from "@/react/components/common/layout/PageTitle";

const PageWrapper = ({ className, children, pageTitle,showLoader, showMenu = true }) => (
  <div className={className}>
    <PageTitle title={`${APP_NAME} - ${pageTitle}`} />
    {showLoader && <Loader />}
    <>
      <BackToTopButton />
    </>
    <Header />
    <div className="Container">
      {showMenu && (
        <div className="menu-container">
          <BurgerMenu />
        </div>
      )}
      {children}
    </div>
    <Footer />
  </div>
);

PageWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  pageTitle: PropTypes.string.isRequired,
  showLoader: PropTypes.bool,
  showMenu: PropTypes.bool
};

export default PageWrapper;
