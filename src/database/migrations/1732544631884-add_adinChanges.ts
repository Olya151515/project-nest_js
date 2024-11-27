import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdinChanges1732544631884 implements MigrationInterface {
    name = 'AddAdinChanges1732544631884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_fd32421f2d93414e46a8fcfd86b"`);
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" character varying NOT NULL DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_fd32421f2d93414e46a8fcfd86b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
