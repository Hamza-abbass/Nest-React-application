import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private readonly algorithm = 'aes-256-gcm';
    private readonly key = crypto.scryptSync('secret-key', 'salt', 32);
    private readonly iv = crypto.randomBytes(16);
    encrypt(text: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted = encrypted + cipher.final('hex');
        return `${this.iv.toString('hex')}:${encrypted}:${cipher.getAuthTag().toString('hex')}`;

    }
}
