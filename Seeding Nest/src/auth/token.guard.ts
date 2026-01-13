import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/redis/redis.service"

@Injectable()
export class TokenGurad implements CanActivate {
    constructor(
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const ReqToken = request.headers.authorization?.split(' ')[1];
        const ReqDecode = this.jwtService.decode(ReqToken);
        const email = ReqDecode.user.email;
        const RedToken = await this.redisService.Client.get(`UserAccessToken:${email}:email`);
        const result = ReqToken == RedToken;
        if (result) {
            return true
        } else {
            throw new ForbiddenException("Your Token is expired")
        }







    }
}