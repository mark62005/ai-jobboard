import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "@/utils/drizzle/schemas/helper";
import { UserTable } from "./user";

export const UserNotificationSettingTable = pgTable(
	"user_notification_settings",
	{
		userId: varchar()
			.primaryKey()
			.references(() => UserTable.id),
		newJobEmailNotifications: boolean().notNull().default(false),
		aiPrompt: varchar(),
		createdAt,
		updatedAt,
	}
);

export const userNotificationSettingRelations = relations(
	UserNotificationSettingTable,
	({ one }) => ({
		user: one(UserTable, {
			fields: [UserNotificationSettingTable.userId],
			references: [UserTable.id],
		}),
	})
);
