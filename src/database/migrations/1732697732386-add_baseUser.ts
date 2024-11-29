import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseUser1732697732386 implements MigrationInterface {
    name = 'AddBaseUser1732697732386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_8dacf95422ebed27352daf63027"`);
        await queryRunner.query(`ALTER TABLE "managers" DROP CONSTRAINT "FK_2fb9afbc96f74ea1ea7026d6936"`);
        await queryRunner.query(`ALTER TABLE "buyers" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`ALTER TABLE "managers" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role_name"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "managers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "managers" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "admin" ALTER COLUMN "role" SET DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "managers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "managers" ADD "role" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD "role" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "managers" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "buyers" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "managers" ADD CONSTRAINT "FK_2fb9afbc96f74ea1ea7026d6936" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_8dacf95422ebed27352daf63027" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
