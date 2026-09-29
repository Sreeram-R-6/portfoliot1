import { siteContent, type PublicSiteContent } from "@/content/site";
import { DecorativeCanvas } from "./decorative-canvas";
import { FitText } from "./fit-text";
import "./contact-footer.css";

export function ContactFooter({ site = siteContent }: { site?: PublicSiteContent }) {
  const footer = site.footer;
  const contactLinks = [footer.message, ...(!footer.cv.href.startsWith("#") && !footer.cv.href.startsWith("TODO") ? [footer.cv] : [])];
  const groups = [
    contactLinks,
    footer.links,
    [{ label: site.location, href: footer.locationHref }],
  ];

  return (
    <footer id={footer.id} data-section="footer" className="contact-footer" aria-labelledby="footer-heading">
      <div className="footer-top-row">
        <div className="footer-contact-column">
          <h2 id="footer-heading" className="footer-contact-heading">{footer.title}</h2>
          <div className="footer-contact-actions">
            {contactLinks.map((link, index) => (
              <a key={`${index}-${link.label}`} href={link.href} className={`footer-action ${index === 1 ? "footer-action-secondary" : ""}`}>
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
              <div className="footer-link-group" key={index}>
                <p className="footer-group-label">{footer.groupLabels[index]}</p>
                {links.map((link, order) => (
                  <a key={`${order}-${link.label}`} className="footer-contact-link" href={link.href}>
                    <span>{link.label}</span><span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-wordmark-frame">
        <DecorativeCanvas kind="footer" label={site.name} className="h-full w-full">
          <FitText text={site.name} className="footer-wordmark" />
        </DecorativeCanvas>
        <span className="sr-only">{site.name}</span>
      </div>
      {footer.credits && <p className="footer-credits">{footer.credits}</p>}
    </footer>
  );
}
