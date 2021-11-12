import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
type typeObject = {
  id: number;
  precio: number;
  nombre: string;
  description: string;
  imageUrl: string;
};

interface Props {
  object: typeObject;
}

const ObjectCard = ({ object }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full gap-2 p-2 my-2 text-xl font-semibold text-center text-white bg-white shadow-lg hover:bg-gray-200 ">
      <Image
        src={object.imageUrl}
        alt="Picture of the author"
        width={600}
        height={500}
      />
      <div className="flex flex-col items-start text-black">
        <span className="font-bold">{object.nombre}</span>
        <span className="font-semibold">Precio: {object.precio} Pesos</span>
        <span className="text-lg text-gray-800"> {object.description} </span>
      </div>
      <Link href={`/paquetes/modificar/${object.id}`} passHref>
        <button className="bg-blue-600">Modificar</button>
      </Link>
      <button
        onClick={() => eliminarObjeto(object.id, router)}
        className="bg-red-600"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ObjectCard;

const eliminarObjeto = async (id: any, router: any) => {
  axios
    .delete("/api/deleteObject", {
      data: id,
    })
    .then(function (response: any) {
      router.reload(window.location.pathname);
    })
    .catch(function (error: any) {
      console.log(error);
    });
};
