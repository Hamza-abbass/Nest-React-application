import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisModule } from 'src/redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Rolee } from 'src/seed/role.entity';
import { EncryptionDecryptionModule } from 'src/encryption_decryption/encryption_decryption.module';


@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports:[UserModule,JwtModule,RedisModule,EncryptionDecryptionModule,TypeOrmModule.forFeature([User,Rolee])]
})
export class AuthModule {}
