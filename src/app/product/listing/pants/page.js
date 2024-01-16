import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function TShirtsAllProducts() {
  const getAllProducts = await productByCategory("Pants");

  return <CommonListing data={getAllProducts && getAllProducts.data} className="BG"/>;
}
