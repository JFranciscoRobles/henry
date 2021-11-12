import React, { ReactElement } from "react";
import { useSession } from "next-auth/client";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

function ModificarObjeto({ objeto }: any): ReactElement {
  const [session, loading] = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    modificarObjeto(data, router, objeto.id);
  };

  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full p-4 my-4">
          <div className="grid items-center justify-center w-full grid-cols-1">
            <h1 className="w-full text-5xl font-bold text-center text-black ">
              Modificar Paquete
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-6xl p-4 my-8 space-y-5 text-xl shadow-md"
          >
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Norreo: </label>
              <input
                type="text"
                placeholder={objeto.nombre}
                {...register("nombre", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Precio: </label>
              <input
                type="number"
                placeholder={objeto.precio}
                {...register("precio", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Descripción: </label>
              <input
                type="text"
                placeholder={objeto.description}
                {...register("description", { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-semibold">URL de la Imagen: </label>
              <input
                type="text"
                value={objeto.imageUrl}
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

export default ModificarObjeto;

const prisma = new PrismaClient();

export const getServerSideProps = async ({ params }: any) => {
  const objeto = await prisma.objeto.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return { props: { objeto } };
};

const modificarObjeto = async (data: any, router: any, id: number) => {
  axios
    .put("/api/putObject", {
      data: { id, data },
    })
    .then(function (response: any) {
      router.push("/objetos");
    })
    .catch(function (error: any) {
      alert("Ya hay un objeto con los mismos datos");
    });
};
