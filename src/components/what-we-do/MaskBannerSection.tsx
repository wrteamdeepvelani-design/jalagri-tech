/**
 * MaskBannerSection — theme markup from service.html lines 575-581.
 * Wide animated text-image banner. .animated-img bounce animation wired
 * by main.js (wt-about-title2 block).
 */
export default function MaskBannerSection({ image }: { image: string }) {
  return (
    <div className="mask-image-section section-padding fix">
      <div className="mask-image wt-about-title2">
        <img src={image} alt="img" className="animated-img" />
      </div>
    </div>
  );
}