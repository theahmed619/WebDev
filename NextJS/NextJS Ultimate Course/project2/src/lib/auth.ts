import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
const authOptions: NextAuthOptions = {
  providers: [
    //login kaise karoge
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;

        if (!email || !password) {
          throw new Error("email or password is not found");
        }

        await connectDb();
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect Password");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    // token ke ander user details daali
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token
    },
     // session ke ander user details daalega

        session({session,token}){
            if(session.user){
                session.user.id=token.id as string
                session.user.name=token.name
                session.user.email=token.email
                session.user.image=token.image as string
            }
            return session
        }
  },
  session: {},
  pages: {},

  secret: "",
};

export default authOptions;
