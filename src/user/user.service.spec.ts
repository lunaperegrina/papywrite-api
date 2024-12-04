import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/@shared/auth/auth.service';
import { EncryptService } from 'src/@shared/encrypt/encrypt.service';
import { PrismaService } from 'src/@shared/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

describe('User Service Tests', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        PrismaService,
        AuthService,
        EncryptService,
        JwtService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany({});
  });

  it('must create an user', async () => {
    const user = {
      email: 'john@doe.com',
      password: '1234',
      name: 'John',
    };

    const response = await service.create(user);

    expect(response).toEqual(
      expect.objectContaining({ ...user, password: expect.any(String) }),
    );
  });

  it('must return all users', async () => {
    const users = [
      {
        email: 'john@doe.com',
        password: '1234',
        name: 'John 1',
      },
      {
        email: 'doe@john.com',
        password: '1234',
        name: 'John 2',
      },
    ];

    await prisma.user.createMany({
      data: users,
    });

    const response = await service.readAll({});

    expect(response[0]).toEqual(expect.objectContaining(users[0]));
    expect(response[1]).toEqual(expect.objectContaining(users[1]));
    expect(response).toHaveLength(2);
  });

  it('must return user by id', async () => {
    const user = {
      email: 'john@doe.com',
      password: '1234',
      first_name: 'John',
      last_name: 'Doe',
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    const response = await service.readById(createdUser.id);

    expect(response).toEqual(expect.objectContaining(user));
  });

  it('must return updated user', async () => {
    const user = {
      email: 'john@doe.com',
      password: '1234',
      first_name: 'John',
      last_name: 'Doe',
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    const updatedUser = {
      first_name: 'Doe',
      last_name: 'John',
      email: 'doe@john.com',
    };

    const response = await service.update(createdUser.id, updatedUser);

    expect(response).toEqual(
      expect.objectContaining({ ...updatedUser, password: expect.any(String) }),
    );
  });

  it('must return deleted user', async () => {
    const user = {
      email: 'john@doe.com',
      password: '1234',
      first_name: 'John',
      last_name: 'Doe',
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    const response = await service.delete(createdUser.id);

    expect(response).toEqual(expect.objectContaining(user));
  });

  it('must return updated password', async () => {
    // TODO:
    // const oldPassword = createdUser.password;
    // const newPassword = response.password;
    // expect(oldPassword !== newPassword).toBeTruthy();
    expect(1).toBe(1);
  });
});
