import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  const { data, carrito, precio } = req.body.data;
  const formatCarrito = carrito.map((item: any) => {
    return { id: item.producto.id };
  });
  const formatDate = new Date(data.fecha);

  try {
    await prisma.cuenta.create({
      data: {
        nombreCliente: data.nombreCliente,
        nombreEmpleado: data.nombreEmpleado,
        fecha: formatDate,
        precioFinal: precio,
        objetos: { connect: formatCarrito },
      },
    });
    return res.json({ msg: "Cuenta creada" });
  } catch (error) {
    throw error;
  }
}
