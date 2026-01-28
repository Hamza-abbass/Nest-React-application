import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';

@Injectable()
export class EncryptionDecryptionServiceCBC {
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = crypto.scryptSync('secret-key', 'salt', 32)

    encryption(text: string) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted = encrypted + cipher.final('hex');
        return `${iv.toString('hex')}:${encrypted}`;

    }

    decryption(encryptedText: string) {
        const parts = encryptedText.split(':');
        if (parts.length !== 2) {
            throw new Error('Invalid encrypted data formate');
        }

        const iv = Buffer.from(parts[0],'hex');
        const encryptedData = parts[1];
        const decipher = crypto.createDecipheriv(this.algorithm,this.key,iv);
        let decrypted = decipher.update(encryptedData,'hex','utf8');
        decrypted = decrypted + decipher.final('utf8');
        return decrypted;


    }


}