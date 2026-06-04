/**
 * NewsletterForm — static markup matching the theme's footer newsletter card.
 * Form submission is handled by the theme's ajax-mail.js (loaded in layout)
 * which posts to mail.php or similar. No React state needed.
 */
export default function NewsletterForm() {
  return (
    <div
      className="footer-contact-image bg-cover"
      style={{ backgroundImage: "url(/images/home-2/vutta.jpg)" }}
    >
      <div className="footer-contact-content">
        <h3>Get newsletter from Agriva</h3>
        <form action="#" className="wow fadeInUp" data-wow-delay=".5s">
          <div className="form-clt">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
            />
            <button type="submit" className="theme-btn-2">
              subscribe now
            </button>
            <i className="fa-solid fa-envelope"></i>
          </div>
        </form>
        <div className="input-single input-check payment-save">
          <input
            type="checkbox"
            className="form-check-input"
            name="save-for-next"
            id="saveForNext"
          />
          <label htmlFor="saveForNext">Agree with terms and conditions</label>
        </div>
      </div>
    </div>
  );
}
