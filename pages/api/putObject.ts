import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    const user = await prisma.objeto.update({
      where: {
        id: req.body.data.id,
      },
      data: {
        precio: parseInt(req.body.data.data.precio),
        nombre: req.body.data.data.nombre,
        description: req.body.data.data.description,
        imageUrl: req.body.data.data.imageUrl,
      },
    });

    return res.json({ msg: "Objeto Modificado" });
  } catch (error) {
    throw error;
  }
}
