import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      cli: { migrationsDir: 'src/migration' },
    }),
    CategoryModule,
  ],
})
export class AppModule {}
