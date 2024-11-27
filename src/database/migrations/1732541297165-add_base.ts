import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBase1732541297165 implements MigrationInterface {
    name = 'AddBase1732541297165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "scope" character varying NOT NULL, "admin_id" uuid NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "action" character varying NOT NULL, "admin_id" uuid NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL DEFAULT 'admin', CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "managers" ("name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "department" character varying NOT NULL, "role_id" uuid NOT NULL, "createdById" uuid, CONSTRAINT "UQ_8d5fd9a2217bf7b16bef11fdf83" UNIQUE ("email"), CONSTRAINT "PK_e70b8cc457276d9b4d82342a8ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyers" ("name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "region" character varying NOT NULL, "isBanned" boolean NOT NULL DEFAULT false, "banReason" character varying, "role_id" uuid NOT NULL, "manager_id" uuid NOT NULL, CONSTRAINT "UQ_c63a289e65c35c1971da0c2f7bd" UNIQUE ("email"), CONSTRAINT "PK_aff372821d05bac04a18ff8eb87" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "advertisement" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "location" text NOT NULL, "soldAt" TIMESTAMP, "price" numeric(10,3) NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "seller_id" uuid NOT NULL, CONSTRAINT "PK_c8486834e5ef704ec05b7564d89" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sellers" ("name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountType" character varying NOT NULL DEFAULT 'base', "shopName" character varying NOT NULL, "region" character varying NOT NULL, "isBanned" boolean NOT NULL DEFAULT false, "banReason" character varying, "manager_id" uuid, "role_id" uuid NOT NULL, CONSTRAINT "UQ_60a049dd3231ed458dccfdaf406" UNIQUE ("email"), CONSTRAINT "PK_97337ccbf692c58e6c7682de8a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "deviceId" text NOT NULL, "refreshToken" text NOT NULL, "user_id" character varying NOT NULL, "userRole" text NOT NULL, CONSTRAINT "PK_8c3ca3e3f1ad4fb45ec6b793aa0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions_roles_roles" ("permissionsId" uuid NOT NULL, "rolesId" uuid NOT NULL, CONSTRAINT "PK_4a0eb2f30d7d81ba1069abaa94d" PRIMARY KEY ("permissionsId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_aff2f66944175a2cb34cfa8a50" ON "permissions_roles_roles" ("permissionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b746e554e30a7c6027aab29cda" ON "permissions_roles_roles" ("rolesId") `);
        await queryRunner.query(`CREATE TABLE "buyers_favorite_ads_advertisement" ("buyersId" uuid NOT NULL, "advertisementId" uuid NOT NULL, CONSTRAINT "PK_26e12f9996c617d741a02bdcd79" PRIMARY KEY ("buyersId", "advertisementId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ae5d4c9a35c4fa27b12d43a01" ON "buyers_favorite_ads_advertisement" ("buyersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8b4c200a94d39aff2f0bb9c995" ON "buyers_favorite_ads_advertisement" ("advertisementId") `);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_f91b8e4c6deedc34723bb840566" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_2bce219c0d262b3782c77f3798e" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "managers" ADD CONSTRAINT "FK_84e17cc72cc79081a45579ea006" FOREIGN KEY ("createdById") REFERENCES "admin"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "managers" ADD CONSTRAINT "FK_2fb9afbc96f74ea1ea7026d6936" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_8dacf95422ebed27352daf63027" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers" ADD CONSTRAINT "FK_cbd92c56a1f3e6e49666f53e29b" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisement" ADD CONSTRAINT "FK_31e74cdbf7b97bbde7e8f1d85e8" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_1f3a65ed78a5114b87ff148f25b" FOREIGN KEY ("manager_id") REFERENCES "managers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sellers" ADD CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" ADD CONSTRAINT "FK_aff2f66944175a2cb34cfa8a503" FOREIGN KEY ("permissionsId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" ADD CONSTRAINT "FK_b746e554e30a7c6027aab29cda6" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyers_favorite_ads_advertisement" ADD CONSTRAINT "FK_6ae5d4c9a35c4fa27b12d43a014" FOREIGN KEY ("buyersId") REFERENCES "buyers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buyers_favorite_ads_advertisement" ADD CONSTRAINT "FK_8b4c200a94d39aff2f0bb9c9957" FOREIGN KEY ("advertisementId") REFERENCES "advertisement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buyers_favorite_ads_advertisement" DROP CONSTRAINT "FK_8b4c200a94d39aff2f0bb9c9957"`);
        await queryRunner.query(`ALTER TABLE "buyers_favorite_ads_advertisement" DROP CONSTRAINT "FK_6ae5d4c9a35c4fa27b12d43a014"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" DROP CONSTRAINT "FK_b746e554e30a7c6027aab29cda6"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles_roles" DROP CONSTRAINT "FK_aff2f66944175a2cb34cfa8a503"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_cb47c736efb9caae5dd55f2bd68"`);
        await queryRunner.query(`ALTER TABLE "sellers" DROP CONSTRAINT "FK_1f3a65ed78a5114b87ff148f25b"`);
        await queryRunner.query(`ALTER TABLE "advertisement" DROP CONSTRAINT "FK_31e74cdbf7b97bbde7e8f1d85e8"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_cbd92c56a1f3e6e49666f53e29b"`);
        await queryRunner.query(`ALTER TABLE "buyers" DROP CONSTRAINT "FK_8dacf95422ebed27352daf63027"`);
        await queryRunner.query(`ALTER TABLE "managers" DROP CONSTRAINT "FK_2fb9afbc96f74ea1ea7026d6936"`);
        await queryRunner.query(`ALTER TABLE "managers" DROP CONSTRAINT "FK_84e17cc72cc79081a45579ea006"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_2bce219c0d262b3782c77f3798e"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_f91b8e4c6deedc34723bb840566"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b4c200a94d39aff2f0bb9c995"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ae5d4c9a35c4fa27b12d43a01"`);
        await queryRunner.query(`DROP TABLE "buyers_favorite_ads_advertisement"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b746e554e30a7c6027aab29cda"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aff2f66944175a2cb34cfa8a50"`);
        await queryRunner.query(`DROP TABLE "permissions_roles_roles"`);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "sellers"`);
        await queryRunner.query(`DROP TABLE "advertisement"`);
        await queryRunner.query(`DROP TABLE "buyers"`);
        await queryRunner.query(`DROP TABLE "managers"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
