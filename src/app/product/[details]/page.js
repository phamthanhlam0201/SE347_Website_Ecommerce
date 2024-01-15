import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";
import { getAllComments } from "@/services/comment";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);
  const cmtDeTailsData = await getAllComments();
  console.log(productDetailsData, "GR26");
  console.log(cmtDeTailsData, "GR26");
  return <CommonDetails item={productDetailsData && productDetailsData.data} cmtitem={cmtDeTailsData && cmtDeTailsData.data} />;
}
