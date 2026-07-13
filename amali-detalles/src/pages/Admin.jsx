// src/pages/Admin.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import AddProduct from "../components/Admin/AddProduct";
import ProductList from "../components/Admin/ProductList";

export default function Admin() {

  const { user, login, logout, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    const { error } = await login(email, password);

    if (error) {
      setError(error.message);
    }

  };


  // Mientras revisa sesión
  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold text-[#d16224]">
          Cargando...
        </h2>
      </div>
    );

  }



  // =========================
  // LOGIN
  // =========================

  if (!user) {

    return (

      <div className="flex items-center justify-center min-h-screen bg-[#fff5ee] px-4">

        <form
          onSubmit={handleLogin}
          className="
          bg-white 
          p-8 
          rounded-2xl 
          shadow-xl 
          w-full 
          max-w-md 
          border 
          border-[#d16224]/30
          "
        >

          <h2 className="
          text-3xl 
          font-extrabold 
          text-[#d16224] 
          text-center 
          mb-6
          ">
            Panel Administrador
          </h2>


          {
            error && (

              <div className="
              bg-red-100 
              border 
              border-red-300 
              text-red-700 
              rounded-lg 
              p-3 
              mb-5 
              text-sm
              ">
                {error}
              </div>

            )
          }



          <input

            type="email"

            placeholder="Correo electrónico"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            className="
            w-full 
            p-3 
            border 
            rounded-lg 
            mb-4
            "

            required

          />



          <input

            type="password"

            placeholder="Contraseña"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

            className="
            w-full 
            p-3 
            border 
            rounded-lg 
            mb-6
            "

            required

          />



          <button

            type="submit"

            className="
            w-full 
            bg-[#d16224] 
            text-white 
            py-3 
            rounded-lg 
            hover:bg-[#b6511d]
            transition
            "

          >

            Iniciar Sesión

          </button>


        </form>

      </div>

    );

  }



  // =========================
  // PANEL ADMIN
  // =========================

  return (

    <div className="container mx-auto px-4 py-10">


      <div className="
      flex 
      justify-between 
      items-center 
      mb-8
      ">


        <div>

          <h1 className="
          text-3xl 
          font-bold 
          text-[#d16224]
          ">
            Panel de Administración
          </h1>


          <p className="text-gray-500 mt-1">

            {user.email}

          </p>


        </div>



        <button

          onClick={logout}

          className="
          bg-red-600 
          text-white 
          px-5 
          py-2 
          rounded-lg 
          hover:bg-red-700 
          transition
          "

        >

          Cerrar sesión

        </button>



      </div>



      <div className="space-y-10">


        <AddProduct />


        <ProductList />


      </div>



    </div>

  );

}