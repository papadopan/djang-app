import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";

function App() {
  return (
    <main id="main">
      <Header />
      <Main />
      <Footer />
    </main>
  );
}

export default App;
