import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBuyerEtityChanges1732705834755 implements MigrationInterface {
    name = 'AddBuyerEtityChanges1732705834755'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_cbd92c56a1f3e6e49666f53e29b"`);
        await queryRunner.query(`ALTER TABLE "buyers" ALTER COLUMN "manager_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_cbd92c56a1f3e6e49666f53e29b" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_cbd92c56a1f3e6e49666f53e29b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ALTER COLUMN "manager_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_cbd92c56a1f3e6e49666f53e29b" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
