import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BookmarkController } from './bookmark.controller';

@Module({
  imports: [PrismaModule],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
