import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionDecryptionServiceGCM {
    private readonly algorithm = 'aes-256-gcm';
    private readonly key = crypto.scryptSync('secret-key', 'salt', 32);
    private readonly iv = crypto.randomBytes(16);
    encrypt(text: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted = encrypted + cipher.final('hex');
        return `${this.iv.toString('hex')}:${encrypted}:${cipher.getAuthTag().toString('hex')}`;

    }


    decrypt(encryptedText: string): string {
        const parts = encryptedText.split(':');
        if (parts.length !== 3) {
            throw new Error('Invalid encrypted data format');
        }
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedData = parts[1];
        const authTag = Buffer.from(parts[2], 'hex');
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted = decrypted + decipher.final('utf8');
        return decrypted;
    }




}