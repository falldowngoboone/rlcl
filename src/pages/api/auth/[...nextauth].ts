import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: { jwt: true },
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
      // @ts-ignore - see https://github.com/nextauthjs/next-auth/issues/2080
      async authorize({ username, password }, req) {
        if (
          username === "falldowngoboone@gmail.com" &&
          password === "password"
        ) {
          return {
            id: "1",
            name: "Ryan Boone",
            email: "falldowngoboone@gmail.com",
          };
        }

        return null;
      },
    }),
  ],
});
