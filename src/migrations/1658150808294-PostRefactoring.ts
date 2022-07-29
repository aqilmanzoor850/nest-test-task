import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1658150808294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "TaskStatus" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE')`,
      undefined,
    );

    await queryRunner.query(
      `
        CREATE TABLE "task" (
          "id" uuid PRIMARY KEY,
          "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
          "title" json NOT NULL,
          "description" json NOT NULL,
          "status" "TaskStatus" NOT NULL
        )
      `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('task');
  }
}
