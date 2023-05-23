import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //! We have to go without strict mode because react-scrollbar-custom does not work with it enabled
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
