﻿-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/4ZXilY
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "id_df" (
    "ID" INT   NOT NULL,
    "review_date" INT   NOT NULL,
    CONSTRAINT "pk_id_df" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "dependency_chart" (
    "ID" INT   NOT NULL,
    "company_location" VARCHAR(100)   NOT NULL,
    "country_of_bean_origin" VARCHAR(100)   NOT NULL,
    CONSTRAINT "pk_dependency_chart" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "scatterplot_chart" (
    "ID" INT   NOT NULL,
    "company_location" VARCHAR(100)   NOT NULL,
    "country_of_bean_origin" VARCHAR(100)   NOT NULL,
    "rating" DECIMAL   NOT NULL,
    CONSTRAINT "pk_scatterplot_chart" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "donut_chart" (
    "ID" INT   NOT NULL,
    "company_location" VARCHAR(100)   NOT NULL,
    "cocoa_percent" INT   NOT NULL,
    "rating" DECIMAL   NOT NULL,
    CONSTRAINT "pk_donut_chart" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "dependency_chart" ADD CONSTRAINT "fk_dependency_chart_ID" FOREIGN KEY("ID")
REFERENCES "id_df" ("ID");

ALTER TABLE "scatterplot_chart" ADD CONSTRAINT "fk_scatterplot_chart_ID" FOREIGN KEY("ID")
REFERENCES "id_df" ("ID");

ALTER TABLE "donut_chart" ADD CONSTRAINT "fk_donut_chart_ID" FOREIGN KEY("ID")
REFERENCES "id_df" ("ID");
