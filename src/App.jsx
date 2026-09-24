import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom"
import SigninWithEmailPage from "./pages/authentication/SigninWithEmailPage";
import SignupWithEmailPage from "./pages/authentication/SignupWithEmailPage";
import SigninWithPhonePage from "./pages/authentication/SigninWithPhonePage";
import SignupWithPhonePage from "./pages/authentication/SignupWithPhonePage";
import SignInWithGoogle from "./pages/authentication/SignInWithGoogle";
import HomePage from "./pages/HomePage";
import './App.css'

function App() {

  return (
    <>
      <Toaster position="top-center" duration={2000} reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin-with-email" element={<SigninWithEmailPage />} />
        <Route path="/signup-with-email" element={<SignupWithEmailPage />} />
        <Route path="/signin-with-phone" element={<SigninWithPhonePage />} />
        <Route path="/signup-with-phone" element={<SignupWithPhonePage />} />
        <Route path="/signin-with-google" element={<SignInWithGoogle />} />
      </Routes>
    </>
  )
}

export default App
