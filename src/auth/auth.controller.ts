import { Controller, Post, Body, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(
        @Body('email') email: string,
        @Body('password', ParseIntPipe) password: number,
    ) {
        console.log({
            email,
            password,
        });
        return this.authService.signup()
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }
}