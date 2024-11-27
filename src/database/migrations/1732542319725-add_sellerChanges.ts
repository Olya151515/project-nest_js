import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSellerChanges1732542319725 implements MigrationInterface {
    name = 'AddSellerChanges1732542319725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68"`);
        await queryRunner.query(`ALTER TABLE "sellers" RENAME COLUMN "role_id" TO "role_name"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_41521b2efc956015ccbc99db550" FOREIGN KEY ("role_name") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_41521b2efc956015ccbc99db550"`);
        await queryRunner.query(`ALTER TABLE "sellers" RENAME COLUMN "role_name" TO "role_id"`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
