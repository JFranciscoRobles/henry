import React, { ReactElement } from "react";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";

function CrearObjeto(): ReactElement {
  const [session, loading] = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    crearObjeto(data, router);
  };

  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="grid items-center justify-center w-full grid-cols-1">
            <h1 className="w-full text-5xl font-bold text-center text-black ">
              Crear Paquete
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-6xl p-4 my-8 space-y-5 text-xl shadow-md"
          >
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Nombre: </label>
              <input
                placeholder="Nombre"
                type="text"
                {...register("nombre", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Precio: </label>
              <input
                type="number"
                {...register("precio", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Descripción: </label>
              <input
                type="text"
                {...register("description", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">URL de la Imagen: </label>
              <input
                type="text"
                {...register("imageUrl", { required: true })}
              />
            </div>

            <input
              className="p-2 font-semibold text-white bg-blue-600"
              type="submit"
            />
          </form>
        </div>
      </>
    );
  }
  return (
    <div>
      <h1>Sesion No Iniciada</h1>
    </div>
  );
}

export default CrearObjeto;

const crearObjeto = async (data: any, router: any) => {
  axios
    .post("/api/postObject", {
      data: data,
    })
    .then(function (response: any) {
      router.push("/paquetes");
    })
    .catch(function (error: any) {
      alert("Ya hay un objeto con los mismos datos");
    });
};
