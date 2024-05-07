import { basename } from "@config";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import { HomePage } from "@react/pages";

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
