import { Module } from "@nestjs/common";
import { EncryptionDecryptionServiceGCM } from "./encryption_decryptionGCM.service";
import { EncryptionDecryptionServiceCBC } from "./encryption_decryptionCBC.service";
import { EncryptionDecryptionServiceCTR } from "./encryption_decryptionCTR.service";
import { EncryptionDecryptionServiceCCM } from "./encryption_decryptionCCM.service";

@Module({
    providers:[EncryptionDecryptionServiceGCM,EncryptionDecryptionServiceCBC,EncryptionDecryptionServiceCTR,EncryptionDecryptionServiceCCM],
    exports:[EncryptionDecryptionServiceGCM,EncryptionDecryptionServiceCBC,EncryptionDecryptionServiceCTR,EncryptionDecryptionServiceCCM]
     

})
export class EncryptionDecryptionModule{}