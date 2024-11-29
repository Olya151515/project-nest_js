import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCarBrands1732809353015 implements MigrationInterface {
    name = 'AddCarBrands1732809353015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car-brands" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e4da449428ce7797e25c732a520" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car-models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer, "brand_id" uuid, CONSTRAINT "PK_5ead90ac2e06122719417b2bcf9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car-models" ADD CONSTRAINT "FK_e38293398d360cdcbf5b18934d3" FOREIGN KEY ("brand_id") REFERENCES "car-brands"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car-models" DROP CONSTRAINT "FK_e38293398d360cdcbf5b18934d3"`);
        await queryRunner.query(`DROP TABLE "car-models"`);
        await queryRunner.query(`DROP TABLE "car-brands"`);
    }

}
