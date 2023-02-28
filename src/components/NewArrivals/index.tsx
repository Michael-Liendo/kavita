import ProductCard from './ProductCart';

export default function NewArrivals() {
  return (
    <div className="mt-7">
      <h3 className="text-2xl mb-3">New Arrivals</h3>
      <hr />
      <div className="mt-9 grid grid-cols-4 gap-6">
        <ProductCard />
        <ProductCard />

        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}
