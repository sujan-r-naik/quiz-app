import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";

function App() {
  const [name, setName] = useState<string>("");
  const [lang, setLang] = useState<string>("English");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home lang={lang} name={name} setName={setName} setLang={setLang} />
          }
        />
        <Route path="/quiz" element={<Quiz lang={lang} name={name} />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </>
  );
}

export default App;
