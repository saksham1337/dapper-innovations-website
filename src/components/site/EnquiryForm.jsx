import { useRef, useState } from "react";
import axios from "axios";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICE_NAMES } from "@/data/services";
import { MODELS } from "@/data/site";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;
const COUNTRIES = ["Canada", "United States", "Other"];
const VOLUMES = ["1-2 projects or clients", "3-5 projects or clients", "6-10 projects or clients", "More than 10", "Not sure yet"];
const EMPTY = { name: "", agency: "", website: "", email: "", country: "", services: [], models: [], volume: "", message: "", nda: false, company_url: "" };

const validate = (v, full) => {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your name.";
  if (v.agency.trim().length < 2) e.agency = "Enter your agency name.";
  if (!/^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#].*)?$/i.test(v.website.trim())) e.website = "Enter a valid website, e.g. youragency.com.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = "Enter a valid email address.";
  if (!v.country) e.country = "Choose a country.";
  if (!v.services.length) e.services = "Choose at least one service.";
  if (!v.volume) e.volume = "Choose an approximate volume.";
  if (full && v.message.length > 4000) e.message = "Keep the message under 4,000 characters.";
  return e;
};

const Field = ({ id, label, error, group = false, children }) => {
  const Wrapper = group ? "fieldset" : "div";
  return (
    <Wrapper className="space-y-2" aria-describedby={group && error ? `${id}-error` : undefined} aria-invalid={group ? !!error : undefined}>
      {group ? <legend className="text-sm font-medium text-[#111111] mb-2">{label}</legend> : <Label htmlFor={id} className="text-sm font-medium text-[#111111]">{label}</Label>}
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-[#b81818]" data-testid={`error-${id}`}>{error}</p>}
    </Wrapper>
  );
};

const CheckGroup = ({ name, options, values, onToggle, testPrefix }) => (
  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
    {options.map((o, i) => (
      <label key={o} className={`enquiry-choice ${values.includes(o) ? "is-selected" : ""}`} data-testid={`${testPrefix}-label-${i}`}>
        <Checkbox checked={values.includes(o)} onCheckedChange={() => onToggle(name, o)} data-testid={`${testPrefix}-${i}`} />
        {o}
      </label>
    ))}
  </div>
);

export const EnquiryForm = ({ type = "partner" }) => {
  const full = type === "partner";
  const p = full ? "partner" : "ratecard";
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle");
  const started = useRef(Date.now());

  const set = (k, val) => {
    setV((s) => ({ ...s, [k]: val }));
    if (errors[k]) {
      const error = validate({ ...v, [k]: val }, full)[k];
      setErrors((current) => {
        const next = { ...current };
        if (error) next[k] = error;
        else delete next[k];
        return next;
      });
    }
  };
  const toggle = (k, o) => set(k, v[k].includes(o) ? v[k].filter((x) => x !== o) : [...v[k], o]);
  const fieldA11y = (key) => ({ "aria-invalid": !!errors[key], "aria-describedby": errors[key] ? `${p}-${key}-error` : undefined });

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate(v, full);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      const selector = first === "services" ? `[data-testid="${p}-service-0"]` : `#${p}-${first}`;
      ev.currentTarget.querySelector(selector)?.focus();
      return;
    }
    setState("sending");
    try {
      await axios.post(`${API}/enquiries`, { ...v, form_type: full ? "partner" : "rate_card", elapsed_ms: Date.now() - started.current });
      setState("success");
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="border border-[#c91c1c]/30 bg-[#c91c1c]/5 p-8 lg:p-10" data-testid={`${p}-form-success`}>
        <CheckCircle2 className="text-[#c91c1c]" size={28} />
        <h3 className="mt-4 text-2xl font-semibold text-[#111111]">Thanks. We have your details.</h3>
        <p className="mt-3 text-[#5b5b5b] leading-relaxed max-w-lg">
          {full ? "We will reply by email to set up a discovery call." : "We will email you the partner rate card."}
          {full && v.nda && " We will send an NDA before asking for any client details."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="enquiry-form space-y-7" data-testid={`${p}-form`}>
      <div className="form-heading" data-testid={`${p}-form-heading`}><span className="eyebrow">Let's work together</span><span className="font-num text-xs">{full ? "PARTNER ENQUIRY" : "RATE CARD REQUEST"}</span></div>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>Company URL<input tabIndex={-1} autoComplete="off" value={v.company_url} onChange={(e) => set("company_url", e.target.value)} data-testid={`${p}-honeypot`} /></label>
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field id={`${p}-name`} label="Your name" error={errors.name}>
          <Input id={`${p}-name`} {...fieldA11y("name")} value={v.name} onChange={(e) => set("name", e.target.value)} data-testid={`${p}-name-input`} />
        </Field>
        <Field id={`${p}-agency`} label="Agency name" error={errors.agency}>
          <Input id={`${p}-agency`} {...fieldA11y("agency")} value={v.agency} onChange={(e) => set("agency", e.target.value)} data-testid={`${p}-agency-input`} />
        </Field>
        <Field id={`${p}-website`} label="Agency website" error={errors.website}>
          <Input id={`${p}-website`} {...fieldA11y("website")} placeholder="youragency.com" value={v.website} onChange={(e) => set("website", e.target.value)} data-testid={`${p}-website-input`} />
        </Field>
        <Field id={`${p}-email`} label="Work email" error={errors.email}>
          <Input id={`${p}-email`} {...fieldA11y("email")} type="email" value={v.email} onChange={(e) => set("email", e.target.value)} data-testid={`${p}-email-input`} />
        </Field>
        <Field id={`${p}-country`} label="Country" error={errors.country}>
          <Select value={v.country} onValueChange={(val) => set("country", val)}>
            <SelectTrigger id={`${p}-country`} {...fieldA11y("country")} data-testid={`${p}-country-select`}><SelectValue placeholder="Choose a country" /></SelectTrigger>
            <SelectContent>{COUNTRIES.map((c) => <SelectItem key={c} value={c} data-testid={`${p}-country-${c.replace(/\s/g, "-").toLowerCase()}`}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field id={`${p}-volume`} label="Approximate monthly volume" error={errors.volume}>
          <Select value={v.volume} onValueChange={(val) => set("volume", val)}>
            <SelectTrigger id={`${p}-volume`} {...fieldA11y("volume")} data-testid={`${p}-volume-select`}><SelectValue placeholder="Choose a range" /></SelectTrigger>
            <SelectContent>{VOLUMES.map((c, i) => <SelectItem key={c} value={c} data-testid={`${p}-volume-${i}`}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
      </div>
      <Field group id={`${p}-services`} label="Services you're interested in" error={errors.services}>
        <CheckGroup name="services" options={SERVICE_NAMES} values={v.services} onToggle={toggle} testPrefix={`${p}-service`} />
      </Field>
      {full && (
        <>
          <Field group id={`${p}-models`} label="Engagement models you're considering (optional)">
            <CheckGroup name="models" options={MODELS.map((m) => m.name)} values={v.models} onToggle={toggle} testPrefix={`${p}-model`} />
          </Field>
          <Field id={`${p}-message`} label="Anything else we should know? (optional)" error={errors.message}>
            <Textarea id={`${p}-message`} {...fieldA11y("message")} rows={5} value={v.message} onChange={(e) => set("message", e.target.value)} data-testid={`${p}-message-input`} />
          </Field>
          <label className="flex items-start gap-3 border border-border bg-[#f5f5f5] p-4 text-sm text-[#111111] cursor-pointer">
            <Checkbox className="mt-0.5" checked={v.nda} onCheckedChange={(c) => set("nda", !!c)} data-testid={`${p}-nda-checkbox`} />
            Please send an NDA before we share client details.
          </label>
        </>
      )}
      {state === "error" && (
        <div className="flex items-center gap-3 border border-[#b81818]/30 bg-[#b81818]/5 p-4 text-sm text-[#b81818]" data-testid={`${p}-form-error`}>
          <AlertCircle size={18} /> Something went wrong sending your details. Please try again, or email contact@dapperinnovations.com.
        </div>
      )}
      <button type="submit" disabled={state === "sending"} data-testid={`${p}-submit-button`}
        className="primary-button form-submit disabled:opacity-60">
        {state === "sending" && <Loader2 size={16} className="animate-spin" />}
        {full ? "Send partner enquiry" : "Request the rate card"}
      </button>
    </form>
  );
};
