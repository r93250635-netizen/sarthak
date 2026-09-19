/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { DemographicProfile } from '../types';
import { translations, Language } from '../translations';

interface Props {
  onSubmit: (profile: DemographicProfile) => void;
  initialData?: Partial<DemographicProfile>;
  lang: Language;
}

export default function DemographicForm({ onSubmit, initialData, lang }: Props) {
  const t = translations[lang];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<DemographicProfile>>(initialData || {
    age: undefined,
    gender: undefined,
    state: undefined,
    caste: undefined,
    annualIncome: undefined,
    isBPL: false,
    occupation: undefined,
    disability: false
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
    'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  const occupations = [
    'Student', 'Farmer', 'Self-employed', 'Private Sector Employee', 'Government Employee', 
    'Unemployed', 'Small Business Owner', 'Homemaker', 'Retired'
  ];

  const validateStep = (s: number) => {
    const newErrors: Record<string, boolean> = {};
    if (s === 1) {
      if (formData.age === undefined) newErrors.age = true;
      if (!formData.gender) newErrors.gender = true;
      if (!formData.state) newErrors.state = true;
    } else if (s === 2) {
      if (!formData.caste) newErrors.caste = true;
      if (formData.annualIncome === undefined) newErrors.annualIncome = true;
    } else if (s === 3) {
      if (!formData.occupation) newErrors.occupation = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(s => s + 1);
    }
  };
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      onSubmit(formData as DemographicProfile);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div className="bg-slate-900 px-8 py-6 text-white">
        <h2 className="text-xl font-bold">{t.form_title}</h2>
        <div className="mt-4 flex gap-1">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-orange-500' : 'bg-slate-700'}`} 
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800">{t.basic_info}</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500">{lang === 'en' ? 'How old are you?' : 'आपकी आयु क्या है?'}</label>
              <input 
                type="number" 
                value={formData.age === undefined ? '' : formData.age}
                placeholder={lang === 'en' ? 'e.g. 25' : 'जैसे 25'}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                  setFormData({ ...formData, age: isNaN(val as number) ? undefined : val });
                  if (errors.age) setErrors({ ...errors, age: false });
                }}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${errors.age ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                min="0" max="120"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500">{t.gender}</label>
              <div className={`grid grid-cols-3 gap-3 p-1 rounded-2xl ${errors.gender ? 'bg-red-50 border border-red-200' : ''}`}>
                {['Male', 'Female', 'Other'].map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, gender: g as any });
                      if (errors.gender) setErrors({ ...errors, gender: false });
                    }}
                    className={`py-3 rounded-xl border font-medium transition-all ${formData.gender === g ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  >
                    {lang === 'hi' ? (g === 'Male' ? 'पुरुष' : g === 'Female' ? 'महिला' : 'अन्य') : g}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500">{lang === 'en' ? 'State of Residence' : 'निवास का राज्य'}</label>
              <select 
                value={formData.state || ''}
                onChange={e => {
                  setFormData({ ...formData, state: e.target.value });
                  if (errors.state) setErrors({ ...errors, state: false });
                }}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all appearance-none bg-white ${errors.state ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
              >
                <option value="" disabled>{lang === 'en' ? 'Select State' : 'राज्य चुनें'}</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800">{t.socio_eco}</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500">{t.caste}</label>
              <div className={`grid grid-cols-2 gap-3 p-1 rounded-2xl ${errors.caste ? 'bg-red-50 border border-red-200' : ''}`}>
                {['General', 'OBC', 'SC', 'ST'].map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, caste: c as any });
                      if (errors.caste) setErrors({ ...errors, caste: false });
                    }}
                    className={`py-3 rounded-xl border font-medium transition-all ${formData.caste === c ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500">{t.income} (₹)</label>
              <input 
                type="number" 
                value={formData.annualIncome === undefined ? '' : formData.annualIncome}
                placeholder={lang === 'en' ? 'e.g. 300000' : 'जैसे 300000'}
                onChange={e => {
                  const val = e.target.value === '' ? undefined : parseInt(e.target.value);
                  setFormData({ ...formData, annualIncome: isNaN(val as number) ? undefined : val });
                  if (errors.annualIncome) setErrors({ ...errors, annualIncome: false });
                }}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all ${errors.annualIncome ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
                step="10000"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="space-y-1">
                <p className="font-medium text-slate-800">{t.isBPL}</p>
                <p className="text-xs text-slate-500">{lang === 'en' ? 'Do you hold a BPL Ration Card?' : 'क्या आपके पास बीपीएल राशन कार्ड है?'}</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, isBPL: !formData.isBPL })}
                className={`w-12 h-6 rounded-full p-1 transition-all ${formData.isBPL ? 'bg-orange-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.isBPL ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-800">{t.occupation_needs}</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-500">{lang === 'en' ? 'What is your primary occupation?' : 'आपका प्राथमिक व्यवसाय क्या है?'}</label>
              <select 
                value={formData.occupation || ''}
                onChange={e => {
                  setFormData({ ...formData, occupation: e.target.value });
                  if (errors.occupation) setErrors({ ...errors, occupation: false });
                }}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all appearance-none bg-white ${errors.occupation ? 'border-red-500 bg-red-50' : 'border-slate-200'}`}
              >
                <option value="" disabled>{lang === 'en' ? 'Select Occupation' : 'व्यवसाय चुनें'}</option>
                {occupations.map(o => <option key={o} value={o}>{lang === 'hi' ? (o === 'Student' ? 'छात्र' : o === 'Farmer' ? 'किसान' : o === 'Unemployed' ? 'बेरोजगार' : o) : o}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="space-y-1">
                <p className="font-medium text-slate-800">{t.disability}</p>
                <p className="text-xs text-slate-500">{lang === 'en' ? 'Do you have any physical disabilities?' : 'क्या आपको कोई शारीरिक विकलांगता है?'}</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, disability: !formData.disability })}
                className={`w-12 h-6 rounded-full p-1 transition-all ${formData.disability ? 'bg-orange-500' : 'bg-slate-300'}`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${formData.disability ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3">
              <CheckCircle2 className="text-orange-600 shrink-0" size={20} />
              <p className="text-sm text-orange-800 leading-snug">
                {lang === 'en' ? 'Sarthak uses this information strictly to calculate eligibility. Your data is not stored permanently.' : 'सार्थक इस जानकारी का उपयोग केवल पात्रता की गणना करने के लिए करता है। आपका डेटा स्थायी रूप से संग्रहीत नहीं किया जाता है।'}
              </p>
            </div>
          </motion.div>
        )}

        <div className="mt-10 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-4 px-6 border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <ChevronLeft size={20} /> {t.back}
            </button>
          )}
          
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-[2] py-4 px-6 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              {t.next} <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex-[2] py-4 px-6 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {t.analyze}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
