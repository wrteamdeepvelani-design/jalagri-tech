/**
 * FooterCta — WhatsApp call-to-action in the footer (replaces the theme's
 * newsletter card). No mail backend is wired up in this build, so the enquiry
 * goes straight to WhatsApp with a prefilled message instead of a form that
 * would silently fail.
 */
const WHATSAPP_NUMBER = "919879447399";
const PHONE_TEL = "+919879447399";
const PHONE_LABEL = "+91 98794 47399";

const PREFILLED_MESSAGE =
  "Hi Jal Agritech, I'd like to know more about your irrigation and landscaping services.";

export default function FooterCta() {
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    PREFILLED_MESSAGE
  )}`;

  return (
    <div className="footer-cta">
      <span className="footer-cta__eyebrow">Get a free quote</span>
      <h3>Planning an irrigation or landscape project?</h3>
      <p>
        Message us on WhatsApp and our team will get back with a site assessment
        and an estimate.
      </p>

      <a
        className="footer-cta__whatsapp"
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
        Chat on WhatsApp
      </a>

      <a className="footer-cta__call" href={`tel:${PHONE_TEL}`}>
        <i className="fa-solid fa-phone-volume" aria-hidden="true"></i>
        Or call us directly — {PHONE_LABEL}
      </a>
    </div>
  );
}
