import React, { ReactElement } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import AccountCard from "../../components/AccountCard";

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
          <div className="grid items-center justify-center w-full grid-cols-1 gap-4">
            <Link href="/cuentas/crear" passHref>
              <button className="p-2 ml-auto font-semibold text-white bg-blue-600 w-36">
                Crear Cuenta
              </button>
            </Link>
            <h1 className="w-full text-4xl font-bold text-center text-black md:text-5xl ">
              Cuentas
            </h1>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 my-2 md:grid-cols-3 lg:grid-cols-5 ">
            {cuentas.map((cuenta: any, index: any) => (
              <AccountCard key={index} account={cuenta} />
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

export default Usuarios;

export const getServerSideProps = async () => {
  const cuentas = await prisma.cuenta.findMany();
  return { props: { cuentas } };
};
