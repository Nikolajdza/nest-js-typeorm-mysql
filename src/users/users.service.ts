import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { CreateUserProfileDto } from './dtos/CreateUserProfile.dto';
import { Profile } from '../typeorm/entities/Profile';
import { Post } from '../typeorm/entities/Post';
import { CreateUserPostDto } from './dtos/CreateUserPost.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(dto: CreateUserDto) {
    const user = this.userRepository.create({
      ...dto,
      createdAt: new Date(),
    });
    return this.userRepository.save(user);
  }

  updateUserById(id: number, dto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...dto });
  }

  deleteUserById(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(id: number, dto: CreateUserProfileDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const profile = this.profileRepository.create(dto);
    await this.profileRepository.save(profile);
    user.profile = profile;
    return this.userRepository.save(user);
  }

  async createUserPost(id: number, dto: CreateUserPostDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const post = this.postRepository.create({ ...dto, user });
    return this.postRepository.save(post);
  }
}
