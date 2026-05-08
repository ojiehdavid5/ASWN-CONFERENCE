import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { supabase } from "../supabase";

/* =========================
   TYPES
========================= */

interface FormData {
  fullName: string;
  matricNumber: string;
  schoolMail: string;
  gender: string;
}

interface FormErrors {
  fullName?: string;
  matricNumber?: string;
  schoolMail?: string;
  gender?: string;
}

/* =========================
   COMPONENT
========================= */

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    matricNumber: '',
    schoolMail: '',
    gender: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  /* =========================
     VALIDATION
  ========================= */

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.matricNumber.trim()) {
      newErrors.matricNumber = 'Matric number is required';
    }

    if (!formData.schoolMail.trim()) {
      newErrors.schoolMail = 'School email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.schoolMail)) {
      newErrors.schoolMail = 'Please enter a valid email';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /* =========================
     HANDLE SUBMIT
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            full_name: formData.fullName,
            matric_number: formData.matricNumber,
            school_mail: formData.schoolMail,
            gender: formData.gender
          }
        ]);

      if (error) {
        console.error(error);
        if (error.code === '23505') {
          alert('This matric number or email is already registered.');
        } else {
          alert(error.message);
        }
        setIsSubmitting(false); // ← prevent button getting stuck
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================
     STYLES
  ========================= */

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl border bg-white/5 text-white placeholder-white/30 focus:outline-none transition-all backdrop-blur-sm';

  const inputOk =
    'border-white/10 focus:border-[#2EE541] focus:bg-white/10 focus:ring-4 focus:ring-[#2EE541]/15';

  const inputErr =
    'border-red-500/50 focus:border-red-500 focus:ring-4 focus:ring-red-500/20';

  const fieldVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 }
  };

  /* =========================
     JSX
  ========================= */

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative bg-[#0A1F14]/70 backdrop-blur-2xl p-6 lg:p-8 rounded-3xl border border-[#2EE541]/15 shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Glow Effects */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#2EE541]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-20 w-60 h-60 bg-[#ED5821]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="inline-block px-3 py-1 bg-[#2EE541]/15 border border-[#2EE541]/30 rounded-full text-[#2EE541] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  Secure Your Spot
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold font-['Oswald'] text-white uppercase tracking-wide">
                  Register Now
                </h2>

                <p className="text-emerald-50/60 text-sm mt-1">
                  Limited seats available.
                </p>
              </motion.div>

              {/* FORM */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.3
                    }
                  }
                }}
              >
                {/* FULL NAME */}
                <motion.div variants={fieldVariants}>
                  <label className="block text-[10px] font-bold text-emerald-50/80 mb-1.5 uppercase tracking-[0.15em]">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`${inputBase} ${errors.fullName ? inputErr : inputOk}`}
                    />
                    {errors.fullName && (
                      <div className="absolute right-3 top-3.5 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-400 font-medium"
                      >
                        {errors.fullName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* MATRIC NUMBER */}
                <motion.div variants={fieldVariants}>
                  <label className="block text-[10px] font-bold text-emerald-50/80 mb-1.5 uppercase tracking-[0.15em]">
                    Matric Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="matricNumber"
                      value={formData.matricNumber}
                      onChange={handleChange}
                      placeholder="19/1234"
                      className={`${inputBase} ${errors.matricNumber ? inputErr : inputOk}`}
                    />
                    {errors.matricNumber && (
                      <div className="absolute right-3 top-3.5 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.matricNumber && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-400 font-medium"
                      >
                        {errors.matricNumber}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* SCHOOL MAIL */}
                <motion.div variants={fieldVariants}>
                  <label className="block text-[10px] font-bold text-emerald-50/80 mb-1.5 uppercase tracking-[0.15em]">
                    School Mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="schoolMail"
                      value={formData.schoolMail}
                      onChange={handleChange}
                      placeholder="jane@student.lmu.edu.ng"
                      className={`${inputBase} ${errors.schoolMail ? inputErr : inputOk}`}
                    />
                    {errors.schoolMail && (
                      <div className="absolute right-3 top-3.5 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.schoolMail && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-400 font-medium"
                      >
                        {errors.schoolMail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* GENDER */}
                <motion.div variants={fieldVariants}>
                  <label className="block text-[10px] font-bold text-emerald-50/80 mb-1.5 uppercase tracking-[0.15em]">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.gender ? inputErr : inputOk} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-white/50 pointer-events-none" />
                  </div>
                  <AnimatePresence>
                    {errors.gender && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-xs text-red-400 font-medium"
                      >
                        {errors.gender}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  variants={fieldVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#ED5821] hover:bg-[#ff6a30] text-white font-bold py-3.5 px-4 rounded-xl focus:ring-4 focus:ring-[#ED5821]/30 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group uppercase tracking-wider text-sm shadow-lg shadow-[#ED5821]/40 relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 1
                    }}
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                  <span className="relative flex items-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Register Now
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS SCREEN */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-6 bg-[#0A1F14]/70 backdrop-blur-2xl rounded-3xl border border-[#2EE541]/20 shadow-2xl shadow-black/50"
          >
            <div className="w-20 h-20 bg-[#2EE541]/15 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#2EE541]/40">
              <CheckCircle2 className="w-10 h-10 text-[#2EE541]" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-3 uppercase">
              You're In!
            </h3>

            <p className="text-emerald-50/70 mb-6">
              Registration confirmed for{' '}
              <span className="text-white font-semibold">
                {formData.fullName}
              </span>
            </p>

            <button
              onClick={() => {
                setFormData({
                  fullName: '',
                  matricNumber: '',
                  schoolMail: '',
                  gender: ''
                });
                setIsSuccess(false);
              }}
              className="text-[#ED5821] font-bold hover:text-[#ff6a30] transition-colors uppercase tracking-wider text-xs"
            >
              Register another student
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}