import React from "react";
import Link from "next/link";

type typeAccount = {
  id: number;
  nombreCliente: number;
  nombreEmpleado: string;
  fecha: string;
  precioFinal: string;
  objetos: any;
};

interface Props {
  account: typeAccount;
}

const AccountCard = ({ account }: Props) => {
  return (
    <div className="flex flex-col w-full gap-2 p-2 my-2 font-semibold text-white bg-white shadow-lg hover:bg-gray-200 ">
      <div className="flex flex-col items-start w-full space-y-2 text-black">
        <span className="w-full text-2xl font-bold text-center ">Cuenta</span>
        <span className="text-xl font-bold">
          Cliente: {account.nombreCliente}
        </span>
        <span className="text-lg font-semibold">
          Total: {account.precioFinal} Pesos
        </span>
        <span className="text-base text-gray-700">
          Fecha: {account.fecha.toString()}
        </span>
        <Link href={`/cuentas/imprimir/${account.id}`} passHref>
          <button
            className="w-full p-2 font-semibold text-white bg-blue-600"
            type="submit"
          >
            Imprimir Cuenta
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AccountCard;
