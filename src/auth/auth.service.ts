import { Injectable } from "@nestjs/common";
@Injectable({})
export class AuthService {
    doSomething() {
        console.log('hello bro')
    }
    register() {
        return {
            message: 'Register an user'
        }
    }
    login() {
        return {
            message: "this is login"
        }
    }
}