import HeroBanner from "./components/HeroBanner"
import AdvancedSearch from "./components/AdvancedSearch"
import TopBars from "./components/TopBars"
import BookingGuide from "./components/BookingGuide"
import ExploreByType from "./components/ExploreByType"
import TopBarsHCM from "./components/TopBarsHCM"
import TopBarsHanoi from "./components/TopBarsHanoi"
import TopBarsDaNang from "./components/TopBarsDaNang"
import ImageBanner from "./components/ImageBanner"
import BlogHomeSection from "../blog/components/BlogHomeSection"
export default function HomePage() {
    return (
        <>
            <HeroBanner />
            <AdvancedSearch />
            <ExploreByType />
            <TopBars />
            <TopBarsHCM />
            <ImageBanner
                image="https://theme.hstatic.net/1000268128/1001303877/14/choose_1.png?v=209"

            />
            <TopBarsHanoi />
            <TopBarsDaNang />
            <ImageBanner
                image="https://theme.hstatic.net/1000268128/1001303877/14/home-banner-add2.png?v=209"

            />
            <BlogHomeSection />
            <BookingGuide />
        </>
    )
}
