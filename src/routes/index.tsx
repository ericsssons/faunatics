import { createFileRoute } from "@tanstack/react-router";
import {
  Heart, Users, Truck, Phone, Instagram, MapPin, Clock,
  Star, Sparkles, ShoppingBag, Leaf, ArrowRight, Menu, X, CheckCircle2,
  MessageCircle, PawPrint,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const PHONE = "654 10 82 09";
const PHONE_TEL = "+34654108209";
const WHATSAPP_URL = "https://wa.me/34654108209?text=Hola%2C%20m'agradaria%20obtenir%20m%C3%A9s%20informaci%C3%B3%20sobre%20els%20vostres%20productes.";
const MAPS_URL = "https://www.google.com/maps/place/Faun%C3%A0tics+Reus/@41.1507486,1.0934748,14.5z/data=!4m6!3m5!1s0x12a151cb895593d9:0x93c36c07d61beab8!8m2!3d41.1588712!4d1.0733441!16s%2Fg%2F11c58241nt?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D";
const INSTAGRAM = "https://www.instagram.com/faunatics_/?hl=es";

const heroImg = "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1400&q=85&auto=format";
const productFood = "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=800&q=80&auto=format";
const productCare = "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80&auto=format";
const productToys = "https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&q=80&auto=format";

// ── HOOK: IntersectionObserver ──────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── HOOK: Comptador animat ──────────────────────────────────────
function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

// ── SVG LOGO FAUNÀTICS ──────────────────────────────────────────
function FaunaticsLogo({ size = 36, scrolled = false }: { size?: number; scrolled?: boolean }) {
  return (
    <svg
      width={size * 3.2}
      height={size}
      viewBox="0 0 160 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transition: "all 0.3s ease" }}
    >
      {/* Icona pateta */}
      <circle cx="12" cy="25" r="10" fill="#C0392B" />
      <circle cx="6" cy="14" r="4.5" fill="#C0392B" />
      <circle cx="18" cy="14" r="4.5" fill="#C0392B" />
      <circle cx="3" cy="20" r="3.5" fill="#C0392B" />
      <circle cx="21" cy="20" r="3.5" fill="#C0392B" />
      {/* Text Faunàtics */}
      <text
        x="30"
        y="34"
        fontFamily="'Quicksand', sans-serif"
        fontWeight="700"
        fontSize={scrolled ? "22" : "24"}
        fill="#C0392B"
        style={{ transition: "font-size 0.3s ease" }}
      >
        Faunàtics
      </text>
    </svg>
  );
}

// ── FAVICON INJECTAT DINÀMICAMENT ───────────────────────────────
function useFavicon() {
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <circle cx="16" cy="20" r="11" fill="#C0392B"/>
      <circle cx="9" cy="9" r="5" fill="#C0392B"/>
      <circle cx="23" cy="9" r="5" fill="#C0392B"/>
      <circle cx="4.5" cy="15" r="4" fill="#C0392B"/>
      <circle cx="27.5" cy="15" r="4" fill="#C0392B"/>
      <circle cx="16" cy="20" r="7" fill="white"/>
      <circle cx="12" cy="18" r="2.5" fill="#C0392B"/>
      <circle cx="20" cy="18" r="2.5" fill="#C0392B"/>
      <ellipse cx="16" cy="22" rx="3" ry="2" fill="#C0392B"/>
    </svg>`;
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = url;
    document.title = "Faunàtics Reus — Botiga de mascotes";
    return () => URL.revokeObjectURL(url);
  }, []);
}

export const Route = createFileRoute("/")({
  component: Index,
});

// ── WHATSAPP FLOTANT ────────────────────────────────────────────
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    const t2 = setTimeout(() => setPulse(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
      aria-label="Contactar per WhatsApp"
      style={{
        position: "fixed", bottom: 24, right: 24, zIndex: 999,
        width: 60, height: 60, borderRadius: "50%",
        background: "linear-gradient(135deg, #25d366, #128c7e)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        textDecoration: "none", color: "white",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.5) translateY(20px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
      <MessageCircle size={28} fill="white" color="white" />
      {pulse && (
        <span style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "rgba(37,211,102,0.4)",
          animation: "waPulse 1.5s ease-out infinite",
        }} />
      )}
      <style>{`@keyframes waPulse { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(1.8);opacity:0} }`}</style>
    </a>
  );
}

// ── NAV ─────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: "#inici", label: "Inici" },
    { href: "#productes", label: "Productes" },
    { href: "#assessorament", label: "Assessorament" },
    { href: "#opinions", label: "Opinions" },
    { href: "#ubicacio", label: "Ubicació" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.35s ease",
      background: scrolled ? "rgba(255,248,247,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(192,57,43,0.12)" : "none",
      boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.07)" : "none",
      // Altura que redueix en fer scroll
      height: scrolled ? 58 : 70,
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem",
        height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "height 0.35s ease",
      }}>
        {/* LOGO SVG amb transició de mida */}
        <a href="#inici" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <FaunaticsLogo size={scrolled ? 30 : 36} scrolled={scrolled} />
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden-mobile">
          {links.map(l => (
            <a key={l.href} href={l.href}
              style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, fontWeight: 600, color: "#4a2020", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C0392B")}
              onMouseLeave={e => (e.currentTarget.style.color = "#4a2020")}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hidden-mobile" style={{
            display: "flex", alignItems: "center", gap: 7,
            padding: scrolled ? "8px 16px" : "9px 18px",
            background: "#25d366", color: "white", borderRadius: 50,
            textDecoration: "none", fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: 13, transition: "all 0.3s ease",
            boxShadow: "0 2px 10px rgba(37,211,102,0.35)",
          }}>
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href={`tel:${PHONE_TEL}`} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: scrolled ? "8px 18px" : "10px 20px",
            background: "linear-gradient(135deg, #C0392B, #E74C3C)", color: "white",
            borderRadius: 50, textDecoration: "none", fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: 13, transition: "all 0.3s ease",
            boxShadow: "0 3px 12px rgba(192,57,43,0.4)",
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 5px 16px rgba(192,57,43,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 3px 12px rgba(192,57,43,0.4)"; }}>
            <Phone size={14} /> Truca ara
          </a>
          <button onClick={() => setOpen(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: "#4a2020" }}
            className="show-mobile" aria-label="Menú">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "rgba(255,248,247,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(192,57,43,0.1)", padding: "1rem 1.5rem 1.5rem" }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0", fontFamily: "'Nunito', sans-serif",
              fontWeight: 600, fontSize: 16, color: "#4a2020", textDecoration: "none",
              borderBottom: "1px solid rgba(192,57,43,0.08)",
            }}>{l.label}</a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px", background: "#25d366", color: "white", borderRadius: 50,
              textDecoration: "none", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14,
            }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href={`tel:${PHONE_TEL}`} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              padding: "13px", background: "linear-gradient(135deg, #C0392B, #E74C3C)",
              color: "white", borderRadius: 50, textDecoration: "none",
              fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14,
            }}>
              <Phone size={16} /> Trucar
            </a>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap');
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #FFF8F7; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
      `}</style>
    </header>
  );
}

