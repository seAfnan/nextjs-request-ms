import prisma from "@/prisma/client";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });

  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    // To fetch user info, this method is called Eager loading
    include: {
      assignToUser: true,
    },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Flex direction="column">
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues issues={issues} />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "RMS - Dashboard",
  description: "View the summary of raised requests",
};
