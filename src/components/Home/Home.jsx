import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../Products/Products";
// import RecentProducts from "../RecentProducts/RecentProducts";


export default function Home() {

    return (
        <>
            <MainSlider />
            <CategorySlider />
            <Products  />
        </>
    );
}
