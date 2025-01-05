import ProductCard from "./ProductCard";

const titleSectionStyle = "font-medium text-[40px] leading-[57.6px] tracking-[-0.9px] text-center text-[#0B254B] mb-[8px]";
const subDescriptionStyle = "font-medium text-lg text-[#5E6E89] tracking-[0.1px] text-center";

const products = [{ name: 'Spiced Mint', price: 9.99 }, { name: 'Sweet Straweberry', price: 9.99 }, { name: 'Cool Blueberries', price: 9.99 }, { name: 'Juicy Lemon', price: 9.99 }];

const ProductSection = () => {

    return (
        <div className="px-[165px] pb-[125px] pt-[90px]">
            <h2 className={titleSectionStyle}>Produits</h2>
            <p className={subDescriptionStyle}>Commandez-le pour vous ou pour vos proches</p>
            <div className="mb-[50px]"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product, index) => (
                    <ProductCard key={index} name={product.name} price={product.price} />
                ))}
            </div>
        </div>
    );
};

export default ProductSection;