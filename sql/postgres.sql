CREATE TABLE "user_account" (
  "id" varchar PRIMARY KEY,
  "name_user_account" varchar NOT NULL,
  "email_user_account" varchar UNIQUE NOT NULL,
  "password_user_account" varchar NOT NULL,
  "code_update_password_user_account" varchar
);

CREATE TABLE "session" (
  "id" varchar PRIMARY KEY,
  "id_user_account_session" varchar UNIQUE NOT NULL,
  "secret_key_session" varchar
);

CREATE TABLE "operation" (
  "id" varchar PRIMARY KEY,
  "id_user_account_operation" varchar NOT NULL,
  "id_category_operation" varchar NOT NULL,
  "concept_operation" varchar NOT NULL,
  "amount_operation" varchar NOT NULL,
  "type_operation" varchar NOT NULL,
  "date_operation" date NOT NULL
);

CREATE TABLE "category" (
  "id" varchar PRIMARY KEY,
  "name_category" varchar NOT NULL,
  "id_user_account_category" varchar NOT NULL
);

ALTER TABLE "session" ADD FOREIGN KEY ("id_user_account_session") REFERENCES "user_account" ("id");

ALTER TABLE "operation" ADD FOREIGN KEY ("id_user_account_operation") REFERENCES "user_account" ("id");

ALTER TABLE "category" ADD FOREIGN KEY ("id_user_account_category") REFERENCES "user_account" ("id");

ALTER TABLE "operation" ADD FOREIGN KEY ("id_category_operation") REFERENCES "category" ("id");
