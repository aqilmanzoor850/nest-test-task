import { EntityRepository, Repository } from 'typeorm';
import * as bycrpt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bycrpt.genSalt();
    const hashedPassword = await bycrpt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        // duplicate error code check it on postgres
        throw new ConflictException('Username already exists!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
