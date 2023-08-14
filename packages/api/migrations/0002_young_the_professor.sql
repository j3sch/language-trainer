CREATE TABLE `histories` (
	`id` integer PRIMARY KEY NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`solution` text NOT NULL,
	`user_id` integer NOT NULL
);
--> statement-breakpoint
DROP TABLE `history`;