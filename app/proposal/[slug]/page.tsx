import dbConnect from "@/lib/db";
import Proposal from "@/models/Proposal";
import PublicProposalClient from "./PublicProposalClient";
import { notFound } from "next/navigation";

export default async function PublicProposalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await dbConnect();

  const rawProposal = await Proposal.findOne({ publicSlug: slug }).lean();

  if (!rawProposal) {
    notFound();
  }

  // Convert MongoDB object to JSON serializable format
  const proposal = JSON.parse(JSON.stringify(rawProposal));

  return <PublicProposalClient proposal={proposal} slug={slug} />;
}
