import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Globe,
  Users,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { SuccessCheckmark } from "./SuccessCheckmark";
import { CountrySelect } from "./CountrySelect";

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  defaultService?: string;
}

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  employees: string;
  services: string[];
  message: string;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  services?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  title = "Talk to an Outsourcing Expert",
  defaultService = "Payroll Outsourcing",
}) => {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "Nigeria",
    employees: "50-249 employees",
    services: [defaultService],
    message: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  if (!isOpen) return null;

  const validateField = (
    name: keyof FormState,
    value: any,
  ): string | undefined => {
    switch (name) {
      case "name":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Full name is required.";
        }
        if (value.trim().length < 2) {
          return "Full name must be at least 2 characters.";
        }
        return undefined;

      case "company":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Company or organization name is required.";
        }
        if (value.trim().length < 2) {
          return "Company name must be at least 2 characters.";
        }
        return undefined;

      case "email":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Work email is required.";
        }
        const cleanEmail = value.trim();
        if (!EMAIL_REGEX.test(cleanEmail)) {
          return "Please enter a valid work email address (e.g., name@company.com).";
        }
        return undefined;

      case "phone":
        if (!value || typeof value !== "string" || !value.trim()) {
          return "Phone number is required.";
        }
        const digitsOnly = value.replace(/\D/g, "");
        if (digitsOnly.length < 7) {
          return "Please enter a valid phone number (at least 7 digits).";
        }
        return undefined;

      case "services":
        if (!Array.isArray(value) || value.length === 0) {
          return "Please select at least one outsourcing service.";
        }
        return undefined;

      default:
        return undefined;
    }
  };

  const validateAll = (data: FormState): FormErrors => {
    const newErrors: FormErrors = {};
    const nameErr = validateField("name", data.name);
    if (nameErr) newErrors.name = nameErr;

    const compErr = validateField("company", data.company);
    if (compErr) newErrors.company = compErr;

    const emailErr = validateField("email", data.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField("phone", data.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const servErr = validateField("services", data.services);
    if (servErr) newErrors.services = servErr;

    return newErrors;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (field: keyof FormState, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // If field was already touched or user already tried submitting, validate in real-time
    if (touched[field] || submitAttempted) {
      const errorMsg = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    }
  };

  const handleServiceToggle = (service: string) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];

    handleChange("services", updatedServices);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    // Mark all required fields as touched
    setTouched({
      name: true,
      company: true,
      email: true,
      phone: true,
      services: true,
    });

    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus on first invalid field if possible
      const firstErrorField = Object.keys(validationErrors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      if (el) {
        el.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setRefId(
        data.referenceId || `NSHR-${Date.now().toString(36).toUpperCase()}`,
      );
    } catch {
      setRefId(`NSHR-${Date.now().toString(36).toUpperCase()}`);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const availableServices = [
    "Payroll Outsourcing",
    "HR Administration",
    "Managed HR Services",
    "Recruitment & Talent",
    "Time & Attendance",
    "Leave Management",
    "Compliance & Audit",
    "Multi-Country African Payroll",
    "Complaint & Audit",
    "Employee Administration",
    "Performance & Appraisal",
    "Multi-Branch Payroll",
    "Multi-Country Payroll",
    "Multi-Currency Payroll",
  ];

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon - Centered */}
        <div className="bg-[#0A1E4A] text-white p-6 sm:p-7 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-lg mx-auto flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-lime-400 tracking-wider uppercase mb-1.5 px-3 py-1 rounded-full bg-lime-400/10 border border-lime-400/20">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              NextSofthr Advisory &amp; Outsourcing
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight text-center">
              {title}
            </h2>
            <p className="text-sm text-slate-300 mt-1.5 text-center max-w-md mx-auto">
              Connect with our certified HR and payroll specialists to scope your workforce requirements.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <SuccessCheckmark size={60} triggerConfetti={true} />

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  Thank you. Our outsourcing team will review your requirements
                  and contact you.
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  A senior NextSofthr HR & Payroll Consultant has been assigned
                  to your inquiry and will reach out within 2 business hours.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-600 space-y-1.5 font-mono">
                <div>
                  <span className="font-semibold text-slate-900">
                    Reference:
                  </span>{" "}
                  {refId}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Company:</span>{" "}
                  {formData.company || "Confidential"}
                </div>
                <div>
                  <span className="font-semibold text-slate-900">
                    Services:
                  </span>{" "}
                  {formData.services.join(", ")}
                </div>
              </div>

              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
              >
                Close & Return to Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Top Warning Banner if user submitted with invalid fields */}
              {submitAttempted && hasErrors && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-xs text-rose-800 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-medium">
                    Please review and correct the highlighted fields before
                    submitting your inquiry.
                  </span>
                </div>
              )}

              {/* Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="field-name"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Full Name *
                    </label>
                    {touched.name && !errors.name && formData.name.trim() && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    id="field-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="e.g. Olumide Adeleke"
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={errors.name ? "error-name" : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 ${
                      touched.name && errors.name
                        ? "border-rose-300 bg-rose-50/40 text-rose-950 focus:ring-rose-500 focus:border-rose-500"
                        : "border-slate-300 focus:ring-blue-600 focus:border-transparent"
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p
                      id="error-name"
                      className="mt-1 text-xs text-rose-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="field-company"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Company Name *
                    </label>
                    {touched.company &&
                      !errors.company &&
                      formData.company.trim() && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                  </div>
                  <div className="relative">
                    <input
                      id="field-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      onBlur={() => handleBlur("company")}
                      placeholder="e.g. Apex Holdings Ltd"
                      aria-invalid={!!(touched.company && errors.company)}
                      aria-describedby={
                        errors.company ? "error-company" : undefined
                      }
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm pl-9 transition-all focus:outline-none focus:ring-2 ${
                        touched.company && errors.company
                          ? "border-rose-300 bg-rose-50/40 text-rose-950 focus:ring-rose-500 focus:border-rose-500"
                          : "border-slate-300 focus:ring-blue-600 focus:border-transparent"
                      }`}
                    />
                    <Building2
                      className={`w-4 h-4 absolute left-3 top-3 ${
                        touched.company && errors.company
                          ? "text-rose-400"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  {touched.company && errors.company && (
                    <p
                      id="error-company"
                      className="mt-1 text-xs text-rose-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.company}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Work Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="field-email"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Work Email *
                    </label>
                    {touched.email &&
                      !errors.email &&
                      formData.email.trim() && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                  </div>
                  <div className="relative">
                    <input
                      id="field-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      placeholder="olumide@company.com"
                      aria-invalid={!!(touched.email && errors.email)}
                      aria-describedby={
                        errors.email ? "error-email" : undefined
                      }
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm pl-9 transition-all focus:outline-none focus:ring-2 ${
                        touched.email && errors.email
                          ? "border-rose-300 bg-rose-50/40 text-rose-950 focus:ring-rose-500 focus:border-rose-500"
                          : "border-slate-300 focus:ring-blue-600 focus:border-transparent"
                      }`}
                    />
                    <Mail
                      className={`w-4 h-4 absolute left-3 top-3 ${
                        touched.email && errors.email
                          ? "text-rose-400"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p
                      id="error-email"
                      className="mt-1 text-xs text-rose-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="field-phone"
                      className="block text-xs font-semibold text-slate-700 uppercase tracking-wider"
                    >
                      Phone Number *
                    </label>
                    {touched.phone &&
                      !errors.phone &&
                      formData.phone.trim() && (
                        <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Valid
                        </span>
                      )}
                  </div>
                  <div className="relative">
                    <input
                      id="field-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      placeholder="+234 802 345 6789"
                      aria-invalid={!!(touched.phone && errors.phone)}
                      aria-describedby={
                        errors.phone ? "error-phone" : undefined
                      }
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm pl-9 transition-all focus:outline-none focus:ring-2 ${
                        touched.phone && errors.phone
                          ? "border-rose-300 bg-rose-50/40 text-rose-950 focus:ring-rose-500 focus:border-rose-500"
                          : "border-slate-300 focus:ring-blue-600 focus:border-transparent"
                      }`}
                    />
                    <Phone
                      className={`w-4 h-4 absolute left-3 top-3 ${
                        touched.phone && errors.phone
                          ? "text-rose-400"
                          : "text-slate-400"
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p
                      id="error-phone"
                      className="mt-1 text-xs text-rose-600 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Country & Workforce Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="field-country"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Primary Country *
                  </label>
                  <CountrySelect
                    id="field-country"
                    value={formData.country}
                    onChange={(val) => handleChange("country", val)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="field-employees"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Workforce Size *
                  </label>
                  <div className="relative">
                    <select
                      id="field-employees"
                      value={formData.employees}
                      onChange={(e) =>
                        handleChange("employees", e.target.value)
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm pl-9"
                    >
                      <option value="1-19 employees">1 - 19 employees</option>
                      <option value="20-49 employees">20 - 49 employees</option>
                      <option value="50-249 employees">
                        50 - 249 employees
                      </option>
                      <option value="250-999 employees">
                        250 - 999 employees
                      </option>
                      <option value="1000+ enterprise">
                        1,000+ Enterprise
                      </option>
                    </select>
                    <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Services Required Checkbox Buttons */}
              <div id="field-services">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Services Required *
                  </label>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Select all that apply
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableServices.map((service) => {
                    const isSelected = formData.services.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => handleServiceToggle(service)}
                        className={`text-left text-xs p-2.5 rounded-lg border transition-all ${
                          isSelected
                            ? "bg-blue-50 border-blue-600 text-blue-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{service}</span>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {touched.services && errors.services && (
                  <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.services}</span>
                  </p>
                )}
              </div>

              {/* Optional Message */}
              <div>
                <label
                  htmlFor="field-message"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  Specific Requirements / Current Challenges (Optional)
                </label>
                <textarea
                  id="field-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Tell us about your current payroll cycle, entities, software migration needs, or compliance deadlines..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  NDPR & GDPR compliant. Confidential NDA honored by NextSofthr.
                </span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#0F2D6B] hover:bg-[#0A1E4A] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Direct Instant Channels: Direct Call & WhatsApp */}
              <div className="pt-4 mt-1 border-t border-slate-200/80 space-y-2.5">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <span className="relative bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Prefer direct conversation?
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Direct Call Button */}
                  <a
                    href="tel:+2349158482622"
                    id="btn-direct-call"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 hover:border-blue-300 text-blue-950 transition-all group shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0">
                        <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5 truncate">
                          <span>Direct Call</span>
                        </div>
                        <div className="text-[11px] font-semibold text-blue-700 truncate">
                          +234 915 848 2622
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* WhatsApp Direct Message Button */}
                  <a
                    href="https://wa.me/2349158482622?text=Hello%20NextSoftHR%20Outsourcing%20Team%2C%20I%20would%20like%20to%20talk%20to%20an%20outsourcing%20expert."
                    target="_blank"
                    rel="noopener noreferrer"
                    id="btn-whatsapp-direct"
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 hover:border-emerald-300 text-emerald-950 transition-all group shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <WhatsAppIcon className="w-4 h-4" />
                      </div>
                      <div className="text-left min-w-0">
                        <div className="text-xs font-bold text-emerald-950 truncate">
                          WhatsApp Direct Message
                        </div>
                        <div className="text-[11px] font-medium text-emerald-700 truncate">
                          +234 915 848 2622
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wide bg-emerald-200/90 text-emerald-900 px-2 py-0.5 rounded-md ml-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      Chat Instantly
                    </span>
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
