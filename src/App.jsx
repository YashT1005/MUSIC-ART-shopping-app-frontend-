import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { createContext } from "react";
import { getCartData } from "./apis/data";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessfullPage from "./pages/SuccessfullPage";
import Protected from "./components/Protected/Protected";
import InvoicePage from "./pages/InvoicePage";
import ViewInvoicePage from "./pages/ViewInvoicePage";

const context = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [name, setName] = useState()
  const [cartData, setCartData] = useState()
  const [overallQuantity, setOverAllQuantity] = useState(0)

  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("MATOKEN"));
    if (token) {
      setLoggedIn(true);
      setName(localStorage.getItem("MAUSERNAME"));
      fetchCartData();
    } else {
      setLoggedIn(false);

    }
  }, [token, overallQuantity]);



  const fetchCartData = async () => {
    const response = await getCartData();
    if (response.success === true) {
      setLoggedIn(true)
      setCartData(response.data)
      setOverAllQuantity(response.overallQuantity)
      return response.data;
    }
  }

  return (
    <>
      <BrowserRouter>
        <context.Provider value={{ token, setToken, loggedIn, setLoggedIn, overallQuantity, name, fetchCartData, setName, cartData }}>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/register"
              element={<RegisterPage />}
            />
            <Route
              path="/details"
              element={<DetailsPage />}
            />
            <Route
              path="/cart"
              element={<Protected Component={CartPage} />}
            />
            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />
            <Route
              path="/successfull"
              element={<SuccessfullPage />}
            />
            <Route
              path="/invoice"
              element={<InvoicePage />}
            />
            <Route
              path="/viewinvoice"
              element={<ViewInvoicePage />}
            />
          </Routes>
        </context.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { context }
