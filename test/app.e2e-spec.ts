import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
// how to open prisma studio on "TEST" database
// npx dotenv -e .env.test -- prisma studio

// how to open prisma studio on "DEV" database
// npx dotenv -e .env -- prisma studio

describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaSerice: PrismaService;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    prismaSerice = app.get(PrismaService);
    await prismaSerice.cleanDatabase();
  });

  afterAll(async () => {
    console.log('done');
    app.close();
  });
  it.todo('should PASS 1');
  it.todo('should PASS 2');
});
