import { useState } from 'react';

function SendIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

/**
 * Client-side contact form. There's no backend behind this site, so on
 * submit it builds a mailto: link (subject + name/email/message pre-filled)
 * and hands off to the visitor's own email app, addressed to Antonio's
 * Gmail. To get silent, no-popup submissions instead, swap this out for a
 * form service like Formspree or EmailJS once you have an account/endpoint.
 */
export default function ContactForm({ email }) {
  const [name, setName] = useState('');
  const [fromEmail, setFromEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `New project inquiry from ${name || 'your website'}`;
    const body = `Name: ${name}\nEmail: ${fromEmail}\n\n${message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-row">
        <div className="contact-field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
        <div className="contact-field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            type="email"
            required
            value={fromEmail}
            onChange={(e) => setFromEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="contact-field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your project..."
        />
      </div>

      <button type="submit" className="btn-primary contact-form-submit">
        <SendIcon /> Send Message
      </button>
    </form>
  );
}
