import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: ["CUSTOMER", "ADMIN"] as const,
        required: false,
        defaultValue: "CUSTOMER",
        input: false, // don't allow user to set role during signup
      },
    },
  },
});
