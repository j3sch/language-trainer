CREATE TABLE `history` (
	`id` integer DEFAULT 0,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`solution` text NOT NULL,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL
);
