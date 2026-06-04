/**
 * ContactInfoSection — theme markup from contact.html lines 408-464.
 * Editable content lives in src/data/contact/contact.json under `info`.
 * .text-anim by GSAP SplitText, .wow fadeInUp by WOW.js — wired by main.js.
 */
import data from "@/data/contact/contact.json";

type InfoItem = {
  icon: string;
  label: string;
  value: string;
  href: string;
  delay: string;
};

export default function ContactInfoSection() {
  const info = data.info;
  const items = info.items as InfoItem[];

  return (
    <div className="contact-info-section section-padding fix">
      <div className="container">
        <div className="contact-info-wrapper">
          <div className="contact-info-left-content">
            <div className="section-title mb-0">
              <span className="sub-title-3">{info.eyebrow}</span>
              <h2 className="text-anim">
                {info.headline.split("\n").map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </h2>
            </div>
            <div className="info-icon-item">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="icon-item wow fadeInUp"
                  data-wow-delay={item.delay}
                >
                  <div className="icon">
                    <img src={item.icon} alt="img" />
                  </div>
                  <div className="cont">
                    <span>{item.label}</span>
                    <h3>
                      <a href={item.href}>{item.value}</a>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="info-right-content">
            <p>{info.right.description}</p>
            <div
              className="icon-item wow fadeInUp"
              data-wow-delay={info.right.delay}
            >
              <div className="icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="cont">
                <span>{info.right.addressLabel}</span>
                <h3>{info.right.address}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
