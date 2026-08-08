import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const isEmailJsConfigured = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

const contactInfo = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  { icon: GithubIcon, label: "GitHub", value: "github.com/Hhari1234", href: profile.github },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/hariraj-k-63735b261", href: profile.linkedin },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;

    if (!isEmailJsConfigured) {
      // Graceful fallback: open the user's mail client instead of failing silently
      // or throwing a console error.
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    try {
      setStatus("sending");
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_SERVICE_ID as string,
        EMAILJS_TEMPLATE_ID as string,
        { from_name: name, from_email: email, message },
        { publicKey: EMAILJS_PUBLIC_KEY as string }
      );
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-grid opacity-[0.15] [mask-image:radial-gradient(ellipse_55%_55%_at_90%_50%,black,transparent)]" />
      <div className="container-page relative">
        <SectionHeader
          index="08"
          eyebrow="Contact"
          title="Let's build something meaningful."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16">
          <Reveal>
            <ul className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal-2 shrink-0">
                      <Icon width={17} height={17} />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">
                        {item.label}
                      </div>
                      <div className="text-text text-sm mt-0.5 break-words">{item.value}</div>
                    </div>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className="flex items-center gap-4 rounded-xl border border-line bg-surface/40 p-4 transition-colors hover:border-signal-2/50"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-xl border border-line bg-surface/40 p-4">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-line glass p-6 md:p-8"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-1">
                  <label htmlFor="name" className="block font-mono text-xs text-text-dim mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-line bg-void/50 px-4 py-3 text-sm text-text placeholder:text-text-faint outline-none focus:border-signal-2/60"
                    placeholder="Your name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label htmlFor="email" className="block font-mono text-xs text-text-dim mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-line bg-void/50 px-4 py-3 text-sm text-text placeholder:text-text-faint outline-none focus:border-signal-2/60"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block font-mono text-xs text-text-dim mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-none rounded-lg border border-line bg-void/50 px-4 py-3 text-sm text-text placeholder:text-text-faint outline-none focus:border-signal-2/60"
                    placeholder="What are you looking to build?"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 rounded-lg bg-signal px-5 py-3 font-mono text-sm font-medium text-void transition-all hover:bg-signal-2 disabled:opacity-60"
                >
                  <Send size={15} />
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>

                {status === "sent" && (
                  <span className="flex items-center gap-1.5 text-signal-2 text-sm font-mono">
                    <CheckCircle2 size={15} />
                    {isEmailJsConfigured ? "Message sent." : "Opening your email client..."}
                  </span>
                )}
                {status === "error" && (
                  <span className="flex items-center gap-1.5 text-warn text-sm font-mono">
                    <AlertCircle size={15} />
                    Something went wrong — email me directly instead.
                  </span>
                )}
              </div>

              {!isEmailJsConfigured && (
                <p className="mt-4 text-xs text-text-faint font-mono leading-relaxed">
                  Submitting opens your email client addressed to {profile.email}. To send
                  messages directly from this form, configure EmailJS env vars — see
                  .env.example.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
