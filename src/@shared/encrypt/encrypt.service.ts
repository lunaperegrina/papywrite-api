import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  async hashString(str: string, salt = 10): Promise<string> {
    return bcrypt.hash(str, salt);
  }

  async compareStrings(str: string, hashedStr: string): Promise<boolean> {
    return bcrypt.compare(str, hashedStr);
  }
}
