import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { MailIcon, PhoneIcon, MapPinIcon, GithubIcon, LinkedinIcon, SendIcon, CheckIcon, AlertCircleIcon } from "@/components/ui/BrandIcons";

type Status = "idle" | "sending" | "sent" | "error";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const isEmailJsConfigured = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

const contactInfo = [
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copyable: true },
  { icon: PhoneIcon, label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, copyable: true },
  { icon: MapPinIcon, label: "Location", value: profile.location, href: undefined, copyable: false },
  { icon: GithubIcon, label: "GitHub", value: "github.com/Hhari1234", href: profile.github, copyable: true },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/hariraj-k-63735b261", href: profile.linkedin, copyable: true },
];

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-muted mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-text placeholder:text-subtle outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500 bg-red-500/5"
            : "border-line focus:border-gold bg-surface-2"
        }`}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function TextareaField({
  label,
  id,
  value,
  onChange,
  required,
  placeholder,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-xs text-muted mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        required={required}
        rows={5}
        value={value}
        onChange={onChange}
        className={`w-full resize-none rounded-lg border px-4 py-3 text-sm text-text placeholder:text-subtle outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500 bg-red-500/5"
            : "border-line focus:border-gold bg-surface-2"
        }`}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable - silently ignore */
    }
    setCopied(label);
    window.setTimeout(() => setCopied((c) => (c === label ? null : c)), 1800);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    if (!message.trim()) newErrors.message = "Message is required";
    else if (message.trim().length < 10) newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    if (!isEmailJsConfigured) {
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
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container relative">
        <SectionHeader
          index="07"
          eyebrow="Contact"
          title="Let's build something meaningful."
          description="Open to Software Engineer roles (Backend / AI). Reach out via email, LinkedIn, or the form below."
          align="center"
        />

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 max-w-5xl mx-auto">
          <Reveal>
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const copyable = item.copyable;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 card p-4 card-gold min-w-0"
                  >
                    <div className="card-icon shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="card-text">
                      <div className="font-mono text-xs uppercase tracking-wider text-muted">
                        {item.label}
                      </div>
                      <div className="text-text text-sm mt-0.5 break-words">{item.value}</div>
                    </div>
                    {copyable ? (
                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-subtle hover:text-gold transition-colors px-2 py-1"
                        aria-label={`Copy ${item.label}`}
                      >
                        {copied === item.label ? "Copied" : "Copy"}
                      </button>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                        className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-subtle hover:text-gold transition-colors px-2 py-1"
                      >
                        Open
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <form onSubmit={handleSubmit} className="card p-6 md:p-8" noValidate>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <InputField
                  label="Name"
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: "" }); }}
                  placeholder="Your name"
                  error={errors.name}
                />
                <InputField
                  label="Email"
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                  placeholder="you@example.com"
                  error={errors.email}
                />
              </div>
              <TextareaField
                label="Message"
                id="message"
                required
                value={message}
                onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors({ ...errors, message: "" }); }}
                placeholder="What are you looking to build?"
                error={errors.message}
              />

              <div className="mt-6 flex items-center gap-4 flex-wrap">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <SendIcon width={16} height={16} />
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>

                {status === "sent" && (
                  <span className="flex items-center gap-1.5 font-mono text-sm text-teal">
                    <CheckIcon width={16} height={16} />
                    {isEmailJsConfigured ? "Message sent successfully." : "Opening your email client..."}
                  </span>
                )}
                {status === "error" && (
                  <span className="flex items-center gap-1.5 font-mono text-sm text-red-500">
                    <AlertCircleIcon width={16} height={16} />
                    Something went wrong — email me directly instead.
                  </span>
                )}
              </div>

              {!isEmailJsConfigured && (
                <p className="mt-4 text-xs text-subtle font-mono leading-relaxed">
                  Submitting opens your email client addressed to {profile.email}. To send
                  messages directly from this form, configure EmailJS env vars — see .env.example.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}