import {
	boolean,
	integer,
	pgTable,
	primaryKey,
	varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "@/utils/drizzle/schemas/helper";
import { UserTable } from "./user";
import { OrganizationTable } from "./organization";

export const OrganizationUserSettingTable = pgTable(
	"organization_user_settings",
	{
		userId: varchar()
			.notNull()
			.references(() => UserTable.id),
		organizationId: varchar()
			.notNull()
			.references(() => OrganizationTable.id),
		newApplicationEmailNotifications: boolean().notNull().default(false),
		minimumRating: integer(),
		createdAt,
		updatedAt,
	},
	(table) => [primaryKey({ columns: [table.userId, table.organizationId] })]
);

export const organizationUserSettingsRelations = relations(
	OrganizationUserSettingTable,
	({ one }) => ({
		user: one(UserTable, {
			fields: [OrganizationUserSettingTable.userId],
			references: [UserTable.id],
		}),
		organization: one(OrganizationTable, {
			fields: [OrganizationUserSettingTable.userId],
			references: [OrganizationTable.id],
		}),
	})
);
