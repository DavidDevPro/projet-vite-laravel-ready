import { basename } from "@config";
import ReactModal from "react-modal";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "@react/pages";

// Configuration de React Modal
ReactModal.setAppElement("#root");

const App = () => {
  return (
    <>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
