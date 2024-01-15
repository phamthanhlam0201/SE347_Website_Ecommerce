import CommonListing from "@/components/CommonListing";
import { productBySale } from "@/services/product";

export default async function SaleAllProducts() {
  const getAllProducts = await productBySale("yes");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}

