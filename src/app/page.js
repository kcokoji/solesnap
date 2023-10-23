import Slider from "./components/FirstSlider";

import NewArrivals from "./components/NewArrivals";
import Sections from "./components/Sections";
import Subscribe from "./components/Subscribe";
export default function Home() {
  return (
    <main>
      <Slider />
      <NewArrivals />
      <Sections />
      <Subscribe />
    </main>
  );
}
