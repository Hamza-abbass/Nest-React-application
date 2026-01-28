import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, ForbiddenException, Injectable, Logger, Res, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { randomInt } from 'crypto';
import { RsaService } from 'src/encryptionAsymmetric/rsa.service';
import { EncryptionDecryptionServiceCBC } from 'src/SymmetricAlgorithms/encryption_decryptionCBC.service';
import { EncryptionDecryptionServiceCCM } from 'src/SymmetricAlgorithms/encryption_decryptionCCM.service';
import { EncryptionDecryptionServiceCTR } from 'src/SymmetricAlgorithms/encryption_decryptionCTR.service';
import { EncryptionDecryptionServiceGCM } from 'src/SymmetricAlgorithms/encryption_decryptionGCM.service';
import { RedisService } from 'src/redis/redis.service';
import { Rolee } from 'src/seed/role.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
    private logger = new Logger(AuthService.name);
    constructor(
        @InjectRepository(Rolee)
        private roleRepository: Repository<Rolee>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailerService,
        private readonly redisService: RedisService,

        private readonly encryptionServiceGCM :EncryptionDecryptionServiceGCM,
        private readonly encryptionServiceCBC :EncryptionDecryptionServiceCBC,
        private readonly encryptionServiceCTR :EncryptionDecryptionServiceCTR,
        private readonly encryptionServiceCCM:EncryptionDecryptionServiceCCM,
        private readonly rsaService: RsaService,


    ) { }
    async new(username: string, email: string, password: string, role_id: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersService.create({ username, email, password: hashedPassword, role_id });
        return "The new id is created";
    }
    async getUser(id: number) {
        return await this.usersService.findbyId(id);
    }
    async updated(id: number, user: User) {
        await this.usersService.updated(id, user);
        return "The id is updated";
    }
    async remove(id: string) {
        this.usersService.remove(id)
        return "The ID you enterned in the url is deleted";
    }


    // Registeration Part
    async register(username: string, email: string, password: string, confirmPassword: string) {
        const otp = randomInt(100000, 999999).toString();
        const hashedOTP = await bcrypt.hash(otp, 10);
        const otp_expires_at = new Date(Date.now() + 1 * 60 * 1000);
        const existingUser = await this.usersService.findByEmail(email);
        const DbisVarified = existingUser?.isVarified;
        if (existingUser && DbisVarified == false) {

            const message = `This is your otp ${otp}`;
            this.mailService.sendMail({
                from: 'Hamza abbas <abbashamza59099@gmail.com>',
                to: email,
                subject: `Hi there`,
                text: message,
            })
            const result = await this.userRepository.update({ email }, { otp: hashedOTP, otp_expires_at: otp_expires_at });


            return { message: 'Verification screen again', id: existingUser.id }
        }
        if (existingUser && DbisVarified == true) {
            throw new BadRequestException("Email is already in use");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const HashedPassword = await bcrypt.hash(confirmPassword, 10);

        if (password == confirmPassword) {

            // ------- using Symmetric(GCM) Algorithm -------
            // const encryptUsername = this.encryptionServiceGCM.encrypt(username);
            // const decryptUsername = this.encryptionServiceGCM.decrypt(encryptUsername);


            // ------- using Symmetric(CBC) Algorithm -------
            // const encryptedUsername = this.encryptionServiceCBC.encryption(username);
            // const decryptUsername = this.encryptionServiceCBC.decryption(encryptedUsername);


            // ------- using Symmetric(CTR) Algorithm -------
            // const encryptedUsername = this.encryptionServiceCTR.encryption(username);
            // const decryptUsername = this.encryptionServiceCTR.decryption(encryptedUsername);


             // ------- using Symmetric(CCM) Algorithm -------
            // const encryptedUsername = this.encryptionServiceCCM.encryption(username);
            // const decryptUsername = this.encryptionServiceCCM.decryption(encryptedUsername);
            
            
            
            
            // ------- using Asymmetric Algorithm -------
            // const encryptUsername = this.rsaService.Encrypt(username);
            // const decryptUsername = this.rsaService.Decrypt(encryptUsername);


            const result = await this.usersService.create({ username, email, password: hashedPassword, confirmPassword: HashedPassword, role_id: '566bb6b2-a7b1-47ad-a4f6-ea730944a44b', otp: hashedOTP, otp_expires_at: otp_expires_at });
            const message = `This is your otp ${otp}`;
            this.mailService.sendMail({
                from: 'Hamza abbas <abbashamza59099@gmail.com>',
                to: email,
                subject: `Hi there`,
                text: message,
            })
            return { result, message: 'User is created' };
        } else {
            throw new UnauthorizedException('Please enter same passwords');
        }

    }
    // Varification after registration
    async varify(otp: string, id: number) {
        const usr = await this.userRepository.findOne({ where: { id: id } });
        if (!usr) {
            throw new UnauthorizedException("Invalid credentials");
        }
        let user;
        if (usr) {
            user = await bcrypt.compare(otp, usr?.otp)
        }
        if (user == false) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const now = Date.now();
        const dbExpire_time = usr.otp_expires_at.getTime();
        if (now > dbExpire_time) {
            throw new UnauthorizedException('Your Otp is expired!')
        }
        if (usr.isVarified == false) {
            usr.isVarified = true;
            await this.usersService.create(usr);
            return { message: "The user you Entered is varified now" }
        } else {
            return { message: "No need for varification its a varified user" }
        }

    }
    // Login SuperAdmin part 
    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        const Dbusername = user?.username;
        // const username = this.encryptionService.decrypt(Dbusername);
        // return username;
        if (!user) {
            throw new UnauthorizedException("You are not a registered user!");
        }
        const IsVarified = user.isVarified;
        const ispasswordvalid = await bcrypt.compare(password, user.password);
        if (!ispasswordvalid) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const role_id = user.role_id;
        const data = await this.roleRepository.findOne({

            where: { role_id: role_id }
        });
        const name = data?.name;
        if (name !== 'superAdmin') {
            throw new ForbiddenException("Users and Admins are not allowed!")
        }
        if (IsVarified == false) {

            throw new UnauthorizedException('Verify Yourself first');
        }

        const otp = randomInt(100000, 999999).toString();
        const hashedOTP = await bcrypt.hash(otp, 6);
        const time_expiry = new Date(Date.now() + 1 * 60 * 1000);
        const otpSessionId = crypto.randomUUID();
        await this.userRepository.update({ email }, { Code: hashedOTP, otp_expires_at: time_expiry, otpSessionId: otpSessionId });
        const mess = `This is your Otp from Nest Js ${otp}`;
        this.mailService.sendMail({
            from: 'Hamza abbas <abbashamza59099@gmail.com>',
            to: email,
            subject: `Hi there`,
            text: mess,

        });
        const id = user.id;
        // this.logger.log(id);



        const text = 'OTP is SENT to your Email';
        return { otpSessionId: otpSessionId, message: text, role: name, id: id }
    }

    // VerifyOTP superAdmin admin user after login
    async verify(user: User) {
        const dbData = await this.userRepository.findOne({ where: { otpSessionId: user.otpSessionId } });
        if (!dbData) {
            throw new UnauthorizedException('No data found in the Db')
        }
        let hashedOTP;
        let otp_expires_at;
        if (dbData) {
            hashedOTP = dbData.Code;
            otp_expires_at = dbData.otp_expires_at;
        }
        const now = new Date();
        if (now > otp_expires_at) {
            throw new UnauthorizedException('Your OTP is expired')
        }
        const Otp = await bcrypt.compare(user.Code, hashedOTP);

        if (!Otp) {
            throw new UnauthorizedException('You are Entring and Invalid Otp');
        } else {
            const username = dbData.username;
            return { message: 'Successfully LoggedIn', sessionId: user.otpSessionId, username: username }
        }
    }

    // resendEmail

    async resendEmail(Id: number) {
        const user = await this.userRepository.findOneBy({ id: Id });
        const email = user?.email;
        const Otp = randomInt(100000, 999999).toString();
        const hashOtp = await bcrypt.hash(Otp, 10);
        const time_expiry = new Date(Date.now() + 1 * 60 * 1000);
        const NewMessage = `OTP for Your Account Verification:${Otp}`;
        this.mailService.sendMail({
            from: 'Hamza abbas <abbashamza59099@gmail.com>',
            to: email,
            subject: `Hi there`,
            text: NewMessage,

        });
        await this.userRepository.update({ email }, { otp: hashOtp, otp_expires_at: time_expiry });
        return 'The Otp is send again to your mail'

    }




    async ResendEmail(Id: number) {
        const user = await this.userRepository.findOneBy({ id: Id });
        // this.logger.log(user);
        const email = user?.email;
        const code = randomInt(100000, 999999).toString();
        const hashCode = await bcrypt.hash(code, 10);
        const time_expiry = new Date(Date.now() + 1 * 60 * 1000);
        const NewMessage = `OTP for Your Account Verification:${code}`;
        this.mailService.sendMail({
            from: 'Hamza abbas <abbashamza59099@gmail.com>',
            to: email,
            subject: `Hi there`,
            text: NewMessage,

        });
        await this.userRepository.update({ email }, { Code: hashCode, otp_expires_at: time_expiry });
        return 'The Otp is send again to your mail'

    }

    // Login Admin-user part 


    async Login(email: string, password: string) {

        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new ForbiddenException('You are not a registered user!');
        }
        const ispasswordvalid = await bcrypt.compare(password, user.password);
        if (!ispasswordvalid) {
            throw new ForbiddenException('Invalid credentials');
        }
        const role_id = user.role_id;
        const data = await this.roleRepository.findOne({
            where: { role_id: role_id }
        });

        const IsVarified = user.isVarified;
        if (IsVarified == false) {
            throw new UnauthorizedException('Please varify yourself!')
        }
        const otp = randomInt(100000, 999999).toString();
        const hashOtp = await bcrypt.hash(otp, 10);
        const time_expiry = new Date(Date.now() + 1 * 60 * 1000);

        const otpSessionId = crypto.randomUUID();
        const mess = `This is your Otp from Nest Js ${otp}`;
        this.mailService.sendMail({
            from: 'Hamza abbas <abbashamza59099@gmail.com>',
            to: email,
            subject: `Hi there`,
            text: mess,

        });


        // this.logger.log(time_expiry);

        const name = data?.name;
        if (name == 'user' || name == 'admin') {
            const id = user.id;
            this.logger.log(id);
            this.userRepository.update({ email }, { Code: hashOtp, otp_expires_at: time_expiry, otpSessionId: otpSessionId, });
            const text = 'OTP is SENT to your Email';
            return { otpSessionId: otpSessionId, message: text, role: name, id: id }


        } else {
            throw new ForbiddenException('SuperAdmins are not allowed!')
        }
    }



    // Data fetching and displaying on UI 
    // async getTotalUsers() {
    //     return await this.userRepository.count();
    // }

    // async getSuperAdmins() {
    //     return await this.userRepository.createQueryBuilder('user')
    //         .innerJoin('user.role', 'role').where('role.name = :name', { name: 'superAdmin' }).getCount();
    // }

    // async getAdmin() {
    //     return await this.userRepository.createQueryBuilder('user').innerJoin('user.role', 'role').where('role.name = :name', { name: 'admin' }).getCount();
    // }

    // async getUsers() {
    //     return await this.userRepository.createQueryBuilder('user').innerJoin('user.role', 'role').where('role.name = :name', { name: 'user' }).getCount();
    // }

    async getInfo() {
        return await this.userRepository.createQueryBuilder('user').select(['id', 'username', 'email', 'name', 'password', 'user.role_id']).innerJoin('user.role', 'role').getRawMany();
    }



    async getNumbersOnUI() {
        const totalUser = await this.userRepository.count();
        const superAdmin = await this.userRepository.createQueryBuilder('user')
            .innerJoin('user.role', 'role').where('role.name = :name', { name: 'superAdmin' }).getCount();
        const admin = await this.userRepository.createQueryBuilder('user').innerJoin('user.role', 'role').where('role.name = :name', { name: 'admin' }).getCount();
        const user = await this.userRepository.createQueryBuilder('user').innerJoin('user.role', 'role').where('role.name = :name', { name: 'user' }).getCount();
        return {
            'totalUser': totalUser,
            'superAdmin': superAdmin,
            'admin': admin,
            'user': user
        }
    }
    // Data fetching and displaying on UI 


    // Create Update and Delete methods 

    async createUI(username: string, email: string, password: string, confirmPassword: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const HashedPassword = await bcrypt.hash(confirmPassword, 10);
        const user = await this.usersService.findByEmail(email);
        if (user) {
            throw new UnauthorizedException('This Email is already in Use');
        }
        // this.logger.log(user);
        if (password == confirmPassword) {
            const createUser = await this.userRepository.create({ username, email, password: hashedPassword, confirmPassword: HashedPassword, role_id: '566bb6b2-a7b1-47ad-a4f6-ea730944a44b' });
            await this.userRepository.save(createUser);
            return { message: 'The User is created' }
        } else {
            return { message: 'Password are not same' }
        }

    }

    async deleteUI(id: string) {
        return this.usersService.remove(id)

    }

    async editUserUI(id: number, username: string, email: string, password: string, confirmPassword: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const HashedPassword = await bcrypt.hash(confirmPassword, 10);
        const user = await this.usersService.findByEmail(email);
        if (user) {
            throw new UnauthorizedException('Email is already in Use')
        } else {
            await this.userRepository.update({ id }, { username, email, password: hashedPassword, confirmPassword: HashedPassword });
            return { message: 'The user is updated' }
        }



    }






    // Refresh part 
    async refresh(req: any) {
        const ReqHeader = req.headers.authorization?.split(' ')[1];
        const Decode = this.jwtService.decode(ReqHeader);
        const email = Decode.user.email;
        const RedRefreshToken = await this.redisService.Client.get(`UserRefreshToken:${email}:email`);
        let Decodee;
        if (RedRefreshToken) {
            Decodee = this.jwtService.decode(RedRefreshToken)
        }
        const user = Decodee.user;
        const token = this.jwtService.sign({ user }, { secret: 'AccessToken' });
        const AccessToken = await this.redisService.Client.set(`UserAccessToken:${email}:email`, token, "EX", 120);
        return token;
    }

    // Logout Part 
    async logout(req: any) {
        const Reqheaders = req.sessionId;
        const dbData = await this.userRepository.findOne({ where: { otpSessionId: Reqheaders } });
        if (!dbData) {
            throw new UnauthorizedException('No data found in Db with this session Id');
        }
        const dbSessionId = dbData.otpSessionId;
        if (dbSessionId == Reqheaders) {
            await this.userRepository.update({ id: dbData.id }, { otpSessionId: '' })
        }
        return { message: 'Successfully LogOut' };
    }
}
