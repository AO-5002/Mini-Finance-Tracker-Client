import { z } from "zod";

type User = {
  auth0_id?: string;
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = z.object({
  auth0_id: z.string(),
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export { type User, UserSchema };
