import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req: any, res: any) {
  try {
    const user = await prisma.usuario.update({
      where: {
        id: req.body.data.id,
      },
      data: {
        username: req.body.data.data.nombre,
        email: req.body.data.data.correo,
        password: req.body.data.data.password,
        role: req.body.data.data.rol,
      },
    });

    return res.json({ msg: "Usuario Modificado" });
  } catch (error) {
    throw error;
  }
}
