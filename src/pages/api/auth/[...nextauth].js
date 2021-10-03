import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "your.email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize() {
        return {
          id: "1",
          name: "Ryan Boone",
          email: "falldowngoboone@gmail.com",
        };
      },
    }),
  ],
});
