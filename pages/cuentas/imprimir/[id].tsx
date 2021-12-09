import React, { ReactElement, useRef, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useReactToPrint } from "react-to-print";

interface Props {
  cuenta: any;
}

function FichaTecnica({ cuenta }: Props): ReactElement {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    // @ts-ignore */}
    content: () => componentRef.current,
  });
  console.log(cuenta);
  useEffect(() => {
    // @ts-ignore */}
    handlePrint();
  });
  return (
    <>
      <button onClick={handlePrint}>Imprimir</button>

      <div
        // @ts-ignore */}
        ref={componentRef}
        className="flex flex-col items-center w-full max-w-5xl shadow-sm print:my-0"
      >
        <div className="flex flex-col items-center w-full min-h-screen bg-white shadow-md p-14">
          <div className="flex flex-col space-y-2 w-full h-[600px]  p-8 border-2 border-black border-solid ">
            <h1 className="text-2xl font-bold text-center">Pampas</h1>
            <span className="text-xl font-bold">
              Cliente: {cuenta.nombreCliente}
            </span>
            <span className="text-lg font-semibold">
              Total: {cuenta.precioFinal} Pesos
            </span>
            <span className="text-base text-gray-700">
              Fecha: {cuenta.fecha.toString()}
            </span>
            <span>Creado el: {cuenta.registeredAt.toString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FichaTecnica;

export const getServerSideProps = async ({ params }: any) => {
  const cuenta = await prisma.cuenta.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  return { props: { cuenta } };
};
