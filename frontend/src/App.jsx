import Body from "./Body";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/hello"
              element={<h1 className="bg-amber-500">Hello World</h1>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<h1>About Page</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
