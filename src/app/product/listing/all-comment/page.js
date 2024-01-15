import CommonListing from "@/components/CommonListing";
import { getAllComments } from "@/services/comment";

export default async function AllComments() {
  const ListAllComments = await getAllComments();

  return <CommonListing data={ListAllComments && ListAllComments.data} />;
}
