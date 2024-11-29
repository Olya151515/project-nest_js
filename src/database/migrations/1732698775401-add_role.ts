import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRole1732698775401 implements MigrationInterface {
    name = 'AddRole1732698775401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role_scope" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "role_scope" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "managers" ADD "role_scope" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "role" SET DEFAULT 'admin'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "managers" DROP COLUMN "role_scope"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "role_scope"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role_scope"`);
    }

}
