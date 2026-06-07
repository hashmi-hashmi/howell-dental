'use client';
import { useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'Howell@2026';
const SECRET = 'howell2026admin';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const login = () => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) { setLoggedIn(true); fetchBookings(); }
    else setErr('Invalid credentials.');
  };

  const fetchBookings = async () => {
    setLoading(true);
    try { const r = await fetch(`/api/bookings?secret=${SECRET}`); setBookings(await r.json()); }
    catch { setBookings([]); }
    setLoading(false);
  };

  const markRead = async (id) => {
    await fetch(`/api/bookings/${id}?secret=${SECRET}`, { method: 'PATCH' });
    setBookings(p => p.map(b => b.id === id ? { ...b, read: true } : b));
    if (selected?.id === id) setSelected(p => ({ ...p, read: true }));
  };

  const today = new Date().toDateString();
  const filtered = bookings.filter(b => filter === 'unread' ? !b.read : filter === 'emergency' ? b.urgency === 'emergency' : true);
  const urgColor = u => u === 'emergency' ? '#e74c3c' : u === 'soon' ? '#e67e22' : '#2a6e5e';
  const urgLabel = u => u === 'emergency' ? '🚨 Emergency' : u === 'soon' ? '📅 Soon' : '🗓️ Standard';
  const fmt = d => new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const S = { fontFamily: "'DM Sans', sans-serif" };

  if (!loggedIn) return (
    <div style={{ minHeight: '100vh', background: '#060f0d', display: 'flex', alignItems: 'center', justifyContent: 'center', ...S }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0} input{outline:none}`}</style>
      <div style={{ background: '#0d1f1b', border: '1px solid rgba(201,169,110,0.2)', padding: '56px 48px', width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, background: '#c9a96e', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 24 }}>🦷</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: 'white', marginBottom: 4 }}>Admin Portal</h1>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 36 }}>Howell Dental Group</p>
        {['Username','Password'].map((ph, i) => (
          <input key={ph} type={i === 1 ? 'password' : 'text'} placeholder={ph}
            value={i === 0 ? user : pass}
            onChange={e => i === 0 ? setUser(e.target.value) : setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', padding: '14px 18px', marginBottom: 12, background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }} />
        ))}
        {err && <p style={{ color: '#e74c3c', fontSize: 13, marginBottom: 14 }}>{err}</p>}
        <button onClick={login} style={{ width: '100%', background: '#c9a96e', color: 'white', border: 'none', padding: 16, fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', marginBottom: 20 }}>Sign In →</button>
        <a href="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>← Back to website</a>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a1a16', ...S }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0} h1,h2,h3{font-family:'Cormorant Garamond',serif}`}</style>
      {/* Header */}
      <div style={{ background: '#060f0d', borderBottom: '1px solid rgba(201,169,110,0.15)', padding: '0 32px' }}>
        <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🦷</div>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: 'white', fontWeight: 600 }}>Howell Dental Group</div>
              <div style={{ fontSize: 10, color: 'rgba(201,169,110,0.7)', letterSpacing: 2, textTransform: 'uppercase' }}>Admin Dashboard</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <button onClick={fetchBookings} style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 18px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 1 }}>↻ Refresh</button>
            <a href="/" style={{ color: '#c9a96e', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>← Website</a>
            <button onClick={() => setLoggedIn(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)', padding: '8px 14px', fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '32px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
          {[
            ['Total', bookings.length, '📋', '#2a6e5e'],
            ["Today", bookings.filter(b => new Date(b.createdAt).toDateString() === today).length, '📅', '#2980b9'],
            ['Unread', bookings.filter(b=>!b.read).length, '🔴', '#e74c3c'],
            ['Emergency', bookings.filter(b=>b.urgency==='emergency').length, '🚨', '#e67e22'],
          ].map(([l,v,ic,c]) => (
            <div key={l} style={{ background: '#0d1f1b', border: '1px solid rgba(255,255,255,0.06)', borderTop: `3px solid ${c}`, padding: '24px 28px' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{ic}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 600, color: c, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 2, marginTop: 6 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>
          {/* List */}
          <div style={{ background: '#0d1f1b', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ fontSize: 20, color: 'white' }}>Appointment Requests</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                {['all','unread','emergency'].map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{ background: filter===f ? '#c9a96e' : 'rgba(255,255,255,0.05)', color: filter===f ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', padding: '7px 16px', fontSize: 11, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: 'capitalize', cursor: 'pointer' }}>{f}</button>
                ))}
              </div>
            </div>
            {loading ? (
              <div style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Loading…</div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: 60, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>📭</div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>No bookings yet. They will appear here when patients submit the form.</p>
              </div>
            ) : filtered.map(b => (
              <div key={b.id} onClick={() => { setSelected(b); if(!b.read) markRead(b.id); }}
                style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected?.id===b.id ? 'rgba(201,169,110,0.08)' : b.read ? 'transparent' : 'rgba(255,255,255,0.02)', borderLeft: `3px solid ${b.read ? 'transparent' : urgColor(b.urgency)}`, transition: 'background 0.2s' }}
                onMouseEnter={e => { if(selected?.id!==b.id) e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if(selected?.id!==b.id) e.currentTarget.style.background=b.read?'transparent':'rgba(255,255,255,0.02)'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
                      {!b.read && <span style={{ width: 7, height: 7, background: urgColor(b.urgency), borderRadius: '50%', display: 'inline-block', flexShrink: 0 }} />}
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: 'white' }}>{b.name}</span>
                      <span style={{ fontSize: 10, background: `${urgColor(b.urgency)}22`, color: urgColor(b.urgency), padding: '2px 8px', fontWeight: 700, letterSpacing: 0.5 }}>{urgLabel(b.urgency)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 3 }}>📞 {b.phone}</div>
                    <div style={{ fontSize: 13, color: '#2a6e5e', fontWeight: 600 }}>{b.service || 'Not specified'}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'right', whiteSpace: 'nowrap' }}>{fmt(b.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <div style={{ background: '#0d1f1b', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: 20, color: 'white' }}>Booking Detail</h2>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 20, cursor: 'pointer' }}>✕</button>
              </div>
              <div style={{ padding: '28px 24px' }}>
                <div style={{ marginBottom: 24, padding: '12px 16px', background: `${urgColor(selected.urgency)}15`, borderLeft: `3px solid ${urgColor(selected.urgency)}` }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: urgColor(selected.urgency) }}>{urgLabel(selected.urgency)}</span>
                </div>
                {[['Patient','name'],['Phone','phone'],['Email','email'],['Service','service'],['Submitted','createdAt'],['Status','read']].map(([label,key]) => (
                  <div key={key} style={{ display: 'flex', gap: 16, marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', minWidth: 90, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600, paddingTop: 1 }}>{label}</span>
                    <span style={{ fontSize: 15, color: key==='name' ? 'white' : 'rgba(255,255,255,0.6)', fontWeight: key==='name'?600:400 }}>
                      {key==='createdAt' ? fmt(selected.createdAt) : key==='read' ? (selected.read ? '✓ Read' : '● Unread') : selected[key] || '—'}
                    </span>
                  </div>
                ))}
                {selected.message && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 10 }}>Note</div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.85, background: 'rgba(255,255,255,0.03)', padding: 16, fontStyle: 'italic' }}>"{selected.message}"</div>
                  </div>
                )}
                <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <a href={`tel:${selected.phone}`} style={{ background: '#c9a96e', color: 'white', padding: '13px 24px', fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', display: 'inline-block' }}>📞 Call</a>
                  {selected.email && <a href={`mailto:${selected.email}`} style={{ background: 'rgba(255,255,255,0.07)', color: 'white', padding: '13px 24px', fontSize: 12, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', display: 'inline-block' }}>✉ Email</a>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
