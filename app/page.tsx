import { Suspense } from "react";
import FaqSection from "./(common)/_components/Home/FaqSection";
import FeaturedProperties from "./(common)/_components/Home/FeaturedProperties";
import HeroSection from "./(common)/_components/Home/HeroSection";
import Loading from "./loading";

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <HeroSection />
        <FeaturedProperties />
        <FaqSection />
      </div>
    </Suspense>
  )
}
