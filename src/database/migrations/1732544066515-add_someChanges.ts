import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSomeChanges1732544066515 implements MigrationInterface {
    name = 'AddSomeChanges1732544066515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_41521b2efc956015ccbc99db550"`);
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "role" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role_name"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" ADD CONSTRAINT "FK_fd32421f2d93414e46a8fcfd86b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68"`);
        await queryRunner.query(`ALTER TABLE "admin" DROP CONSTRAINT "FK_fd32421f2d93414e46a8fcfd86b"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role_name"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD "role_name" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "admin" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "admin" ADD "role_id" character varying NOT NULL DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "admin" RENAME COLUMN "role_id" TO "role"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_41521b2efc956015ccbc99db550" FOREIGN KEY ("role_name") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
