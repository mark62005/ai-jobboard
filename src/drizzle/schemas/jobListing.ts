import {
	boolean,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { id, createdAt, updatedAt } from "@/utils/drizzle/schemas/helper";
import { OrganizationTable } from "./organization";
import { JobListingApplicationTable } from "./jobListingApplication";

/** WageIntervalEnum **/
export const wageIntervals = ["hourly", "yearly"] as const;
export type TWageInterval = (typeof wageIntervals)[number];
export const wageIntervalEnum = pgEnum(
	"job_listings_wage_interval",
	wageIntervals
);

/** LocationRequirementEnum **/
export const locationRequirements = ["in-office", "hybrid", "remote"] as const;
export type TLocationRequirement = (typeof locationRequirements)[number];
export const locationRequirementEnum = pgEnum(
	"job_listings_location_requirement",
	locationRequirements
);

/** ExperienceLevelEnum **/
export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export type TExperienceLevel = (typeof experienceLevels)[number];
export const experienceLevelEnum = pgEnum(
	"job_listings_experience_level",
	experienceLevels
);

/** JobListingStatusEnum **/
export const jobListingStatuses = ["drafted", "published", "delisted"] as const;
export type TJobListingStatus = (typeof jobListingStatuses)[number];
export const jobListingStatusEnum = pgEnum(
	"job_listings_status",
	jobListingStatuses
);

/** JobListingTypeEnum **/
export const jobListingTypes = [
	"internship",
	"part-time",
	"full-time",
] as const;
export type TJobListingType = (typeof jobListingTypes)[number];
export const jobListingTypeEnum = pgEnum("job_listings_type", jobListingTypes);

export const JobListingTable = pgTable(
	"job_listings",
	{
		id,
		organizationId: varchar().references(() => OrganizationTable.id, {
			onDelete: "cascade",
		}),
		title: varchar().notNull(),
		description: text().notNull(),
		wage: integer(),
		wageInterval: wageIntervalEnum(),
		stateAbbreviation: varchar(),
		city: varchar(),
		isFeatured: boolean().notNull().default(false),
		locationRequirement: locationRequirementEnum().notNull(),
		experienceLevel: experienceLevelEnum().notNull(),
		status: jobListingStatusEnum().notNull().default("drafted"),
		type: jobListingTypeEnum().notNull(),
		postedAt: timestamp({ withTimezone: true }),
		createdAt,
		updatedAt,
	},
	(table) => [index().on(table.stateAbbreviation)]
);

export const jobListingReferences = relations(
	JobListingTable,
	({ one, many }) => ({
		organization: one(OrganizationTable, {
			fields: [JobListingTable.organizationId],
			references: [OrganizationTable.id],
		}),
		applications: many(JobListingApplicationTable),
	})
);
