import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  const users = [];

  // Criação de 3 usuários
  for (let i = 0; i < 3; i++) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        username: faker.internet.username(),
        avatar: faker.image.avatar(),
        password: hashedPassword,
        bio: faker.lorem.sentence(),
        posts: {
          create: Array.from({ length: 3 }, () => ({
            title: faker.lorem.sentence(),
            description: faker.lorem.sentences(2),
            content: faker.lorem.paragraphs(8),
            banner: faker.image.urlLoremFlickr({ category: 'nature' }),
            slug: faker.lorem.slug(),
            published: faker.datatype.boolean(),
          })),
        },
      },
    });
    users.push(user);
  }

  console.log('Seeding completed:');
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
