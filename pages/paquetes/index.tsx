import React, { ReactElement } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ObjectCard from "../../components/ObjectCard";

const prisma = new PrismaClient();
interface Props {
  objetos: any;
}

function Objetos({ objetos }: Props): ReactElement {
  const [session, loading] = useSession();
  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full p-4">
          <div className="grid items-center justify-center w-full grid-cols-12">
            <h1 className="w-full col-span-6 ml-24 text-5xl font-bold text-right text-black ">
              Paquetes
            </h1>
            <div className="flex flex-row-reverse w-full col-span-6 ">
              <Link href="/paquetes/crear" passHref>
                <button className="p-2 font-semibold text-white bg-blue-600 ">
                  Crear Paquete
                </button>
              </Link>
            </div>
          </div>
          <div className="grid w-full grid-cols-5 my-2 space-y-5 ">
            {objetos.map((objeto: any, index: any) => (
              <ObjectCard key={index} object={objeto} />
            ))}
          </div>
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

export default Objetos;

export const getServerSideProps = async () => {
  const objetos = await prisma.objeto.findMany();
  return { props: { objetos } };
};
