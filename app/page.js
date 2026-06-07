'use client';
import { useState, useEffect, useRef } from 'react';

// Images — using Unsplash as fallback since clinic images may be blocked cross-origin
const IMG = {
  hero: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1400&q=80',
  about: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80',
  clinic: 'https://images.unsplash.com/photo-1588776814546-1ffedec9e412?w=900&q=80',
  team: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=80',
  logo: 'https://www.howelldentalgroup.com/wp-content/uploads/2025/01/LogoSmall.png',
};

const SERVICES = [
  { icon: '✦', title: 'General Dentistry', desc: 'Comprehensive exams, cleanings, X-rays, and preventive treatments for the whole family.' },
  { icon: '◈', title: 'Cosmetic Dentistry', desc: 'Veneers, whitening, bonding, and smile makeovers to give you the confidence you deserve.' },
  { icon: '⬡', title: 'Restorative Care', desc: 'Crowns, bridges, fillings, and implants to restore function and beauty to your smile.' },
  { icon: '◎', title: 'Orthodontics', desc: 'Traditional braces and clear aligners to straighten smiles at any age.' },
  { icon: '✧', title: 'Pediatric Dentistry', desc: 'Gentle, fun dental experiences that build lifelong healthy habits for your children.' },
  { icon: '⚡', title: 'Emergency Dental', desc: 'Same-day emergency appointments — call us first when dental pain strikes.' },
];

const REVIEWS = [
  { name: 'Maria L.', area: 'Bay View', stars: 5, text: 'Best dental office in Milwaukee. The staff made my kids feel completely at ease. We have been loyal patients for 5 years and will never go anywhere else.' },
  { name: 'James K.', area: 'SE Milwaukee', stars: 5, text: 'Emergency on a Friday morning and they fit me in same day. Professional, efficient, and very fair on pricing. I cannot recommend them enough.' },
  { name: 'Sandra R.', area: 'Walker\'s Point', stars: 5, text: 'I actually look forward to my dental appointments now. Clean modern clinic, no waiting, and they explain every step clearly. Truly exceptional care.' },
  { name: 'Tom B.', area: 'Milwaukee', stars: 5, text: 'My whole family comes here. Amazing with our anxious 7-year-old who now loves going to the dentist. That says everything about this team.' },
];

