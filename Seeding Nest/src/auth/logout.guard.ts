import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "src/redis/redis.service";

@Injectable()
export class LogoutGuard implements CanActivate{
    constructor ( 
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService
    ){}
        async canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const GetHeader = request.headers.authorization?.split(' ')[1];
        const Decode = this.jwtService.decode(GetHeader);
        const email = Decode.user.email;
        const RedToken = await this.redisService.Client.get(`usertoken:${email}:email`);
        // console.log(RedToken);

        if(GetHeader == RedToken ){
            return true
        }else{
            throw new ForbiddenException("User is not loggedIn");
        }

        
    }
}