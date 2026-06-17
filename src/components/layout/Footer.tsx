import Link from "next/link";
import NewsletterForm from "@/components/shared/NewsletterForm";

const COMPANY = {
  name: "Jal Agritech India Pvt Ltd",
  phone: "+91 98794 47395",
  phoneTel: "+919879447395",
  email: "jalagritechindiapvtltd@gmail.com",
  gst: "24AAFCJ0462P1ZD",
  cin: "U01409GJ2020PTC118906",
  addressLines: [
    "34, Time Square Empire,",
    "Mirzapar Road, Bhuj – Kutch 370001,",
    "Gujarat, India",
  ],
};

const services = [
  { label: "Irrigation & Landscaping", href: "/what-we-do/irrigation-and-landscaping" },
  { label: "Maintenance",              href: "/what-we-do/maintenance" },
  { label: "Outlets & Nurseries",      href: "/what-we-do/outlets" },
  { label: "Manufacturing",            href: "/what-we-do/manufacturing" },
  { label: "Trading",                  href: "/what-we-do/trading" },
  { label: "Professional Services",    href: "/what-we-do/services" },
];

const quickLinks = [
  { label: "About Us",    href: "/about" },
  { label: "Our Projects",href: "/projects" },
  { label: "Contact Us",  href: "/contact" },
  { label: "Get a Quote", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="footer-section-2 footer-bg fix pb-0">
      <div className="left-shape float-bob-x">
        <img src="/images/home-2/maize-tree-2.png" alt="" />
      </div>
      <div className="right-shape float-bob-x">
        <img src="/images/home-2/maize-tree.png" alt="" />
      </div>
      <div className="container">

        {/* Footer Top */}
        <div className="footer-top-item">
          <div className="footer-logo wow fadeInUp" data-wow-delay=".2s">
            <Link href="/">
              <img src="/images/logo/logo.png" alt={COMPANY.name} />
            </Link>
          </div>
          <div className="footer-right-item">
            <div className="social-icon wow fadeInUp" data-wow-delay=".4s">
              <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-youtube"></i></a>
            </div>
            <div className="icon-item wow fadeInUp" data-wow-delay=".6s">
              <div className="icon">
                <img src="/images/home-2/icon/10.svg" alt="" />
              </div>
              <div className="cont">
                <span>call for details</span>
                <h4><a href={`tel:${COMPANY.phoneTel}`}>{COMPANY.phone}</a></h4>
              </div>
            </div>
            <div className="icon-item wow fadeInUp" data-wow-delay=".8s">
              <div className="icon">
                <img src="/images/home-2/icon/11.svg" alt="" />
              </div>
              <div className="cont">
                <span>send us email</span>
                <h4><a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></h4>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Widgets */}
        <div className="footer-widget-wrapper footer-widget-wrapper-2">
          <div className="row">

            {/* Newsletter */}
            <div className="col-xl-5 col-md-7 col-lg-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="single-footer-widget">
                <NewsletterForm />
              </div>
            </div>

            {/* What We Do */}
            <div className="col-xl-3 col-md-5 col-lg-4 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4>what we do</h4>
                </div>
                <ul className="list-area">
                  {services.map((s) => (
                    <li key={s.label}>
                      <Link href={s.href}>
                        <i className="fa-solid fa-chevron-right"></i> {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-2 col-md-6 col-lg-2 wow fadeInUp" data-wow-delay=".6s">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4>Quick Links</h4>
                </div>
                <ul className="list-area">
                  {quickLinks.map((r) => (
                    <li key={r.label}>
                      <Link href={r.href}>
                        <i className="fa-solid fa-chevron-right"></i> {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Get In Touch — address + compliance */}
            <div className="col-xl-2 ps-lg-5 col-md-6 col-lg-4 wow fadeInUp" data-wow-delay=".8s">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4>Get In Touch</h4>
                </div>
                <address className="footer-address" style={{ fontStyle: "normal", color: "rgba(255,255,255,0.75)", lineHeight: "1.7" }}>
                  {COMPANY.addressLines.map((line) => (
                    <span key={line} style={{ display: "block" }}>{line}</span>
                  ))}
                </address>
                <div style={{ marginTop: "16px", color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: "1.8" }}>
                  <div><strong style={{ color: "rgba(255,255,255,0.85)" }}>GST:</strong> {COMPANY.gst}</div>
                  <div><strong style={{ color: "rgba(255,255,255,0.85)" }}>CIN:</strong> {COMPANY.cin}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom pb-0">
          <div className="footer-wrapper justify-content-center">
            <p>©{new Date().getFullYear()} <span>{COMPANY.name}</span>, All Rights Reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}