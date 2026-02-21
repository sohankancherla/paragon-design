import { generateId } from "better-auth";
import { relations, sql } from "drizzle-orm";
import {
	boolean,
	check,
	index,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar
} from "drizzle-orm/pg-core";

// TODO: Clean up schemas
export const statusEnum = pgEnum("status", [
	"confirmed",
	"declined",
	"pending"
]);

export const roleEnum = pgEnum("role", [
	"owner",
	"editor",
	"viewer",
	"observer"
]);

export const waitlist = pgTable("waitlist", {
	id: uuid("id").primaryKey().defaultRandom(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow()
});

export const user = pgTable(
	"user",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId()),
		name: varchar("name", { length: 255 }).notNull(),
		email: varchar("email", { length: 255 }).notNull().unique(),
		emailVerified: boolean("email_verified").default(false).notNull(),
		image: text("image"),
		timezone: varchar("timezone", { length: 50 }).default("Auto").notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	table => [
		check(
			"timezone_valid",
			sql`${table.timezone} = 'Auto' OR (now() AT TIME ZONE ${table.timezone} IS NOT NULL)`
		)
	]
);

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" })
	},
	table => [index("session_userId_idx").on(table.userId)]
);

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	table => [index("account_userId_idx").on(table.userId)]
);

export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull()
	},
	table => [index("verification_identifier_idx").on(table.identifier)]
);

export const calendar = pgTable(
	"calendar",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId()),
		ownerId: text("owner_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		name: varchar("name", { length: 255 }).notNull(),
		timezone: varchar("timezone", { length: 50 }).notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow()
	},
	table => [
		check(
			"timezone_valid",
			sql`(${table.timezone} = 'Auto' OR (now() AT TIME ZONE ${table.timezone} IS NOT NULL))`
		)
	]
);

export const event = pgTable(
	"event",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId()),
		calendarId: text("calendar_id")
			.notNull()
			.references(() => calendar.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		organizerEmail: varchar("organizer_email", { length: 255 }),
		title: varchar("title", { length: 255 }).notNull(),
		description: text("description"),
		location: text("location"),
		startTime: timestamp("start_time").notNull(),
		endTime: timestamp("end_time").notNull(),
		allDay: boolean("all_day").notNull().default(false),
		recurring: boolean("recurring").notNull().default(false),
		rrule: text("rrule"),
		sequence: integer("sequence"),
		dtstamp: timestamp("dtstamp"),
		icalRaw: text("ical_raw"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow()
	},
	table => [
		index("search_index").using(
			"gin",
			sql`(
          setweight(to_tsvector('english', coalesce(${table.title}, '')), 'A') ||
          setweight(to_tsvector('english', coalesce(${table.description}, '')), 'B')
      )`
		)
	]
);

export const eventException = pgTable(
	"event_exception",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId()),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		eventId: text("event_id")
			.notNull()
			.references(() => event.id, { onDelete: "cascade" }),
		index: integer("index").notNull(),
		timeChanged: boolean("time_changed").notNull().default(false),
		startTime: timestamp("start_time"),
		endTime: timestamp("end_time"),
		title: varchar("title", { length: 255 }),
		description: text("description"),
		location: text("location"),
		isCanceled: boolean("is_canceled").notNull().default(false),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow()
	},
	table => [
		check(
			"time_changed_constraint",
			sql`(${table.timeChanged} AND (${table.startTime} IS NOT NULL OR ${table.endTime} IS NOT NULL)) OR (NOT ${table.timeChanged} AND ${table.startTime} IS NULL AND ${table.endTime} IS NULL)`
		)
	]
);

export const attendees = pgTable("attendees", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => generateId()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	eventId: text("event_id")
		.notNull()
		.references(() => event.id, { onDelete: "cascade" }),
	email: text("email"),
	displayName: text("display_name"),
	organizer: boolean("organizer").notNull().default(false),
	optional: boolean("optional").notNull().default(false),
	status: statusEnum("status"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow()
});

export const acl = pgTable(
	"access_control",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId()),
		calendarId: text("calendar_id")
			.notNull()
			.references(() => calendar.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		role: roleEnum("role").notNull(),
		createdBy: varchar("created_by", { length: 255 }).notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow()
	},
	table => [
		uniqueIndex("one_owner_per_calendar")
			.on(table.calendarId)
			.where(sql`${table.role} = 'owner'`)
	]
);

export const calendarList = pgTable(
	"calendar_list",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => generateId()),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		calendarId: text("calendar_id")
			.notNull()
			.references(() => calendar.id, { onDelete: "cascade" }),
		primaryCalendar: boolean("primary_calendar").notNull().default(false),
		defaultCalendar: boolean("default_calendar").notNull().default(false),
		displayName: text("display_name").notNull(),
		timezone: varchar("timezone", { length: 50 }).notNull(),
		color: varchar("color", { length: 7 }).notNull().default("#000000"),
		is_visible: boolean("is_visible").notNull().default(true),
		notificationSettings: text("notification_settings"),
		createdAt: timestamp("created_at").notNull().defaultNow(),
		updatedAt: timestamp("updated_at").notNull().defaultNow()
	},
	table => [
		check("color_hex_format", sql`(${table.color} ~ '^#([A-Fa-f0-9]{6})$')`),
		check(
			"timezone_valid",
			sql`(${table.timezone} = 'Auto' OR (now() AT TIME ZONE ${table.timezone} IS NOT NULL))`
		),
		uniqueIndex("unique_user_calendar_pair").on(table.userId, table.calendarId)
	]
);

export const todo = pgTable("todo", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => generateId()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	title: varchar("title", { length: 500 }).notNull(),
	completed: boolean("completed").notNull().default(false)
});

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));
