import Image from "next/image";
import styles from "./page.module.css";
import Landing from '../landing/landing'
import About from '../about/about'
import Services from '../services/services'
import Cta from '../cta/cta'

export default function Home() {
  return (
    <div className={styles.page}>
      <Landing />
      <About />
      <Services />
      <Cta />
    </div>
  );
}
