import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, Request, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorators';
import Role from './roles.enum';
import { SignupDto } from './signup.dto';
import { LoginDto } from './login.dto';
import { User } from 'src/user/user.entity';
import { VarifyDto } from './varify.dto';
import { TokenGurad } from './token.guard';
import { LogoutGuard } from './logout.guard';
import { UITokenGuard } from './UIToken.guard';



@Controller('auth')
export class AuthController {
    private logger = new Logger(AuthController.name)
    constructor(private readonly authService: AuthService,
        // private readonly encryptionService: EncryptionService
    ) { }

    // Roles 
    // @Post('create-role')
    // @UseGuards(TokenGurad)
    // @Roles(Role.SuperAdmin)
    // @UsePipes(new ValidationPipe({
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    // }))
    // create(@Body() signupDto: SignupDto) {
    //     return this.authService.new(
    //         signupDto.username,
    //         signupDto.email,
    //         signupDto.password,
    //         signupDto.role_id
    //     );
    // }
    // @Get(':id')
    // @Roles(Role.Admin)
    // getUser(@Param('id') id: number) {
    //     return this.authService.getUser(id);
    // }
    // @Put(':id')
    // @Roles(Role.Admin)
    // updated(@Param('id') id: number, @Body() user: User) {
    //     return this.authService.updated(id, user);
    // }
    // @Delete(':id')
    // @Roles(Role.SuperAdmin)
    // remove(@Param('id') id: string) {
    //     return this.authService.remove(id);
    // }
    // Roles 



    // Registration Part 
    @Post('register')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }))
    async register(@Body() signupDto: SignupDto) {


        return this.authService.register(
            signupDto.username,
            signupDto.email,
            signupDto.password,
            signupDto.confirmPassword,
            // signupDto.role_id,
        )
    }
    // Varification part 
    @Post('varify')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))

    async varify(@Body() varifyDto: VarifyDto) {
        return this.authService.varify(
            varifyDto.otp,
            varifyDto.id,

        )

    }
    // Login superAdmin part
    @Post('login/superAdmin')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(
            loginDto.email,
            loginDto.password,
        )
    }

    @Post('VerifyOTP')
    async Verify(@Body() user: User) {
        return await this.authService.verify(user);



    }
    @Post('resendEmail')
    async resendEmail(@Body() body: { id: number }) {
        const Id = body.id;
        return this.authService.resendEmail(Id);

    }


    @Post('emailResend')
    async ResendEmail(@Body() body: { id: number }) {
        const Id = body.id;
        return this.authService.ResendEmail(Id);

    }

    // Login Admin/User part
    @Post('login/admin-user')
    async Login(@Body() loginDto: LoginDto) {
        return await this.authService.Login(
            loginDto.email,
            loginDto.password,

        )
    }



    @Get('get/getInfo')
    async getInfo() {
        return await this.authService.getInfo();
    }




    @Get('NumberData')
    async getNumbersOnUI() {
        return this.authService.getNumbersOnUI();

    }


    // Data fetching and displaying on UI 


    // Logout part 
    @Post('logout')
    // @UseGuards(LogoutGuard)
    async logout(@Body() req: any) {
        return this.authService.logout(req);
    }



    // Refresh part 
    @Post('refresh')

    async refresh(@Request() req: any) {
        return await this.authService.refresh(req);

    }


    // Create Update and Delete methods 
    @Post('createUI')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))
    // @UseGuards(UITokenGuard)

    async createUI(@Body() signupDto: SignupDto) {
        return await this.authService.createUI(
            signupDto.username,
            signupDto.email,
            signupDto.password,
            signupDto.confirmPassword,

        );
    }

    @Put('edit/:id')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true
    }))
    async editUserUI(@Param('id') id: number, @Body() signupDto: SignupDto) {
        return await this.authService.editUserUI(
            id,
            signupDto.username,
            signupDto.email,
            signupDto.password,
            signupDto.confirmPassword

        );
    }


    @Delete('deleteUI/:id')
    // @UseGuards(UITokenGuard)
    async deleteUI(@Param('id') id: string) {
        return this.authService.deleteUI(id);
    }





    // @Get('encryption')
    // testEncryption(): string {
    //     const sensitiveData = 'This is a secret message';
    //     const encryptedData = this.encryptionService.encrypt(sensitiveData);
    //     return `Original:${sensitiveData}\nEncrypted:${encryptedData} `;
    // }









}
