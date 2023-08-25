import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";
@Controller("auth")
export class AuthController {
    constructor(private authservice: AuthService) {
        authservice.doSomething()
    }

    // // some requests from client
    // @Post("register")
    // register(@Req() request) {
    //     console.log('request', request.body)
    //     return this.authservice.register()
    // }

    // some requests from client
    @Post("register")
    register(@Body() authDTO: AuthDTO) {
       
        
        return this.authservice.register(authDTO)
    }

    @Post("login")
    login() {
        return this.authservice.login()
    }
}