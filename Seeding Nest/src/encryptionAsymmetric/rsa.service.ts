import { Injectable, Logger } from "@nestjs/common";
import NodeRSA from 'node-rsa';


@Injectable()
export class RsaService {
    private key = NodeRSA;
    private logger = new Logger(RsaService.name);
    constructor() {
        this.key = new NodeRSA({ b: 2048 });
    }
    Encrypt(data: string): string {
        const encrypted = this.key.encrypt(data, 'base64');
        return encrypted;
    }
    Decrypt(encryptedData: string): string {
        const decrypted = this.key.decrypt(encryptedData, 'utf8');
        return decrypted;
    }

}


