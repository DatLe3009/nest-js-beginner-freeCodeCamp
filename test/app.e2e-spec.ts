import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
    }));

    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(
            '/auth/signup'
          ).withBody({
            password: dto.password
          })
          .expectStatus(400)
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(
            '/auth/signup'
          ).withBody({
            email: dto.email
          })
          .expectStatus(400)
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .expectStatus(400)
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post(
            '/auth/signup'
          ).withBody(dto)
          .expectStatus(201)
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post(
            '/auth/signin'
          ).withBody({
            password: dto.password
          })
          .expectStatus(400)
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post(
            '/auth/signin'
          ).withBody({
            email: dto.email
          })
          .expectStatus(400)
      });
      it('should throw if no body provided', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .expectStatus(400)
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post(
            '/auth/signin'
          ).withBody(dto)
          .expectStatus(200)
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {});

    describe('Edit User', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create Bookmark', () => {

    });

    describe('Get Bookmarks', () => {
      
    });

    describe('Get Bookmark by id', () => {
      
    });

    describe('Edit Bookmark', () => {
      
    });

    describe('Delete Bookmark', () => {
      
    });
  });
})