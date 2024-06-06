import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es requerida"),
  price: z.string().min(1, "El precio es requerido"),
  isNew: z.boolean().optional(),
  inStock: z.boolean().optional(),
  keywords: z.string().optional(),
  redirectToProductPage: z.boolean().optional(),
});

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});

export const userSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().min(1, "El correo es requerido"),
  phone: z.string().min(1, "El telefono es requerido"),
  address: z.string().min(1, "La dirección es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  provinceId: z.string().min(1, "La provincia es requerida"),
  zipCode: z.string().min(1, "El C.P. es requerido"),
  comments: z.string().optional(),
});
