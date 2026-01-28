import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto'

@Injectable()
export class EncryptionDecryptionServiceCCM {
    private readonly algorithm = 'aes-256-ccm';
    private readonly key = crypto.scryptSync('secret-key', 'salt', 32);

    encryption(text: string) {
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv(this.algorithm, this.key, iv, {
            authTagLength: 16
        });

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted = encrypted + cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`


    }

    decryption(encryptedText: string) {
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted data format')

        }
        const iv = Buffer.from(parts[0], 'hex');
        const encrypted = parts[1];
        const authTag = Buffer.from(parts[2], 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv, {
            authTagLength: 16
        });
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encrypted,'hex','utf8');
        decrypted = decrypted + decipher.final('utf8');
        return decrypted;

    }
}
