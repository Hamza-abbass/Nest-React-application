import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class UITokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService

    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers.authorization?.split(' ')[1];

        try {
            const data = await this.jwtService.verify(headers, {
                secret: process.env.JWT_SECRET_KEY
            });
            return true

        } catch (error) {
            throw new UnauthorizedException('The token is expired')

        }



















    }
}