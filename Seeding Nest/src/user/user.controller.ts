import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('post')
    async create(@Body() user: User): Promise<User> {
        return this.userService.create(user);

    }




    @Get(':email')
    async findByEmail(@Param('id') email: string) {
        return this.userService.findByEmail(email);
    }

    @Get('id/:id')
    async findbyId(@Param('id')id: number){
        // console.log(id);
        
        return await this.userService.findbyId(id);

    }


    @Put('put')
    async updated(@Param('id') id: number, @Body() user: User) {
        return this.userService.updated(id, user);
    }
    @Delete('delete/:id')
    async remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}





