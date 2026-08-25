import StaticPage from "./StaticPage";
import { Mail, Phone } from "../../components/icons";

export default function Contact() {
  return (
    <StaticPage eyebrow="CONTACT" title="We'd love to hear from you.">
      <div className="flex flex-col gap-3">
        <a href="mailto:hello@roost.app" className="flex items-center gap-2 font-semibold text-ink-800 hover:text-brand-600"><Mail size={16} /> hello@roost.app</a>
        <a href="tel:+911234567890" className="flex items-center gap-2 font-semibold text-ink-800 hover:text-brand-600"><Phone size={16} /> +91 12345 67890</a>
      </div>
    </StaticPage>
  );
}
