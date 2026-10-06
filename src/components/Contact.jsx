import { useState } from 'react';
import { contactConfig, profile } from '../data/portfolio';
import { SectionHead } from './ui';
import { FadeIn, ProximityText, RollText } from './Kinetic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.';
  return e;
}

const items = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: profile.phoneHref },
  { label: 'Location', value: profile.location },
  { label: 'GitHub', value: `github.com/${profile.githubHandle}`, href: profile.github, external: true },
];

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const update = (k) => (e) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
    if (status === 'success' || status === 'error') setStatus('idle');
  };
  const blur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (values.company) { setStatus('success'); return; } // honeypot: silently drop bots

    setStatus('sending');
    const payload = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };

    if (contactConfig.endpoint) {
      try {
        const res = await fetch(contactConfig.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('success');
        setValues({ name: '', email: '', message: '', company: '' });
        setTouched({});
      } catch {
        setStatus('error');
      }
      return;
    }

    // No form service configured: hand off to the visitor's email app.
    const subject = encodeURIComponent(`Portfolio message from ${payload.name}`);
    const body = encodeURIComponent(`${payload.message}\n\n${payload.name}\n${payload.email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus('success');
  };

  const fieldProps = (k) => ({
    id: `f-${k}`,
    name: k,
    value: values[k],
    onChange: update(k),
    onBlur: blur(k),
    'aria-invalid': touched[k] && errors[k] ? 'true' : 'false',
    'aria-describedby': touched[k] && errors[k] ? `f-${k}-err` : undefined,
  });

  const Err = ({ k }) => (touched[k] && errors[k] ? (
    <span className="field-error" id={`f-${k}-err`}>{errors[k]}</span>
  ) : null);

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead
          scene="contact"
          id="contact-title"
          lines={["Let's build", 'something', 'useful.']}
          lede="Open to software engineering, cloud, AI/ML, and technology opportunities."
        />
        <FadeIn className="mega-wrap">
          <a className="mega-link" href={`mailto:${profile.email}`}>
            <ProximityText text={profile.email} min={300} max={800} radius={170} idle={false} />
          </a>
        </FadeIn>

        <div className="contact-grid">
          <ul className="contact-list">
            {items.map(({ label, value, href, external }, i) => (
              <FadeIn as="li" key={label} delay={i * 0.05} y={14}>
                {href ? (
                  <a className="contact-item" href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <small>{label}</small><span>{value}</span>
                  </a>
                ) : (
                  <div className="contact-item"><small>{label}</small><span>{value}</span></div>
                )}
              </FadeIn>
            ))}
          </ul>

          <FadeIn className="form-wrap" delay={0.1}>
            <form className="form" onSubmit={submit} noValidate aria-label="Send Akhil a message">
              <h3 className="label-row">Send a message</h3>
              <div className="form-body">
                <div className="field">
                  <label htmlFor="f-name">Name</label>
                  <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                  <Err k="name" />
                </div>
                <div className="field">
                  <label htmlFor="f-email">Email</label>
                  <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" {...fieldProps('email')} />
                  <Err k="email" />
                </div>
                <div className="field">
                  <label htmlFor="f-message">Message</label>
                  <textarea placeholder="Tell me about the role, team, or project." {...fieldProps('message')} />
                  <Err k="message" />
                </div>
                <div className="sr-only" aria-hidden="true">
                  <label htmlFor="f-company">Company</label>
                  <input id="f-company" tabIndex={-1} autoComplete="off" value={values.company} onChange={update('company')} />
                </div>

                {status === 'success' && (
                  <p className="form-status success" role="status">
                    {contactConfig.endpoint
                      ? 'Message sent. I’ll reply to the email you provided.'
                      : 'Your email app should open with the message ready to send. If it doesn’t, email ' + profile.email + '.'}
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-status error" role="alert">
                    The message didn’t go through. Check your connection and try again, or email {profile.email} directly.
                  </p>
                )}

                <div className="form-foot">
                  <p className="form-hint">I usually reply by email.</p>
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                    <RollText text={status === 'sending' ? 'Sending…' : 'Send message →'} />
                  </button>
                </div>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
