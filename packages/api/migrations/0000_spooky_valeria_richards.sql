CREATE TABLE `completedTasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`solution` text NOT NULL,
	`user_id` text NOT NULL,
	`favorite` integer DEFAULT false,
	`percentage` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL
);
