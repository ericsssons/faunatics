import { createFileRoute } from "@tanstack/react-router";
import {
  PawPrint, Heart, Users, Truck, Phone, Instagram, MapPin, Clock,
  Star, Sparkles, ShoppingBag, Leaf, ArrowRight, Menu, X,
} from "lucide-react";
import { useState } from "react";
import heroStore from "@/assets/hero-store.jpg";
import productFood from "@/assets/product-food.jpg";
import productCare from "@/assets/product-care.jpg";
import productToys from "@/assets/product-toys.jpg";

const PHONE = "654 10 82 09";
const PHONE_TEL = "+34654108209";
const MAPS_URL = "https://www.google.com/maps/place/Faun%C3%A0tics+Reus/@41.1507486,1.0934748,14.5z/data=!4m6!3m5!1s0x12a151cb895593d9:0x93c36c07d61beab8!8m2!3d41.1588712!4d1.0733441!16s%2Fg%2F11c58241nt?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D";
const INSTAGRAM = "https://www.instagram.com/faunatics_/?hl=es";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Faunàtics Reus — Tienda de mascotas con alma en Reus" },
      { name: "description", content: "Tienda de mascotas en Reus: alimentación premium, asesoramiento personalizado y trato cercano. Anna y su equipo te esperan." },
      { property: "og:title", content: "Faunàtics Reus — Tienda de mascotas" },
      { property: "og:description", content: "Asesoramiento personalizado, productos premium y comunidad inclusiva en Reus." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&family=Nunito:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#productos", label: "Productos" },
    { href: "#asesoramiento", label: "Asesoramiento" },
    { href: "#opiniones", label: "Opiniones" },
    { href: "#ubicacion", label: "Ubicación" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2 font-display font-bold text-lg text-primary">
          <span className="w-9 h-9 rounded-full bg-gradient-leaf grid place-items-center text-primary-foreground shadow-soft">
            <PawPrint size={18} />
          </span>
          Faunàtics <span className="text-accent">Reus</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-foreground/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>
        <a
          href={`tel:${PHONE_TEL}`}
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2.5 text-sm font-semibold shadow-soft hover:opacity-95 transition"
        >
          <Phone size={16} /> Llamar ahora
        </a>
        <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 rounded-lg hover:bg-muted" aria-label="Menú">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                 className="py-3 px-2 rounded-lg hover:bg-muted text-foreground/85">{l.label}</a>
            ))}
            <a href={`tel:${PHONE_TEL}`} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 font-semibold">
              <Phone size={16} /> Llamar ahora
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative pt-24 sm:pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center py-12 sm:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-3 py-1.5 text-xs font-semibold">
            <Star size={14} className="fill-accent text-accent" /> 4,7 ★ en Google · Reus
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-foreground">
            Cuidamos de los que <span className="text-primary">más quieres</span> en Reus.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
            Mucho más que una tienda de mascotas: asesoramiento personalizado,
            productos de alta calidad y un trato humano e inclusivo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={MAPS_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3.5 font-semibold shadow-soft hover:opacity-95 transition">
              <MapPin size={18} /> Ver cómo llegar
            </a>
            <a href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-6 py-3.5 font-semibold hover:bg-muted transition">
              <Phone size={18} /> {PHONE}
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Heart size={16} className="text-primary" /> Trato cercano</div>
            <div className="flex items-center gap-2"><Leaf size={16} className="text-primary" /> Productos premium</div>
          </div>
        </div>
        <div className="relative animate-fade-up delay-200">
          <div className="absolute -inset-4 bg-gradient-leaf opacity-20 blur-3xl rounded-full" />
          <img
            src={heroStore}
            alt="Interior cálido de Faunàtics Reus, tienda de mascotas en Reus"
            width={1920} height={1280}
            className="relative rounded-3xl shadow-card object-cover w-full h-[380px] sm:h-[520px]"
          />
          <div className="absolute -bottom-5 -left-5 sm:-left-8 bg-card rounded-2xl shadow-card p-4 flex items-center gap-3 border border-border">
            <div className="w-10 h-10 rounded-full bg-secondary grid place-items-center text-accent">
              <PawPrint size={18} />
            </div>
            <div className="text-sm">
              <p className="font-semibold">+1.000 familias</p>
              <p className="text-muted-foreground text-xs">confían en nosotros</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const items = [
    { icon: Heart, title: "Atención Personalizada", desc: "Asesoramiento experto de Anna y el equipo, especialistas en nutrición como Hydra Care." },
    { icon: Sparkles, title: "Variedad Premium", desc: "Amplia selección de piensos, juguetes y accesorios para perros, gatos y más." },
    { icon: Users, title: "Comunidad Inclusiva", desc: "Negocio liderado por mujeres y orgullosamente LGBTQ+ friendly." },
    { icon: Truck, title: "Servicio Local", desc: "Compra en tienda, recogida en la puerta y entrega a domicilio en Reus." },
  ];
  return (
    <section id="asesoramiento" className="py-20 sm:py-28 bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Nuestros valores</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Una tienda con alma, no solo un comercio.</h2>
          <p className="mt-3 text-muted-foreground">Lo que nos diferencia es la manera en la que cuidamos a cada mascota y a cada familia que entra por la puerta.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <div key={it.title}
              className="group bg-card rounded-2xl p-6 border border-border shadow-card hover:-translate-y-1 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="w-12 h-12 rounded-xl bg-secondary text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                <it.icon size={22} />
              </div>
              <h3 className="mt-4 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  const cards = [
    { img: productFood, title: "Alimentación de Alta Gama", desc: "Piensos seleccionados para cada etapa, raza y necesidad. Nutrición que se nota.", icon: ShoppingBag },
    { img: productCare, title: "Salud y Cuidado · Hydra Care", desc: "Productos especializados para hidratación, piel y bienestar diario.", icon: Leaf },
    { img: productToys, title: "Accesorios y Juguetes", desc: "Diversión, descanso y paseos: todo lo que tu peludo necesita.", icon: PawPrint },
  ];
  return (
    <section id="productos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">Productos destacados</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Calidad seleccionada con mimo.</h2>
          </div>
          <a href={`tel:${PHONE_TEL}`} className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
            Pregúntanos por una marca <ArrowRight size={16} />
          </a>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <article key={c.title}
              className="group bg-card rounded-3xl overflow-hidden border border-border shadow-card hover:-translate-y-1 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={c.title} width={1024} height={1024} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 text-primary">
                  <c.icon size={18} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Destacado</span>
                </div>
                <h3 className="mt-2 text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { text: "La atención de Anna ha sido fantástica, se interesó mucho en ayudarme con la comida de mi gato. Da gusto que te asesoren así.", author: "Annita Y." },
    { text: "Muy buena atención personalizada y tienen muchísimos productos de todo lo que buscamos.", author: "Inma C." },
    { text: "Calidad y precio excelente, personal muy amable.", author: "Antonio · Local Guide" },
  ];
  return (
    <section id="opiniones" className="py-20 sm:py-28 bg-gradient-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Opiniones reales</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Lo que dicen nuestros Faunàtics.</h2>
          <div className="mt-4 inline-flex items-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className="fill-accent" />)}
            <span className="ml-2 text-sm text-muted-foreground font-medium">4,7 / 5 en Google</span>
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <figure key={q.author}
              className="bg-card rounded-2xl p-6 border border-border shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} className="fill-accent" />)}
              </div>
              <blockquote className="mt-4 text-foreground/90 leading-relaxed">"{q.text}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary text-primary grid place-items-center font-bold">
                  {q.author[0]}
                </div>
                <span className="font-semibold text-sm">{q.author}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  const hours = [
    ["Lunes", "10:00 – 19:00"],
    ["Martes", "10:00 – 19:00"],
    ["Miércoles", "10:00 – 19:00"],
    ["Jueves", "10:00 – 19:00"],
    ["Viernes", "10:00 – 19:00"],
    ["Sábado", "9:00 – 14:00"],
    ["Domingo", "Cerrado"],
  ];
  return (
    <section id="ubicacion" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Visítanos</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Te esperamos en Reus.</h2>
          <p className="mt-3 text-muted-foreground">Abierto de lunes a sábado. Ven a conocernos, te atenderemos como mereces.</p>
          <div className="mt-8 space-y-4">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary transition group">
              <div className="w-11 h-11 rounded-xl bg-secondary text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition"><Phone size={20} /></div>
              <div><p className="text-xs text-muted-foreground">Teléfono</p><p className="font-semibold">{PHONE}</p></div>
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary transition group">
              <div className="w-11 h-11 rounded-xl bg-secondary text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition"><Instagram size={20} /></div>
              <div><p className="text-xs text-muted-foreground">Instagram</p><p className="font-semibold">@faunatics_</p></div>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary transition group">
              <div className="w-11 h-11 rounded-xl bg-secondary text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition"><MapPin size={20} /></div>
              <div><p className="text-xs text-muted-foreground">Dirección</p><p className="font-semibold">Carrer d'Ignasi Iglésias, 145 · 43206 Reus</p></div>
            </a>
          </div>
          <div className="mt-6 p-5 rounded-2xl bg-secondary/60 border border-border">
            <div className="flex items-center gap-2 font-semibold"><Clock size={18} className="text-primary" /> Horario</div>
            <dl className="mt-3 grid grid-cols-2 gap-y-1.5 text-sm">
              {hours.map(([d, h]) => (
                <div key={d} className="contents">
                  <dt className="text-muted-foreground">{d}</dt>
                  <dd className="font-medium text-right">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-card border border-border h-full min-h-[400px]">
            <iframe
              title="Mapa de Faunàtics Reus"
              src="https://www.google.com/maps?q=Faun%C3%A0tics+Reus,+Carrer+d'Ignasi+Igl%C3%A9sias+145,+43206+Reus&output=embed"
              className="w-full h-full min-h-[400px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a href={MAPS_URL} target="_blank" rel="noreferrer"
             className="absolute bottom-4 left-4 right-4 sm:right-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 font-semibold shadow-soft hover:opacity-95 transition">
            <MapPin size={18} /> Abrir en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid sm:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-9 h-9 rounded-full bg-gradient-leaf grid place-items-center text-primary-foreground"><PawPrint size={18} /></span>
          Faunàtics Reus
        </div>
        <div className="flex sm:justify-center gap-4">
          <a href={INSTAGRAM} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 rounded-full bg-background/10 hover:bg-background/20 px-4 py-2 transition">
            <Instagram size={18} /> @faunatics_
          </a>
        </div>
        <div className="sm:text-right">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 text-accent px-3 py-1.5 text-xs font-semibold">
            <Heart size={14} /> Orgullosamente en Reus
          </span>
          <p className="mt-3 text-xs text-background/60">© {new Date().getFullYear()} Faunàtics Reus. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Values />
        <Products />
        <Testimonials />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
