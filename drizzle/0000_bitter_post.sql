CREATE TABLE `totals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`total` integer NOT NULL,
	`start_date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `concepts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`deleteted` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `origins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`icon` text NOT NULL,
	`deleteted` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`active_month_id` integer NOT NULL,
	`concept_id` integer NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	`is_withdrawal` integer NOT NULL,
	`origin_id` integer NOT NULL,
	`destination_id` integer NOT NULL,
	FOREIGN KEY (`active_month_id`) REFERENCES `totals`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`concept_id`) REFERENCES `concepts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`origin_id`) REFERENCES `origins`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`destination_id`) REFERENCES `origins`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `transactions_active_month_id_index` ON `transactions` (`active_month_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `transactions_date_index` ON `transactions` (`date`);