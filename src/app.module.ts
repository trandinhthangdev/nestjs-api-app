import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, NoteModule, AuthModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
