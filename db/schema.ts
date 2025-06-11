import { relations } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const concepts = sqliteTable("concepts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  deleted: integer("deleted").default(0).notNull(),
});

export const origins = sqliteTable("origins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  deleted: integer("deleted").default(0).notNull(),
});

export const activeMonths = sqliteTable("totals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  total: integer("total").notNull(),
  startDate: text("start_date").notNull(), // ISO 8601 format
});

export const transactions = sqliteTable(
  "transactions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: integer("date").notNull(), // Unix timestamp in milliseconds
    activeMonthId: integer("active_month_id")
      .notNull()
      .references(() => activeMonths.id, { onDelete: "cascade" }),
    conceptId: integer("concept_id")
      .notNull()
      .references(() => concepts.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    amount: integer("amount").notNull(),
    isWithdrawal: integer("is_withdrawal").notNull(),
    originId: integer("origin_id")
      .notNull()
      .references(() => origins.id, { onDelete: "cascade" }),
    destinationId: integer("destination_id")
      .notNull()
      .references(() => origins.id, { onDelete: "cascade" }),
    deleted: integer("deleted").default(0).notNull(),
  },
  (table) => [
    index("transactions_active_month_id_index").on(table.activeMonthId),
    uniqueIndex("transactions_date_index").on(table.date),
  ],
);

export const transactionsRelations = relations(transactions, ({ one }) => ({
  concept: one(concepts, {
    fields: [transactions.conceptId],
    references: [concepts.id],
    relationName: "concept",
  }),
  origin: one(origins, {
    fields: [transactions.originId],
    references: [origins.id],
    relationName: "origin",
  }),
  destination: one(origins, {
    fields: [transactions.destinationId],
    references: [origins.id],
    relationName: "destination",
  }),
  activeMonth: one(activeMonths, {
    fields: [transactions.activeMonthId],
    references: [activeMonths.id],
    relationName: "activeMonth",
  }),
}));

export type TransactionDb = typeof transactions.$inferSelect;
export type ConceptDb = typeof concepts.$inferSelect;
export type OriginDb = typeof origins.$inferSelect;
export type ActiveMonthDb = typeof activeMonths.$inferSelect;
