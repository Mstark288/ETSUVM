// pages/Apply.tsx
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft,  
  FiCheckCircle, 
  FiLoader,
  FiSend
} from 'react-icons/fi';

interface ApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  program: string;
  education: string;
  church: string;
  pastorName: string;
  pastorEmail: string;
  statement: string;
  agreeTerms: boolean;
}

export default function Apply() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ApplicationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    program: '',
    education: '',
    church: '',
    pastorName: '',
    pastorEmail: '',
    statement: '',
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ApplicationForm>>({});

  const programs = [
    'Diploma in Theology',
    'Bachelor of Theology (Coming Soon)',
    'Master of Divinity (Coming Soon)'
  ];

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Partial<ApplicationForm> = {};
    
    if (stepNum === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name required';
      if (!formData.lastName) newErrors.lastName = 'Last name required';
      if (!formData.email) newErrors.email = 'Email required';
      if (!formData.phone) newErrors.phone = 'Phone required';
      if (!formData.address) newErrors.address = 'Address required';
    } else if (stepNum === 2) {
      if (!formData.program) newErrors.program = 'Select a program';
      if (!formData.education) newErrors.education = 'Education background required';
      if (!formData.church) newErrors.church = 'Church name required';
    } else if (stepNum === 3) {
      if (!formData.pastorName) newErrors.pastorName = 'Pastor name required';
      if (!formData.pastorEmail) newErrors.pastorEmail = 'Pastor email required';
      if (!formData.statement) newErrors.statement = 'Personal statement required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;
    if (!formData.agreeTerms) {
      setErrors({ ...errors, agreeTerms: true });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
  };

  const handleInputChange = (field: keyof ApplicationForm, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (submitSuccess) {
    return (
      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-ets-navy mb-4">
              Application Submitted!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for applying to ETS. We have received your application and will contact you within 3-5 business days.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-8 py-3 bg-ets-navy text-white font-medium rounded-full hover:bg-ets-navy/90 transition-colors"
            >
              Return Home
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply Now | ETS</title>
        <meta name="description" content="Submit your application to Evangelical Theological Seminary." />
      </Helmet>

      <section className="pt-24 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            to="/admissions"
            className="inline-flex items-center text-gray-600 hover:text-ets-navy transition-colors mb-8"
          >
            <FiArrowLeft className="mr-2 w-4 h-4" />
            Back to Admissions
          </Link>

          <h1 className="font-serif text-4xl font-bold text-ets-navy mb-4">
            Application Form
          </h1>
          <p className="text-gray-600 mb-8">
            Complete all sections to submit your application for admission.
          </p>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= num ? 'bg-ets-navy text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > num ? <FiCheckCircle className="w-5 h-5" /> : num}
                  </div>
                  {num < 3 && (
                    <div className={`w-20 sm:w-32 h-1 ${
                      step > num ? 'bg-ets-navy' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Personal Info</span>
              <span>Academic</span>
              <span>References</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-serif text-xl font-semibold text-ets-navy mb-6">Personal Information</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-ets-navy mb-1">Address *</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.address && <p className="text-xs text-red-600 mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-serif text-xl font-semibold text-ets-navy mb-6">Academic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Program *</label>
                      <select
                        value={formData.program}
                        onChange={(e) => handleInputChange('program', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      >
                        <option value="">Select Program</option>
                        {programs.map((program) => (
                          <option key={program} value={program}>{program}</option>
                        ))}
                      </select>
                      {errors.program && <p className="text-xs text-red-600 mt-1">{errors.program}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Education Background *</label>
                      <textarea
                        value={formData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.education && <p className="text-xs text-red-600 mt-1">{errors.education}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Church *</label>
                      <input
                        type="text"
                        value={formData.church}
                        onChange={(e) => handleInputChange('church', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.church && <p className="text-xs text-red-600 mt-1">{errors.church}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="font-serif text-xl font-semibold text-ets-navy mb-6">References & Statement</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Pastor's Name *</label>
                      <input
                        type="text"
                        value={formData.pastorName}
                        onChange={(e) => handleInputChange('pastorName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.pastorName && <p className="text-xs text-red-600 mt-1">{errors.pastorName}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Pastor's Email *</label>
                      <input
                        type="email"
                        value={formData.pastorEmail}
                        onChange={(e) => handleInputChange('pastorEmail', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.pastorEmail && <p className="text-xs text-red-600 mt-1">{errors.pastorEmail}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-ets-navy mb-1">Personal Statement *</label>
                      <textarea
                        value={formData.statement}
                        onChange={(e) => handleInputChange('statement', e.target.value)}
                        rows={5}
                        placeholder="Share your testimony and why you feel called to ministry..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ets-gold"
                      />
                      {errors.statement && <p className="text-xs text-red-600 mt-1">{errors.statement}</p>}
                    </div>
                    <div>
                      <label className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                          className="mt-1"
                        />
                        <span className="text-sm text-gray-600">
                          I confirm that all information provided is accurate and complete.
                        </span>
                      </label>
                      {errors.agreeTerms && <p className="text-xs text-red-600 mt-1">Please agree to the terms</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-2 border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="px-8 py-2 bg-ets-navy text-white rounded-full hover:bg-ets-navy/90 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center px-8 py-2 bg-ets-gold text-ets-navy font-medium rounded-full hover:bg-ets-gold/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}