const FAQS = [
  { q: 'Are you accepting new patients?', a: 'Yes — we welcome new patients of all ages. Book online or call 414-744-3333 and we will find you the earliest available slot.' },
  { q: 'What insurance do you accept?', a: 'We accept most major dental insurance plans. Contact our office and we will verify your benefits before your first visit at no charge.' },
  { q: 'Do you handle dental emergencies?', a: 'Absolutely. Same-day emergency appointments are available. Call us as early as possible and we will prioritize your care.' },
  { q: 'What are your hours?', a: 'Mon, Tue & Thu: 8AM–5PM · Wed: 8AM–2PM · Fri: 8AM–1PM · Sat: 8AM–12PM · Closed Sunday.' },
  { q: 'Is the office child-friendly?', a: 'We specialize in family care. Our team is specially trained to make children feel safe, comfortable, and even excited about their dental visits.' },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); o.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, dir = 'up', className = '' }) {
  const [ref, visible] = useReveal();
  const transforms = { up: 'translateY(36px)', left: 'translateX(-36px)', right: 'translateX(36px)', scale: 'scale(0.94)' };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[dir],
      transition: `opacity 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}s`
    }}>{children}</div>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', urgency: 'standard', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  const submit = async () => {
    if (!form.name || !form.phone) { setFormError('Please enter your name and phone number.'); return; }
    setSubmitting(true); setFormError('');
    try {
      const r = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (r.ok) setSubmitted(true);
      else setFormError('Something went wrong. Please call us directly.');
    } catch { setFormError('Network error. Please call us directly at 414-744-3333.'); }
    setSubmitting(false);
  };

  return (
    <>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(13,31,27,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,169,110,0.15)' : 'none',
        transition: 'all 0.4s ease', padding: '0 40px'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 42, height: 42, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🦷</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: 'white', letterSpacing: 0.5 }}>Howell Dental Group</div>
              <div style={{ fontSize: 10, color: 'rgba(201,169,110,0.8)', letterSpacing: 2.5, textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>Milwaukee, Wisconsin</div>
            </div>
          </div>
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {['services','about','reviews','faq'].map(s => (
              <button key={s} onClick={() => go(s)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)', fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.75)'}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
            <button onClick={() => go('book')} className="btn-gold" style={{ padding: '12px 26px', fontSize: 12 }}>Book Now</button>
            <a href="tel:4147443333" style={{ color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>414-744-3333</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 26, cursor: 'pointer' }} className="mobile-full" id="menu-btn">☰</button>
        </div>
        {menuOpen && (
          <div style={{ background: 'rgba(13,31,27,0.98)', backdropFilter: 'blur(20px)', padding: '20px 40px 32px', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
            {['services','about','reviews','faq','book'].map(s => (
              <button key={s} onClick={() => go(s)} style={{ display: 'block', background: 'none', border: 'none', color: 'white', padding: '13px 0', fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', width: '100%', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {s === 'book' ? 'Book Appointment' : s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
            <a href="tel:4147443333" style={{ display: 'block', color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, marginTop: 20 }}>📞 414-744-3333</a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--dark)' }}>
        <img src={IMG.hero} alt="Modern dental clinic" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,31,27,0.95) 0%, rgba(13,31,27,0.6) 60%, rgba(13,31,27,0.3) 100%)' }} />
        {/* Gold accent line */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)' }} />
        <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '140px 40px 100px', width: '100%' }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(201,169,110,0.12)', border: '1px solid rgba(201,169,110,0.3)', padding: '8px 20px', marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)' }}>SE Milwaukee's Trusted Family Dentist</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: 28, letterSpacing: '-0.5px' }}>
              Your Smile<br />
              <em style={{ fontStyle: 'italic', color: 'var(--gold)', fontWeight: 400 }}>Deserves</em>
              <br />
              <span style={{ fontWeight: 600 }}>Excellence.</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.85, color: 'rgba(255,255,255,0.65)', maxWidth: 520, marginBottom: 44, fontWeight: 300 }}>
              Decades of compassionate, family-focused dental care in the heart of Milwaukee. Modern techniques. Warm hands. Genuine results.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
              <button onClick={() => go('book')} className="btn-gold">Book Appointment →</button>
              <a href="tel:4147443333" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}>
                📞 Call Now
              </a>
            </div>
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
              {[['4.9★', '200+ Reviews'], ['30+', 'Years Serving Milwaukee'], ['All Ages', 'Family Welcome']].map(([num, label], i) => (
                <div key={num} style={{ paddingRight: 36, marginRight: 36, borderRight: i < 2 ? '1px solid rgba(255,255,255,0.12)' : 'none' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: 2, marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: 3, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</div>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)' }} />
        </div>
      </section>

      {/* TRUST BAR */}
      <div style={{ background: 'var(--green)', padding: '18px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '4vw', flexWrap: 'wrap', alignItems: 'center' }}>
          {['✓ Accepting New Patients', '✓ All Ages Welcome', '✓ Most Insurance Accepted', '✓ Same-Day Emergency Care', '✓ Saturday Hours Available'].map(t => (
            <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.85)', letterSpacing: 1 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" style={{ background: 'var(--cream)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <span className="section-label">What We Offer</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.15, maxWidth: 560 }}>
              Comprehensive Care, <em>Crafted</em> for You
            </h2>
            <div className="divider" />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: 'var(--muted)', maxWidth: 520, lineHeight: 1.85, marginBottom: 64 }}>
              From your first checkup to a complete smile transformation — everything under one roof, delivered with genuine care.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 1, background: 'var(--cream-dark)' }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.07}>
                <div style={{ background: 'var(--cream)', padding: '48px 40px', cursor: 'default', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--dark)'; e.currentTarget.querySelector('.svc-icon').style.color = 'var(--gold)'; e.currentTarget.querySelector('.svc-title').style.color = 'white'; e.currentTarget.querySelector('.svc-desc').style.color = 'rgba(255,255,255,0.6)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.querySelector('.svc-icon').style.color = 'var(--gold)'; e.currentTarget.querySelector('.svc-title').style.color = 'var(--dark)'; e.currentTarget.querySelector('.svc-desc').style.color = 'var(--muted)'; }}>
                  <div className="svc-icon" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: 'var(--gold)', marginBottom: 20, transition: 'color 0.3s' }}>{s.icon}</div>
                  <h3 className="svc-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: 'var(--dark)', marginBottom: 12, transition: 'color 0.3s' }}>{s.title}</h3>
                  <p className="svc-desc" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'var(--muted)', lineHeight: 1.8, transition: 'color 0.3s' }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: 'var(--dark)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal dir="left">
            <div style={{ position: 'relative' }}>
              <img src={IMG.about} alt="Dentist with patient" style={{ width: '100%', height: 540, objectFit: 'cover' }} />
              <img src={IMG.clinic} alt="Clinic interior" style={{ position: 'absolute', bottom: -32, right: -32, width: 200, height: 200, objectFit: 'cover', border: '4px solid var(--dark)' }} />
              <div style={{ position: 'absolute', top: -20, left: -20, background: 'var(--gold)', padding: '20px 24px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: 'white', lineHeight: 1 }}>30+</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.8)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>Years</div>
              </div>
            </div>
          </Reveal>
          <Reveal dir="right" delay={0.15}>
            <div>
              <span className="section-label">Why Choose Us</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 600, color: 'white', lineHeight: 1.2, marginBottom: 10 }}>
                Dentistry with Heart,<br /><em style={{ color: 'var(--gold)' }}>Done Right.</em>
              </h2>
              <div className="divider" />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 40 }}>
                We believe great dentistry is about more than perfect teeth — it is about building trust, easing anxiety, and creating an experience patients look forward to.
              </p>
              {[
                ['Family First', 'We treat patients from age 1 to 100. Every member of your family gets personalized, compassionate attention.'],
                ['Flexible Scheduling', 'Monday through Saturday, early morning slots available. We fit into your life, not the other way around.'],
                ['Insurance Made Easy', 'We accept most major plans and handle the paperwork. Transparent pricing, no surprises.'],
                ['Emergency Ready', 'Same-day emergency slots. When you are in pain, we prioritize getting you seen fast.'],
              ].map(([title, desc], i) => (
                <div key={title} style={{ display: 'flex', gap: 18, marginBottom: 24, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 700 }}>{String(i+1).padStart(2,'0')}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 4 }}>{title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', height: 280 }}>
        {[IMG.hero, IMG.team, IMG.clinic].map((img, i) => (
          <div key={i} style={{ overflow: 'hidden', position: 'relative' }}>
            <img src={img} alt="Howell Dental" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.75)', transition: 'all 0.6s ease' }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.07)'; e.target.style.filter = 'brightness(0.9)'; }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.filter = 'brightness(0.75)'; }} />
            {i === 1 && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: 'white', lineHeight: 1 }}>214+</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: 'var(--gold)', letterSpacing: 3, textTransform: 'uppercase', marginTop: 6 }}>Happy Patients</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* REVIEWS */}
      <section id="reviews" style={{ background: 'var(--cream-dark)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <span className="section-label" style={{ display: 'block', textAlign: 'center' }}>Patient Testimonials</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.15 }}>
              Words from Our <em>Patients</em>
            </h2>
            <div className="divider divider-center" />
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.1}>
                <div style={{ background: 'white', padding: '36px 32px', position: 'relative', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, var(--gold), var(--gold-light))' }} />
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 56, color: 'var(--gold)', opacity: 0.2, lineHeight: 1, marginBottom: 8, position: 'absolute', top: 20, right: 24 }}>"</div>
                  <div style={{ color: 'var(--gold)', fontSize: 13, marginBottom: 16, letterSpacing: 2 }}>{'★'.repeat(r.stars)}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: '#333', lineHeight: 1.85, marginBottom: 24, fontStyle: 'italic' }}>"{r.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, background: 'var(--green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600 }}>{r.name[0]}</div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--dark)' }}>{r.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--muted)', letterSpacing: 0.5 }}>{r.area}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: 'var(--cream)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Reveal>
            <span className="section-label">FAQ</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'var(--dark)', lineHeight: 1.15, marginBottom: 10 }}>
              Common Questions
            </h2>
            <div className="divider" style={{ marginBottom: 48 }} />
          </Reveal>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <div style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', background: 'none', border: 'none', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', gap: 20 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, fontWeight: 600, color: openFaq === i ? 'var(--green-mid)' : 'var(--dark)', transition: 'color 0.2s' }}>{f.q}</span>
                  <span style={{ width: 28, height: 28, border: '1px solid', borderColor: openFaq === i ? 'var(--green-mid)' : '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: openFaq === i ? 'var(--green-mid)' : '#aaa', fontSize: 18, fontWeight: 300, flexShrink: 0, transition: 'all 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'var(--muted)', lineHeight: 1.85, paddingBottom: 24 }}>{f.a}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" style={{ background: 'var(--dark)', padding: '120px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <Reveal dir="left">
            <span className="section-label">Get Started</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 600, color: 'white', lineHeight: 1.2, marginBottom: 10 }}>
              Book Your<br /><em style={{ color: 'var(--gold)' }}>Appointment</em>
            </h2>
            <div className="divider" />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85, marginBottom: 48 }}>Fill out the form and we will call you to confirm. Same-day emergency appointments available.</p>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '32px 36px' }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: 'white', marginBottom: 24 }}>📍 Location & Hours</h3>
              {[
                ['Address', '3814 S Howell Ave, Milwaukee WI 53207'],
                ['Phone', '414-744-3333'],
                ['Mon, Tue & Thu', '8:00 AM – 5:00 PM'],
                ['Wednesday', '8:00 AM – 2:00 PM'],
                ['Friday', '8:00 AM – 1:00 PM'],
                ['Saturday', '8:00 AM – 12:00 PM'],
                ['Sunday', 'Closed'],
              ].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', gap: 16, marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'var(--gold)', minWidth: 110, fontWeight: 600, letterSpacing: 0.5, paddingTop: 1 }}>{l}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>{v}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal dir="right" delay={0.15}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 40px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.2)' }}>
                <div style={{ width: 72, height: 72, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32 }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: 'white', marginBottom: 16 }}>Request Received!</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.85 }}>Thank you, {form.name}! We will call you at {form.phone} shortly to confirm your appointment. We look forward to seeing you!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <select value={form.urgency} onChange={e => setForm({...form, urgency: e.target.value})} style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white', fontFamily: "'DM Sans', sans-serif", padding: '15px 18px', fontSize: 14 }}>
                  <option value="emergency" style={{ color: '#000' }}>🚨 Emergency — Need help today</option>
                  <option value="soon" style={{ color: '#000' }}>📅 Soon — Within a few days</option>
                  <option value="standard" style={{ color: '#000' }}>🗓️ Standard — Schedule at convenience</option>
                </select>
                {[
                  { ph: 'Full Name *', key: 'name' },
                  { ph: 'Phone Number *', key: 'phone' },
                  { ph: 'Email Address', key: 'email' },
                ].map(({ ph, key }) => (
                  <input key={key} placeholder={ph} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white', fontFamily: "'DM Sans', sans-serif", padding: '15px 18px', fontSize: 14 }} />
                ))}
                <select value={form.service} onChange={e => setForm({...form, service: e.target.value})} style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', color: form.service ? 'white' : 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", padding: '15px 18px', fontSize: 14 }}>
                  <option value="" style={{ color: '#000' }}>Select a Service…</option>
                  {SERVICES.map(s => <option key={s.title} value={s.title} style={{ color: '#000' }}>{s.title}</option>)}
                </select>
                <textarea placeholder="Describe your concern (optional)" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)', color: 'white', fontFamily: "'DM Sans', sans-serif", padding: '15px 18px', fontSize: 14, resize: 'vertical', outline: 'none' }} />
                {formError && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#e74c3c' }}>{formError}</p>}
                <button onClick={submit} disabled={submitting} className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: 13, letterSpacing: 2, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Submitting…' : 'Request Appointment →'}
                </button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>We will call to confirm. No commitment required.</p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#060f0d', padding: '72px 40px 32px', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 64, marginBottom: 64 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🦷</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: 'white' }}>Howell Dental Group</div>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.85, maxWidth: 300, marginBottom: 28 }}>Compassionate, family-focused dental care for Milwaukee residents. Your smile is our mission.</p>
              <a href="tel:4147443333" className="btn-gold" style={{ fontSize: 12 }}>📞 414-744-3333</a>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Navigation</div>
              {['services','about','reviews','faq','book'].map(s => (
                <button key={s} onClick={() => go(s)} style={{ display: 'block', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontFamily: "'DM Sans', sans-serif", fontSize: 14, cursor: 'pointer', padding: '7px 0', textTransform: 'capitalize', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                  {s === 'book' ? 'Book Appointment' : s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Visit Us</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 2.1 }}>
                3814 South Howell Avenue<br />Milwaukee, WI 53207<br /><br />
                Mon–Tue & Thu: 8–5<br />Wed: 8–2 · Fri: 8–1<br />Sat: 8–12 · Sun: Closed
              </p>
              <a href="/admin" style={{ display: 'block', color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Sans', sans-serif", fontSize: 11, marginTop: 24, letterSpacing: 1 }}>Staff Portal</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 Howell Dental Group. All rights reserved.</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>3814 S Howell Ave, Milwaukee, WI 53207</p>
          </div>
        </div>
      </footer>
    </>
  );
}
