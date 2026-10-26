import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";
import { signToken } from "../../lib/jwt";
import { AppError } from "../../utils/appError";

const SALT_ROUNDS = 12;

interface RegisterInput {
    fullName: string;
    email: string;
    password: string;
    role: "CUSTOMER" | "PROVIDER";
}

export async function registerUser(input: RegisterInput) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
        throw new AppError(409, "EMAIL_ALREADY_EXISTS", "An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: {
            fullName: input.fullName,
            email: input.email,
            passwordHash,
            role: input.role,
        },
        select: { id: true, fullName: true, email: true, role: true, createdAt: true },
    });

    const token = signToken({ userId: user.id, role: user.role });

    return { user, token };
}

interface LoginInput {
    email: string;
    password: string;
}

export async function loginUser(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });

    if (!user) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    if (user.status === "SUSPENDED") {
        throw new AppError(403, "ACCOUNT_SUSPENDED", "This account has been suspended");
    }

    const isMatch = await bcrypt.compare(input.password, user.passwordHash);
    if (!isMatch) {
        throw new AppError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const token = signToken({ userId: user.id, role: user.role });

    const { passwordHash, ...safeUser } = user;

    return { user: safeUser, token };
}

export async function getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            status: true,
            phone: true,
            bio: true,
            profileImage: true,
            createdAt: true,
        },
    });

    if (!user) {
        throw new AppError(404, "USER_NOT_FOUND", "User not found");
    }

    return user;
}