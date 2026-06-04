/**
 * BackToTop — just renders the markup. The theme's main.js (line 955)
 * adds `.show` to `#back-top` when scrolled near the bottom of the page,
 * and on click animates `html, body` scroll to top. Static markup only —
 * main.js handles all interaction.
 */
export default function BackToTop() {
  return (
    <button
      id="back-top"
      className="back-to-top theme-bg-2"
      aria-label="Back to top"
    >
      <i className="fa-regular fa-arrow-up"></i>
    </button>
  );
}
