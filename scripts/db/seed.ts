import { randomUUID } from "node:crypto";

import { drizzle } from "drizzle-orm/node-sqlite";

import { SQLITE_DATABASE_PATH } from "#constants";
import { tasksSchema } from "#db";
import { TaskPriority, TaskStatus } from "#enums";

const pick = <T>(values: readonly T[]) => values[Math.floor(Math.random() * values.length)];

async function main() {
  const db = drizzle(SQLITE_DATABASE_PATH);

  const count = 10;
  const now = new Date();
  const nowTime = now.getTime();
  const timestampRange = 30 * 24 * 60 * 60 * 1000;
  const titles = [
    "Prepare the weekly project update",
    "Send project review notes",
    "Confirm workshop venue and equipment",
    "Review project milestones with stakeholders",
    "Prepare agenda for the next project review",
    "Update the project risk register",
    "Coordinate new team member onboarding",
    "Schedule a stakeholder check-in",
    "Confirm owners for upcoming deliverables",
    "Prepare a release readiness checklist",
    "Document decisions and action items",
    "Review dependencies across workstreams"
  ];
  const descriptions = [
    "Collect progress from each workstream, note any blockers, and share the update with stakeholders before Friday's review.",
    "Share the meeting decisions, follow-up actions, and due dates with everyone who attended the review.",
    "Check the room booking and presentation equipment, then send the confirmed details to all workshop attendees.",
    "Compare recent progress with the agreed schedule and flag milestones that may need revised dates.",
    "Gather discussion topics from the team, assign time to each item, and share the agenda before the meeting.",
    "Review open risks with their owners, record mitigation steps, and schedule the next progress check.",
    "Schedule introductions, confirm required account access, and share a clear first-week plan with the new starter.",
    "Set a date to review progress, surface open questions, and agree on the next actions with stakeholders.",
    "List owners and target dates for each deliverable, then confirm the assignments with the project team.",
    "Verify testing, approvals, support coverage, and rollback steps before scheduling the release.",
    "Record the decisions, responsible owners, and due dates from the latest project discussion.",
    "Identify tasks that depend on other workstreams and confirm when each prerequisite will be ready."
  ];
  const assignees = ["jordan-mitchell", "alex-morgan", "casey-nguyen"];
  const tasks = Array.from({ length: count }, () => {
    const isDeleted = Math.random() >= 0.5;
    const createdAtTime = nowTime - timestampRange - Math.floor(Math.random() * timestampRange);
    const latestUpdatedAtTime = isDeleted ? nowTime - 1 : nowTime;
    const updatedAtTime = createdAtTime + 1 + Math.floor(Math.random() * (latestUpdatedAtTime - createdAtTime));

    return {
      id: randomUUID(),
      createdAt: new Date(createdAtTime).toISOString(),
      updatedAt: new Date(updatedAtTime).toISOString(),
      deletedAt: isDeleted
        ? new Date(updatedAtTime + 1 + Math.floor(Math.random() * (nowTime - updatedAtTime))).toISOString()
        : null,
      isDeleted,
      title: pick(titles),
      description: pick(descriptions),
      status: pick(Object.values(TaskStatus)),
      priority: pick(Object.values(TaskPriority)),
      assignee: pick(assignees)
    };
  });

  await db.insert(tasksSchema).values(tasks);
}

void main();