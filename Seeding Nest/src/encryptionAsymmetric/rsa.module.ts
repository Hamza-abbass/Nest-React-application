import { Module } from "@nestjs/common";
import { RsaService } from "./rsa.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports:[ConfigModule.forRoot()],
    providers:[RsaService],
    exports:[RsaService]


    
})
export class RsaModule{}