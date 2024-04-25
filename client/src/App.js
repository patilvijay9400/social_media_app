import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import ProfilePage from "pages/profilePage";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Toaster from "components/ui/Toaster";

function App() {
  const [toaster, setToaster] = useState(null);
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const showToast = (type, msg) => {
    console.log({type, msg})
    setToaster({ type, msg });
  }
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {toaster && <Toaster type={toaster.type}  msg={toaster.msg} />}
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage showToast={showToast} />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage showToast={showToast} /> : <Navigate to="/" showToast={showToast}/>}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;