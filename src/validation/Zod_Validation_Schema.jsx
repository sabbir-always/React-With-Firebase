import { z } from "zod";
const nameRegex = /^[A-Za-z\u0980-\u09FF\s.'-]+$/; // English + Bangla

export const signupSchema = z.object({
    first_name: z
        .string().trim()
        .min(2, { message: "First Name must be at least 2 characters long" })
        .max(30, { message: "First Name must be at most 30 characters long" })
        .regex(nameRegex, { message: "Invalid name format" }),

    last_name: z
        .string().trim()
        .min(2, { message: "Last Name must be at least 2 characters long" })
        .max(30, { message: "Last Name must be at most 30 characters long" })
        .regex(nameRegex, { message: "Invalid name format" }),

    email: z
        .string().trim().toLowerCase()
        .email({ message: "Invalid email format" }),

    password: z
        .string().trim()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(15, { message: "Password must be at most 15 characters long" })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number."),

    confirm_password: z
        .string().trim()
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(15, { message: "Password must be at most 15 characters long" })
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
        .regex(/[0-9]/, "Password must contain at least one number."),
        
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match", path: ["confirm_password"]
});