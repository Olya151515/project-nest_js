import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManagerEntityChanges1732802066551 implements MigrationInterface {
    name = 'AddManagerEntityChanges1732802066551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "managers" DROP CONSTRAINT "FK_84e17cc72cc79081a45579ea006"`);
        await queryRunner.query(`ALTER TABLE "managers" RENAME COLUMN "createdById" TO "admin_id"`);
        await queryRunner.query(`ALTER TABLE "managers" ALTER COLUMN "admin_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "managers" ADD CONSTRAINT "FK_78fea218777848511ed519b5597" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "managers" DROP CONSTRAINT "FK_78fea218777848511ed519b5597"`);
        await queryRunner.query(`ALTER TABLE "managers" ALTER COLUMN "admin_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "managers" RENAME COLUMN "admin_id" TO "createdById"`);
        await queryRunner.query(`ALTER TABLE "managers" ADD CONSTRAINT "FK_84e17cc72cc79081a45579ea006" FOREIGN KEY ("createdById") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
