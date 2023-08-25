import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2"
import { AuthDTO } from "./dto";
@Injectable({})
export class AuthService {
    constructor(private prismaServe: PrismaService) {

    }
    doSomething() {
        console.log('hello bro')
    }
    async register (authDTO: AuthDTO) {
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
    }
    login() {
        return {
            message: "this is login"
        }
    }
}