export default function SocialLinks(){
  return <nav className="social-links" aria-label="Heynomus community">
    <a className="social-link" href="https://github.com/Heynomus/heynomus" target="_blank" rel="noopener noreferrer" aria-label="Heynomus GitHub repository">
      <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.23.71-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.01-.12-.28-.5-1.42.11-2.96 0 0 .95-.3 3.1 1.15A10.8 10.8 0 0 1 12 6.18c.96 0 1.92.13 2.82.38 2.15-1.46 3.1-1.15 3.1-1.15.61 1.54.23 2.68.11 2.96.72.78 1.16 1.78 1.16 3.01 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.12c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"/></svg>
      <span className="social-label">GitHub</span>
    </a>
    <a className="social-link" href="https://x.com/heynomus" target="_blank" rel="noopener noreferrer" aria-label="Heynomus on X, @heynomus">
      <span className="social-x" aria-hidden="true">𝕏</span><span className="social-label">@heynomus</span>
    </a>
  </nav>;
}
