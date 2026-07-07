import Reveal from './Reveal';
import ContactForm from './ContactForm';

/**
 * Combined "Get In Touch" CTA + closing footer bar. Kept as one <footer id="contact">
 * so both the nav anchor and the scroll-spy counter have a single target.
 */
export default function Footer({ contact }) {
  if (!contact) return null;

  return (
    <footer id="contact" className="contact-section">
      <div className="contact-section-inner">
        <Reveal>
          {contact.eyebrow && (
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>
              {contact.eyebrow}
            </div>
          )}
          <h2 className="section-title">{contact.title}</h2>
          <p>{contact.description}</p>

          <ContactForm email={contact.email} />

          <div className="contact-meta">
            <p>{contact.location}</p>
            {contact.phone && <p>{contact.phone}</p>}
          </div>
        </Reveal>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Antonio Miguel Apostol. All rights reserved.</p>
      </div>
    </footer>
  );
}
