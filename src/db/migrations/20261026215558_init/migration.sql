CREATE TABLE `tasks` (
	`id` text PRIMARY KEY,
	`created_at` text NOT NULL,
	`updated_at` text,
	`deleted_at` text,
	`is_deleted` integer DEFAULT false,
	`title` text NOT NULL,
	`description` text,
	`status` text NOT NULL,
	`priority` text NOT NULL,
	`assignee` text NOT NULL,
	CONSTRAINT "tasks_title_min_length" CHECK(length("title") >= 3),
	CONSTRAINT "tasks_description_min_length" CHECK(length("description") >= 16),
	CONSTRAINT "tasks_assignee_min_length" CHECK(length("assignee") >= 3),
	CONSTRAINT "tasks_assignee_format" CHECK(
        "assignee" NOT GLOB '*[^-a-z0-9]*'
        AND "assignee" NOT GLOB '-*'
        AND "assignee" NOT GLOB '*-'
        AND "assignee" NOT GLOB '*--*'
      )
);
--> statement-breakpoint
CREATE INDEX `tasks_title_idx` ON `tasks` (`title`);--> statement-breakpoint
CREATE INDEX `tasks_description_idx` ON `tasks` (`description`);--> statement-breakpoint
CREATE INDEX `tasks_status_idx` ON `tasks` (`status`);--> statement-breakpoint
CREATE INDEX `tasks_priority_idx` ON `tasks` (`priority`);--> statement-breakpoint
CREATE INDEX `tasks_assignee_idx` ON `tasks` (`assignee`);