import { getSession } from "@/auth/session";
import { NextRequest, NextResponse } from "next/server";
import errorCodes from "../_error-codes";
import prisma from "@/prisma";
import moment from "moment";
import { EngagementType } from "@prisma/client";

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
  if (!session) return errorCodes.Unauthorized();
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

  const monthsData: OverviewData["months"] = {
    labels: moment.months().map(m => m.slice(0, 3)),
    clicks: new Array(12).fill(0),
    scans: new Array(12).fill(0),
  };
  lastYearData.forEach((e) => {
    const key = moment(e.createdAt).month();

    if (e.type == EngagementType.qr) {
      monthsData.scans[key] += 1;
    } else {
      monthsData.clicks[key] += 1;
    }
  });

  return NextResponse.json({
    week,
    total,
    months: monthsData,
  } as OverviewData);
}
