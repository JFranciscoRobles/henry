import React, { ReactElement } from "react";
import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/client";
import { PrismaClient } from "@prisma/client";
import UserCard from "../../components/UserCard";
import Link from "next/link";

const prisma = new PrismaClient();
interface Props {
  users: any;
}

function Usuarios({ users }: Props): ReactElement {
  const [session, loading] = useSession();
  if (session) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center w-full p-4">
          <div className="grid items-center justify-center w-full grid-cols-12">
            <h1 className="w-full col-span-6 ml-24 text-5xl font-bold text-right text-black ">
              Usuarios
            </h1>
            <div className="flex flex-row-reverse w-full col-span-6 ">
              <Link href="/usuarios/crear" passHref>
                <button className="p-2 font-semibold text-white bg-blue-600 ">
                  Crear Usuario
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full my-10 max-w-7xl">
            {users.map((user: any, index: any) => (
              <UserCard user={user} key={index} />
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
  const users = await prisma.usuario.findMany();
  return { props: { users } };
};
