import prisma from "@/app/libs/prismadb";
import getSesssion from "./getSession";

export const getUsers = async () => {
  const session = await getSesssion();
  if (!session?.user?.email) {
    return [];
  }
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });
    return users;
  } catch (error: any) {
    return [];
  }
};
