import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.enum";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Rolee } from "src/seed/role.entity";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,
        private readonly jwtService: JwtService,
        @InjectRepository(Rolee)
        private roleRepository: Repository<Rolee>
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const roles = this.reflector.get<Role>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        const decode = this.jwtService.decode(token);
        const user = decode.user;
        const role_id = user.role_id;
        const foreignData = await this.roleRepository.findOne({
            where: { role_id: role_id }
        });

        const name = foreignData?.name;

        if (roles == name) {
            return true
        } else {
            throw new ForbiddenException('Person not authenticated!')
        }
    }
}