import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2"
import { AuthDTO } from "./dto";
import { error } from "console";
@Injectable({})
export class AuthService {
    constructor(private prismaServe: PrismaService) {

    }
    doSomething() {
        console.log('hello bro')
    }
    async register (authDTO: AuthDTO) {
        try {
            const hashedPassword = await argon.hash(authDTO.password);

        const user = await this.prismaServe.user.create({
            data: {
                email: authDTO.email,
                hashedPassword: hashedPassword,
                firstName: '',
                lastName: ''
            },
            // only select id, email, createdAt
            select: {
                id: true,
                email: true,
                createdAt: true
            }
        })

        // you shoulda add constraint "unique" to user table
        return user
        } catch(error) {
            if (error.code === 'P2002') {
                throw new ForbiddenException(error.message)
            }
            return {
                error: error
            }

        }
    }
    async login(authDTO: AuthDTO) {
        // find user with input email
        const user = await this.prismaServe
        .user.findUnique({
            where: {
                email: authDTO.email
            }
        })
        if (!user) {
            throw new ForbiddenException('User not found');
        }

        const passwordMatched = await argon.verify(
            user.hashedPassword,
            authDTO.password
        )
        if (!passwordMatched) {
            throw new ForbiddenException(
                'Incorrect password'
            )
        }
        delete user.hashedPassword;
        return user;

        return {
            message: "this is login"
        }
    }
}