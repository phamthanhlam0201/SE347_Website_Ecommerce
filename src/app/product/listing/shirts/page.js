import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function ShirtsAllProducts() {
  const getAllProducts = await productByCategory("Shirts");

  return <CommonListing data={getAllProducts && getAllProducts.data}/>;
}
