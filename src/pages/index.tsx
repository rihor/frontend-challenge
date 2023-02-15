import { LandingNavigator } from "@/components/navigators/LandingNavigator";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import styles from "./LandingPage.module.scss";

export default function LandingPage() {
  return (
    <main className={styles.main}>
      <LandingNavigator />

      <ContactForm />
      <Footer />
    </main>
  );
}
