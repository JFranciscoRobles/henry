import { useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `${window.location.origin}/cuentas`,
      redirect: false,
    }).then(function (result: any) {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError("Tu Correo o Contraseña son incorrectos");
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full max-w-lg space-y-6 text-lg bg-gray-200 shadow-md"
      >
        <Image
          src="https://www.mrpampas.com/images/logo.png"
          alt="Pampas Logo"
          width={150}
          height={200}
        />

        <input
          type="text"
          value={email}
          placeholder="Correo"
          className="p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="Contraseña"
          className="p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="p-2 text-xl text-white bg-blue-600" type="submit">
          Iniciar Sesion
        </button>
        <span className="text-white"> {loginError}</span>
      </form>
    </div>
  );
}
