CREATE TABLE `histories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`solution` text NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `cars`;