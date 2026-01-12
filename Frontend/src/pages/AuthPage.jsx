import { useState } from "react";
import LoginForm from "../components/LoginUser";
import RegisterForm from "../components/RegisterUser";

const AuthPage = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      {login ? (
        <LoginForm state={setLogin} />
      ) : (
        <RegisterForm state={setLogin} />
      )}
    </div>
  );
};

export default AuthPage;
