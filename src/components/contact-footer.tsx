import { siteContent } from "@/content/site";
import { DecorativeCanvas } from "./decorative-canvas";
import "./contact-footer.css";

export function ContactFooter() {
  const footer = siteContent.footer;
  const groups = [
    [footer.message, footer.cv],
    footer.links,
    [{ label: siteContent.location, href: footer.locationHref }],
  ];

  return (
    <footer id={footer.id} data-section="footer" className="contact-footer" aria-labelledby="footer-heading">
      <div className="footer-top-row">
        <div className="footer-contact-column">
          <h2 id="footer-heading" className="footer-contact-heading">{footer.title}</h2>
          <div className="footer-contact-actions">
            {[footer.message, footer.cv].map((link, index) => (
              <a key={link.label} href={link.href} className={`footer-action ${index === 1 ? "footer-action-secondary" : ""}`}>
                <span aria-hidden="true" className="footer-action-corners" />
                <span>{link.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-links-column">
          <div className="footer-link-groups">
            {groups.map((links, index) => (
              <div className="footer-link-group" key={footer.groupLabels[index]}>
                <p className="footer-group-label">{footer.groupLabels[index]}</p>
                {links.map((link) => (
                  <a key={link.label} className="footer-contact-link" href={link.href}>
                    <span>{link.label}</span><span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-wordmark-frame">
        <DecorativeCanvas kind="footer" label={siteContent.name} className="h-full w-full">
          <span className="footer-wordmark">{siteContent.name}</span>
        </DecorativeCanvas>
        <span className="sr-only">{siteContent.name}</span>
      </div>
    </footer>
  );
}
