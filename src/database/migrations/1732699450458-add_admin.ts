import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAdmin1732699450458 implements MigrationInterface {
    name = 'AddAdmin1732699450458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ADD "role_scope" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "role" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "role" SET DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role_scope"`);
    }

}
