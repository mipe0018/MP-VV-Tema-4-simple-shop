
import ProductCatalog from "../components/products/ProductCatalog";
import ProductHero from "../components/products/ProductHero";

async function getProducts() {
  const response = await fetch(
    "https://dummyjson.com/products/category/groceries?limit=0"
  );

  if (!response.ok) {
    throw new Error("Could not fetch products");
  }

  const data = await response.json();
  return data.products;
}

export default async function ProductsPage({ searchParams }) {
  const products = await getProducts();
  const params = await searchParams;
  const query = params?.search || "";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <ProductCatalog
        products={products}
        searchTerm={query}
      >
        <ProductHero />
      </ProductCatalog>
    </main>
  );
}
