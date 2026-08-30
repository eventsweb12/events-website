import Image from "next/image";
import styles from "./page.module.css";
import Landing from '../landing/landing'
import Stats from '../stats/stats'
import About from '../about/about'
import Services from '../services/services'
import Events from '../events/events'
import Brands from '../brands/brands'
import WhyUs from '../whyus/whyus'
import Blog from '../blog/blog'
import Cta from '../cta/cta'



export default function Home() {
  return (
    <div className={styles.page}>
      <Landing />
      <Stats/>
      <About />
      <Services />
      <Events />
    </div>
  );
}