// ── HERO ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="inici" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src={heroImg} alt="Botiga Faunàtics Reus" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(60,5,5,0.82) 0%, rgba(100,10,10,0.58) 50%, rgba(0,0,0,0.15) 100%)" }} />
      </div>

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "7rem 1.5rem 4rem", width: "100%" }}>
        <div style={{ maxWidth: 620 }}>
          <div className="fade-up" style={{ animationDelay: "0.1s", opacity: 0, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(231,76,60,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(231,76,60,0.45)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
            <Star size={14} fill="#f5c842" color="#f5c842" />
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600, color: "#ffc8c2" }}>4,7 ★ a Google · Reus, Tarragona</span>
          </div>

          <h1 className="fade-up" style={{ animationDelay: "0.2s", opacity: 0, fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.6rem)", color: "white", lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.5px" }}>
            Cuidem els que<br />
            <span style={{ color: "#F1948A" }}>més estimes</span> a Reus.
          </h1>

          <p className="fade-up" style={{ animationDelay: "0.35s", opacity: 0, fontFamily: "'Nunito', sans-serif", fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
            Molt més que una botiga de mascotes: assessorament personalitzat, productes d'alta qualitat i un tracte humà i inclusiu.
          </p>

          <div className="fade-up" style={{ animationDelay: "0.5s", opacity: 0, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px",
              background: "linear-gradient(135deg, #C0392B, #E74C3C)", color: "white",
              borderRadius: 50, textDecoration: "none", fontFamily: "'Nunito', sans-serif",
              fontWeight: 700, fontSize: 15, boxShadow: "0 4px 20px rgba(192,57,43,0.5)",
            }}>
              <MapPin size={16} /> Com arribar-hi
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px",
              background: "#25d366", color: "white", borderRadius: 50,
              textDecoration: "none", fontFamily: "'Nunito', sans-serif",
              fontWeight: 700, fontSize: 15, boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
            }}>
              <MessageCircle size={16} /> Escriu-nos per WhatsApp
            </a>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.65s", opacity: 0, display: "flex", flexWrap: "wrap", gap: 20, marginTop: 40 }}>
            {[
              { icon: <Heart size={14} />, label: "Tracte proper i humà" },
              { icon: <CheckCircle2 size={14} />, label: "Especialistes en nutrició" },
              { icon: <Leaf size={14} />, label: "Productes premium" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.75)", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 600 }}>
                <span style={{ color: "#F1948A" }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #FFF8F7, transparent)" }} />
    </section>
  );
}

// ── COMPTADORS ANIMATS ──────────────────────────────────────────
function Stats() {
  const { ref, visible } = useInView(0.3);
  const families = useCounter(1000, 1800, visible);
  const years    = useCounter(8, 1400, visible);
  const rating   = useCounter(47, 1600, visible);

  const stats = [
    { value: families, suffix: "+", label: "famílies confien en nosaltres", icon: <Heart size={22} /> },
    { value: years,    suffix: "+", label: "anys al servei de Reus",         icon: <Star  size={22} /> },
    { value: rating,   suffix: "",  label: "sobre 50 a Google Reviews",      icon: <PawPrint size={22} />, prefix: "", display: `${Math.floor(rating / 10)},${rating % 10}` },
  ];

  return (
    <section style={{ background: "linear-gradient(135deg, #C0392B 0%, #A93226 50%, #C0392B 100%)", padding: "4rem 1.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
        {stats.map((s, i) => (
          <div key={s.label} className={visible ? "fade-up" : ""} style={{
            animationDelay: `${i * 0.15}s`, opacity: visible ? undefined : 0,
            textAlign: "center",
          }}>
            <div style={{ color: "rgba(255,255,255,0.6)", marginBottom: 8, display: "flex", justifyContent: "center" }}>{s.icon}</div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 5vw, 3.2rem)", color: "white", lineHeight: 1, letterSpacing: "-1px" }}>
              {s.display ?? `${s.value}${s.suffix}`}
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.72)", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── VALORS ──────────────────────────────────────────────────────
function Values() {
  const { ref, visible } = useInView();
  const items = [
    { icon: <Heart size={24} />, title: "Atenció Personalitzada", desc: "L'Anna i el seu equip t'assessoren amb cura. Especialistes en nutrició com Hydra Care.", color: "#FDECEA", accent: "#C0392B" },
    { icon: <Sparkles size={24} />, title: "Varietat Premium", desc: "Àmplia selecció de pinsos, joguines i accessoris per a gossos, gats i molt més.", color: "#fef3e2", accent: "#c17d1a" },
    { icon: <Users size={24} />, title: "Comunitat Inclusiva", desc: "Negoci liderat per dones, orgullosament LGBTQ+ friendly i acollidor per a tothom.", color: "#fde8f0", accent: "#b5367a" },
    { icon: <Truck size={24} />, title: "Servei Local", desc: "Compra a la botiga, recollida a la porta o lliurament a domicili a Reus.", color: "#e8f0fe", accent: "#3a5bb8" },
  ];
  return (
    <section id="assessorament" style={{ background: "linear-gradient(180deg, #FFF8F7 0%, #FBF0EE 100%)", padding: "6rem 1.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#C0392B", letterSpacing: "2px", textTransform: "uppercase" }}>Els nostres valors</span>
          <h2 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#3D0A06", marginTop: 8, marginBottom: 12, letterSpacing: "-0.3px" }}>
            Una botiga amb ànima,<br />no només un comerç.
          </h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b3030", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            El que ens diferencia és la manera com cuidem cada mascota i cada família.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {items.map((item, i) => (
            <div key={item.title} className={visible ? "fade-up" : ""} style={{
              animationDelay: `${i * 0.1}s`, opacity: visible ? undefined : 0,
              background: "white", borderRadius: 20, padding: "2rem 1.75rem",
              border: "1px solid rgba(192,57,43,0.08)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              transition: "transform 0.25s, box-shadow 0.25s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(192,57,43,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.06)"; }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: item.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: item.accent }}>
                {item.icon}
              </div>
              <h3 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 17, color: "#3D0A06", marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#6b3030", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PRODUCTES ───────────────────────────────────────────────────
function Products() {
  const { ref, visible } = useInView();
  const cards = [
    { img: productFood, tag: "Més venut",  title: "Alimentació d'Alta Gamma",   desc: "Pinsos seleccionats per a cada etapa, raça i necessitat. Nutrició que es nota des del primer dia.", icon: <ShoppingBag size={16} />, color: "#C0392B" },
    { img: productCare, tag: "Especialitat", title: "Salut i Cura · Hydra Care", desc: "Productes especialitzats per a hidratació, pell i benestar diari recomanats per experts.", icon: <Leaf size={16} />, color: "#c17d1a" },
    { img: productToys, tag: "Per jugar",  title: "Accessoris i Joguines",       desc: "Diversió, descans i passejades: tot el que el teu pelut necessita per ser feliç amb tu.", icon: <PawPrint size={16} />, color: "#b5367a" },
  ];
  return (
    <section id="productes" style={{ background: "#FFF8F7", padding: "6rem 1.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", gap: 16 }}>
          <div>
            <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#C0392B", letterSpacing: "2px", textTransform: "uppercase" }}>Productes destacats</span>
            <h2 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#3D0A06", marginTop: 8, letterSpacing: "-0.3px" }}>
              Qualitat seleccionada<br />amb cura.
            </h2>
          </div>
          <a href={`tel:${PHONE_TEL}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: "#C0392B", textDecoration: "none" }}>
            Pregunta'ns per una marca <ArrowRight size={16} />
          </a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {cards.map((c, i) => (
            <article key={c.title} className={visible ? "fade-up" : ""} style={{
              animationDelay: `${i * 0.12}s`, opacity: visible ? undefined : 0,
              background: "white", borderRadius: 24, overflow: "hidden",
              border: "1px solid rgba(192,57,43,0.08)", boxShadow: "0 3px 18px rgba(0,0,0,0.07)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(192,57,43,0.14)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 3px 18px rgba(0,0,0,0.07)"; }}>
              <div style={{ aspectRatio: "4/3", overflow: "hidden", position: "relative" }}>
                <img src={c.img} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(255,248,247,0.93)", backdropFilter: "blur(6px)", borderRadius: 50, padding: "4px 12px", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, color: c.color, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                  {c.tag}
                </div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: c.color, marginBottom: 8 }}>
                  {c.icon}
                  <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1px", textTransform: "uppercase" }}>Destacat</span>
                </div>
                <h3 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 18, color: "#3D0A06", marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#6b3030", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CATÀLEG DE PRODUCTES ────────────────────────────────────────
function Catalogue() {
  const { ref, visible } = useInView();

  const categories = [
    { icon: <ShoppingBag size={28} />, name: "Alimentació", desc: "Pinsos, llaunes i snacks", color: "#FDECEA", accent: "#C0392B" },
    { icon: <Leaf size={28} />, name: "Salut i Higiene", desc: "Xampús, antiparasitaris i cura", color: "#fef3e2", accent: "#c17d1a" },
    { icon: <PawPrint size={28} />, name: "Joguines", desc: "Per a gossos, gats i altres", color: "#fde8f0", accent: "#b5367a" },
    { icon: <Heart size={28} />, name: "Accessoris", desc: "Collars, lliteres i transportins", color: "#e8f0fe", accent: "#3a5bb8" },
    { icon: <Sparkles size={28} />, name: "Hidra Care", desc: "Línia especialitzada d'hidratació", color: "#FDECEA", accent: "#C0392B" },
    { icon: <Users size={28} />, name: "Petits animals", desc: "Productes per a rosegadors i ocells", color: "#e8f5e9", accent: "#2e7d32" },
  ];

  return (
    <section id="cataleg" style={{ background: "#FFF8F7", padding: "6rem 1.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Capçalera */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#C0392B", letterSpacing: "2px", textTransform: "uppercase" }}>
            Catàleg
          </span>
          <h2 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#3D0A06", marginTop: 8, marginBottom: 12, letterSpacing: "-0.3px" }}>
            Els nostres productes
          </h2>
          <p style={{ fontFamily: "'Nunito', sans-serif", color: "#6b3030", fontSize: 16, maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Aviat podràs consultar tots els nostres productes aquí. De moment, vine a la botiga o escriu-nos i t'assessorem personalment.
          </p>
        </div>

        {/* Banner "Pròximament" */}
        <div style={{
          background: "linear-gradient(135deg, #C0392B, #E74C3C)",
          borderRadius: 20, padding: "2rem 2.5rem", marginBottom: "2.5rem",
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20,
        }}>
          <div>
            <div style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 22, color: "white", marginBottom: 6 }}>
              🛍️ Catàleg complet — Pròximament
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
              Estem preparant el catàleg en línia amb tots els productes de la botiga.<br />
              Mentrestant, escriu-nos i et diem si el tenim disponible.
            </div>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 26px",
            background: "white", color: "#C0392B", borderRadius: 50,
            textDecoration: "none", fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: 15, boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap", transition: "transform 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}>
            <MessageCircle size={16} /> Preguntar per WhatsApp
          </a>
        </div>

        {/* Graella de categories */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {categories.map((cat, i) => (
            <div key={cat.name} className={visible ? "fade-up" : ""} style={{
              animationDelay: `${i * 0.08}s`, opacity: visible ? undefined : 0,
              background: "white", borderRadius: 18, padding: "1.75rem 1.5rem",
              border: "1px solid rgba(192,57,43,0.08)", boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
              textAlign: "center", transition: "transform 0.25s, box-shadow 0.25s",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(192,57,43,0.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 14px rgba(0,0,0,0.05)"; }}>
              {/* Badge "Aviat" */}
              <div style={{
                position: "absolute", top: 12, right: 12,
                background: "#FDECEA", color: "#C0392B",
                fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 9,
                padding: "3px 8px", borderRadius: 50, letterSpacing: "0.5px", textTransform: "uppercase",
              }}>
                Aviat
              </div>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: cat.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", color: cat.accent }}>
                {cat.icon}
              </div>
              <h3 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 16, color: "#3D0A06", marginBottom: 6 }}>{cat.name}</h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#9a6060", margin: 0, lineHeight: 1.5 }}>{cat.desc}</p>
            </div>
          ))}
        </div>

        {/* Nota inferior */}
        <p style={{ textAlign: "center", fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#9a6060", marginTop: "2.5rem", fontStyle: "italic" }}>
          ¿No trobes el que busques? Truca'ns al <a href={`tel:${PHONE_TEL}`} style={{ color: "#C0392B", fontWeight: 700, textDecoration: "none" }}>{PHONE}</a> i ho mirem junts.
        </p>
      </div>
    </section>
  );
}

// ── TESTIMONIS ──────────────────────────────────────────────────
function Testimonials() {
  const { ref, visible } = useInView();
  const quotes = [
    { text: "L'atenció de l'Anna ha estat fantàstica, es va interessar molt per ajudar-me amb el menjar del meu gat. És un gust que t'assessorin així.", author: "Annita Y.", initial: "A" },
    { text: "Molt bona atenció personalitzada i tenen moltíssims productes de tot el que busquem.", author: "Inma C.", initial: "I" },
    { text: "Qualitat i preu excel·lent, personal molt amable.", author: "Antonio · Local Guide", initial: "An" },
  ];
  return (
    <section id="opinions" style={{ background: "linear-gradient(135deg, #7B0D06 0%, #A93226 50%, #7B0D06 100%)", padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(231,76,60,0.18) 0%, transparent 60%)" }} />
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#F1948A", letterSpacing: "2px", textTransform: "uppercase" }}>Opinions reals</span>
          <h2 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "white", marginTop: 8, marginBottom: 8 }}>
            Què diuen els nostres Faunàtics.
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 12 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f5c842" color="#f5c842" />)}
            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 14, color: "rgba(255,255,255,0.7)", marginLeft: 8 }}>4,7 / 5 a Google</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {quotes.map((q, i) => (
            <figure key={q.author} className={visible ? "fade-up" : ""} style={{
              animationDelay: `${i * 0.12}s`, opacity: visible ? undefined : 0,
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)", borderRadius: 20,
              padding: "1.75rem", margin: 0,
            }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f5c842" color="#f5c842" />)}
              </div>
              <blockquote style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 1.7, margin: "0 0 1.25rem", fontStyle: "italic" }}>
                "{q.text}"
              </blockquote>
              <figcaption style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #C0392B, #F1948A)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 14, color: "white", flexShrink: 0 }}>
                  {q.initial}
                </div>
                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.9)" }}>{q.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 32px",
            background: "#25d366", color: "white", borderRadius: 50,
            textDecoration: "none", fontFamily: "'Nunito', sans-serif",
            fontWeight: 700, fontSize: 16, boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
          }}>
            <MessageCircle size={18} /> Tens dubtes? Escriu-nos per WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ── UBICACIÓ ────────────────────────────────────────────────────
function Location() {
  const { ref, visible } = useInView();
  const hours = [
    ["Dilluns", "10:00 – 19:00"], ["Dimarts", "10:00 – 19:00"],
    ["Dimecres", "10:00 – 19:00"], ["Dijous", "10:00 – 19:00"],
    ["Divendres", "10:00 – 19:00"], ["Dissabte", "9:00 – 14:00"],
    ["Diumenge", "Tancat"],
  ];
  return (
    <section id="ubicacio" style={{ background: "#FBF0EE", padding: "6rem 1.5rem" }}>
      <div ref={ref} style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 700, color: "#C0392B", letterSpacing: "2px", textTransform: "uppercase" }}>Vine a veure'ns</span>
          <h2 style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#3D0A06", marginTop: 8, letterSpacing: "-0.3px" }}>
            T'esperem a Reus.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, alignItems: "start" }}>
          <div className={visible ? "fade-up" : ""} style={{ opacity: visible ? undefined : 0, animationDelay: "0.1s" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
              {[
                { icon: <Phone size={20} />, label: "Telèfon", value: PHONE, href: `tel:${PHONE_TEL}`, color: "#C0392B" },
                { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "Escriu-nos directament", href: WHATSAPP_URL, color: "#25d366" },
                { icon: <Instagram size={20} />, label: "Instagram", value: "@faunatics_", href: INSTAGRAM, color: "#b5367a" },
                { icon: <MapPin size={20} />, label: "Adreça", value: "Carrer d'Ignasi Iglésias, 145 · 43206 Reus", href: MAPS_URL, color: "#3a5bb8" },
              ].map(item => (
                <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                  background: "white", borderRadius: 16, border: "1px solid rgba(192,57,43,0.08)",
                  textDecoration: "none", transition: "border-color 0.2s, transform 0.2s",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = item.color; el.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(192,57,43,0.08)"; el.style.transform = "translateX(0)"; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 11, fontWeight: 700, color: "#9a6060", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>{item.label}</p>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: 15, fontWeight: 700, color: "#3D0A06", margin: "2px 0 0" }}>{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            <div style={{ background: "white", borderRadius: 16, padding: "20px 22px", border: "1px solid rgba(192,57,43,0.08)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Clock size={18} color="#C0392B" />
                <span style={{ fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 15, color: "#3D0A06" }}>Horari</span>
                <span style={{ marginLeft: "auto", background: "#FDECEA", color: "#C0392B", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, padding: "3px 10px", borderRadius: 50 }}>OBERT DLL–DIS</span>
              </div>
              <dl style={{ display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 6 }}>
                {hours.map(([day, time]) => (
                  <div key={day} style={{ display: "contents" }}>
                    <dt style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#9a6060", fontWeight: 600 }}>{day}</dt>
                    <dd style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: time === "Tancat" ? "#C0392B" : "#3D0A06", fontWeight: 700, textAlign: "right", margin: 0 }}>{time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className={visible ? "fade-up" : ""} style={{ opacity: visible ? undefined : 0, animationDelay: "0.25s", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(192,57,43,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", position: "relative", minHeight: 420 }}>
            <iframe
              title="Mapa de Faunàtics Reus"
              src="https://www.google.com/maps?q=Faun%C3%A0tics+Reus,+Carrer+d'Ignasi+Igl%C3%A9sias+145,+43206+Reus&output=embed"
              style={{ width: "100%", height: "100%", minHeight: 420, border: "none", display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a href={MAPS_URL} target="_blank" rel="noreferrer" style={{
              position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              background: "linear-gradient(135deg, #C0392B, #E74C3C)", color: "white",
              borderRadius: 50, textDecoration: "none", fontFamily: "'Nunito', sans-serif",
              fontWeight: 700, fontSize: 14, boxShadow: "0 4px 16px rgba(192,57,43,0.5)", whiteSpace: "nowrap",
            }}>
              <MapPin size={16} /> Obrir a Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#3D0A06", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <FaunaticsLogo size={28} scrolled={false} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 50, padding: "8px 16px", textDecoration: "none", fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 13, color: "#5dde8a" }}>
            <MessageCircle size={14} /> WhatsApp
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 50, padding: "8px 16px", textDecoration: "none", fontFamily: "'Nunito', sans-serif", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
            <Instagram size={14} /> @faunatics_
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ background: "rgba(241,148,138,0.15)", border: "1px solid rgba(241,148,138,0.25)", borderRadius: 50, padding: "5px 14px", fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, color: "#F1948A", display: "flex", alignItems: "center", gap: 5 }}>
            <Heart size={11} fill="#F1948A" /> Orgullosament a Reus
          </span>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Faunàtics Reus
          </span>
        </div>
      </div>
    </footer>
  );
}

// ── INDEX ───────────────────────────────────────────────────────
function Index() {
  useFavicon();
  return (
    <div style={{ minHeight: "100vh", background: "#FFF8F7" }}>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Values />
        <Products />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
