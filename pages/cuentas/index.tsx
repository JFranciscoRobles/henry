import React, { ReactElement } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();
interface Props {
  cuentas: any;
}

function Usuarios({ cuentas }: Props): ReactElement {
  const [session, loading] = useSession();
  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full p-4">
          <div className="grid items-center justify-center w-full grid-cols-12">
            <h1 className="w-full col-span-6 ml-24 text-5xl font-bold text-right text-black ">
              Cuentas
            </h1>
            <div className="flex flex-row-reverse w-full col-span-6 ">
              <Link href="/cuentas/crear" passHref>
                <button className="p-2 font-semibold text-white bg-blue-600 ">
                  Crear Cuenta
                </button>
              </Link>
            </div>
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

export default Usuarios;

export const getServerSideProps = async () => {
  const cuentas = await prisma.cuenta.findMany();
  return { props: { cuentas } };
};
