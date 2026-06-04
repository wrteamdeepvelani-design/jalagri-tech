/**
 * Preloader — just renders the markup. The theme's main.js (line 1737)
 * listens to `window.load` and fades out `#agri-preloader` via opacity
 * + display:none. DO NOT add React state — main.js owns the fade-out.
 */
export default function Preloader() {
  return (
    <div id="agri-preloader">
      <div className="preloader-content">
        <img
          src="/images/leaf.png"
          alt="Farmer with vegetables"
          className="farmer-loader"
        />
        <h4>Loading Agriculture...</h4>
      </div>
    </div>
  );
}
