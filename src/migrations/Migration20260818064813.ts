import { Migration } from '@mikro-orm/migrations';

export class Migration20260818064813 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "phone" varchar(255) null;`);
    this.addSql(`alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));`);
    this.addSql(`alter table "user" alter column "password" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "phone";`);

    this.addSql(`alter table "user" alter column "password" type varchar(255) using ("password"::varchar(255));`);
    this.addSql(`alter table "user" alter column "password" set not null;`);
  }

}
