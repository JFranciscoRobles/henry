import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  console.log(req.body);
  try {
    await prisma.objeto.delete({
      where: {
        id: parseInt(req.body),
      },
    });
    res.json({ msg: "Objeto Eliminado" });
  } catch (error) {
    res.json({ msg: "Ha ocurrido un error" });
  }
}
