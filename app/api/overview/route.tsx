import { getSession } from "@/auth/session";
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import moment from "moment";
import { EngagementType } from "@prisma/client";
import { HttpStatusCode } from "axios";

// TODO: Add error codes and all things

export type OverviewData = {
  week: {
    clicks: number;
    scans: number;
    urlCreated: number;
  };
  total: {
    clicks: number;
    scans: number;
    urlCreated: number;
  };
  months: {
    labels: string[];
    clicks: number[];
    scans: number[];
  };
};

export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json(null, { status: HttpStatusCode.Unauthorized });
  // FIXME: these could be optimized
  const engagements = await prisma.engagement.findMany({
    where: { ShortenLink: { userId: session.user.id } },
  });

  const lastWeek = moment().subtract({ week: 1 });
  const lastWeekData = engagements.filter((e) =>
    lastWeek.isSameOrBefore(e.createdAt),
  );

  const week = {
    clicks: lastWeekData.filter((e) => e.type == EngagementType.link).length,
    scans: lastWeekData.filter((e) => e.type == EngagementType.qr).length,
    urlCreated: await prisma.shortenLink.count({
      where: { userId: session.user.id, createdAt: { gte: lastWeek.toDate() } },
    }),
  };

  const total = {
    clicks: engagements.filter((e) => e.type == EngagementType.link).length,
    scans: engagements.filter((e) => e.type == EngagementType.qr).length,
    urlCreated: await prisma.shortenLink.count({
      where: { userId: session.user.id },
    }),
  };

  const lastYearData = engagements
    .filter((e) =>
      moment()
        .subtract({ year: 1 })
        .startOf("year")
        .isSameOrBefore(e.createdAt),
    )
    .sort((a, b) => moment(a.createdAt).diff(moment(b.createdAt)));

  const currentMonth = moment().month();
  const monthLabels = [
    ...moment.months().slice(currentMonth),
    ...moment.months().slice(0, currentMonth),
  ].map((m) => m.slice(0, 3));

  const monthsData: OverviewData["months"] = {
    labels: monthLabels,
    clicks: new Array(12).fill(0),
    scans: new Array(12).fill(0),
  };
  lastYearData.forEach((e) => {
    const key = (moment(e.createdAt).month() + 12 - currentMonth) % 12;

    if (e.type == EngagementType.qr) {
      monthsData.scans[key] += 1;
    } else {
      monthsData.clicks[key] += 1;
    }
  });

  return NextResponse.json(
    {
      week,
      total,
      months: monthsData,
    } as OverviewData,
  );
}
