import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, NoteModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
