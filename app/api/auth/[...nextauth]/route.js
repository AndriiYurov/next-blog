import NextAuth from "next-auth/next";
import { authOption } from "@/utils/authOption";

const handler = NextAuth(authOption);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };

