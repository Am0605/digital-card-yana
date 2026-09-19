"use client";

import { useActionState, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitRsvp } from "@/app/actions/rsvp";
import { FadeIn } from "@/components/invitation/FadeIn";
import {
  Ornament,
  SectionEyebrow,
  SectionTitle,
} from "@/components/invitation/SectionHeader";
import {
  attendanceOptions,
  initialRsvpState,
  mealOptions,
  type Attendance,
  type RsvpFieldErrors,
} from "@/lib/rsvp";
import { wedding } from "@/lib/wedding";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRsvp(
  formData: FormData,
  attendance: Attendance | "",
): RsvpFieldErrors {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mealPreference = String(formData.get("mealPreference") ?? "").trim();
  const errors: RsvpFieldErrors = {};

  if (fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (attendance !== "attending" && attendance !== "declining") {
    errors.attendance = "Please let us know if you can celebrate with us.";
  }

  if (attendance === "attending" && !mealPreference) {
    errors.mealPreference = "Please choose a meal preference.";
  }

  return errors;
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="mt-1.5 text-xs text-blush-deep"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

function SuccessState({ attending }: { attending: boolean }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[1.75rem] border border-gold/20 bg-white/65 px-6 py-14 text-center shadow-[0_20px_50px_rgba(63,52,44,0.08)]"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-stone">
        <motion.svg
          viewBox="0 0 52 52"
          className="h-12 w-12 text-gold-deep"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="20"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d="M16.5 27.2 23 33.4 36 19.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.45, delay: 0.35, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
      <h3 className="mt-6 font-serif text-3xl text-ink">With all our thanks</h3>
      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-7 text-ink-soft">
        {attending
          ? "Your reply is with us. We cannot wait to celebrate this day with you."
          : "Your reply is with us. You will be missed, and you remain in our hearts."}
      </p>
    </motion.div>
  );
}

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, initialRsvpState);
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [fieldErrors, setFieldErrors] = useState<RsvpFieldErrors>({});
  const [lastAttendance, setLastAttendance] = useState<Attendance | "">("");

  const errors = { ...state.fieldErrors, ...fieldErrors };
  const isAttending = attendance === "attending";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateRsvp(formData, attendance);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setLastAttendance(attendance);
  }

  return (
    <section id="rsvp" className="px-6 py-20 sm:py-24">
      <FadeIn>
        <SectionEyebrow>Kindly reply</SectionEyebrow>
        <SectionTitle>RSVP</SectionTitle>
        <div className="mt-6">
          <Ornament />
        </div>
        <p className="mx-auto mt-8 max-w-md text-center font-serif text-lg italic text-ink-soft">
          Please respond by {wedding.rsvpDeadline}
        </p>
      </FadeIn>

      <FadeIn delay={0.1} className="mx-auto mt-12 max-w-lg">
        <AnimatePresence mode="wait">
          {state.status === "success" ? (
            <SuccessState attending={lastAttendance === "attending"} />
          ) : (
            <motion.form
              key="form"
              action={formAction}
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5 rounded-[1.75rem] border border-gold/20 bg-white/55 p-6 shadow-[0_20px_50px_rgba(63,52,44,0.08)] backdrop-blur-sm sm:p-8"
            >
              <label className="block">
                <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Full Name
                </span>
                <input
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-2xl border border-gold/25 bg-white/80 px-4 py-3.5 font-sans text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
                <FieldError message={errors.fullName} />
              </label>

              {/* <label className="block">
                <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-2xl border border-gold/25 bg-white/80 px-4 py-3.5 font-sans text-sm text-ink outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
                <FieldError message={errors.email} />
              </label> */}

              <fieldset>
                <legend className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Attendance
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {attendanceOptions.map((option) => {
                    const selected = attendance === option.value;

                    return (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className={`cursor-pointer rounded-2xl border px-4 py-4 text-center text-sm transition ${
                          selected
                            ? "border-gold bg-champagne/35 text-ink shadow-[0_8px_24px_rgba(184,149,108,0.16)]"
                            : "border-gold/20 bg-white/70 text-ink-soft hover:border-gold/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={option.value}
                          checked={selected}
                          onChange={() => {
                            setAttendance(option.value);
                            setFieldErrors((current) => ({
                              ...current,
                              attendance: undefined,
                            }));
                          }}
                          className="sr-only"
                          required
                        />
                        {option.label}
                      </motion.label>
                    );
                  })}
                </div>
                <FieldError message={errors.attendance} />
              </fieldset>

              {/* <fieldset>
                <legend className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Meal Preference
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {mealOptions.map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="mealPreference"
                        value={option.value}
                        required={isAttending}
                        className="peer sr-only"
                      />
                      <span className="flex items-center justify-center rounded-2xl border border-gold/20 bg-white/70 px-2 py-3 text-center text-xs text-ink-soft transition peer-checked:border-gold peer-checked:bg-champagne/35 peer-checked:text-ink peer-checked:shadow-[0_8px_24px_rgba(184,149,108,0.16)] hover:border-gold/40">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                <FieldError message={errors.mealPreference} />
              </fieldset> */}

              <AnimatePresence initial={false}>
                {isAttending ? (
                  <motion.div
                    key="plus-one"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <label className="block pt-1">
                      <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                        Pax
                      </span>
                      <input
                        name="plusOneName"
                        type="text"
                        placeholder="Optional"
                        className="w-full rounded-2xl border border-gold/25 bg-white/80 px-4 py-3.5 font-sans text-sm text-ink outline-none transition placeholder:text-ink-soft/50 focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                    </label>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* <label className="block">
                <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-soft">
                  Dietary Restrictions
                </span>
                <input
                  name="dietaryRestrictions"
                  type="text"
                  placeholder="Allergies, vegetarian notes, or none"
                  className="w-full rounded-2xl border border-gold/25 bg-white/80 px-4 py-3.5 font-sans text-sm text-ink outline-none transition placeholder:text-ink-soft/50 focus:border-gold focus:ring-2 focus:ring-gold/20"
                />
              </label> */}

              {state.status === "error" && state.message ? (
                <p className="rounded-2xl bg-blush/30 px-4 py-3 text-center text-sm text-ink">
                  {state.message}
                </p>
              ) : null}

              <motion.button
                type="submit"
                disabled={pending}
                whileHover={pending ? undefined : { scale: 1.02 }}
                whileTap={pending ? undefined : { scale: 0.98 }}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-ink px-6 py-4 text-xs font-medium uppercase tracking-[0.24em] text-stone shadow-[0_12px_30px_rgba(63,52,44,0.18)] transition-colors hover:bg-gold-deep disabled:cursor-wait disabled:opacity-80"
              >
                {pending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone/30 border-t-stone" />
                    Sending
                  </>
                ) : (
                  "Send RSVP"
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </FadeIn>
    </section>
  );
}
