import CommonDetails from "@/components/CommonDetails";
import { productById } from "@/services/product";

export default async function ProductDetails({ params }) {
  const productDetailsData = await productById(params.details);
  
  console.log(productDetailsData, "GR26");

  return <CommonDetails item={productDetailsData && productDetailsData.data} />;
}
