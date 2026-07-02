import React, { useState } from 'react';
import { 
  ChevronLeft, Lock, CheckCircle2, ShieldCheck, CreditCard, 
  Smartphone, Banknote, Calendar, Clock, Edit2, Info, Sparkles, Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PaymentModal: React.FC = () => {
  const { 
    selectedJobForBooking, 
    setSelectedJobForBooking, 
    hireWorkerForJob, 
    jobs, 
    showToast,
    setActiveTab,
    getOrCreateConversation,
    setActiveConversationId
  } = useApp();

  const [paymentStep, setPaymentStep] = useState<1 | 2 | 3>(2);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'tigo' | 'cash'>('card');
  const [selectedDate, setSelectedDate] = useState('May 25, 2026 at 10:00 AM');
  const [hours, setHours] = useState(selectedJobForBooking?.estimatedHours || 2);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!selectedJobForBooking) return null;

  const { worker, jobTitle = 'General Service' } = selectedJobForBooking;

  const hourlyRate = worker.hourlyRate;
  const subtotal = hourlyRate * hours;
  const serviceFee = Math.round(subtotal * 0.05); // 5% fee or min L 25
  const total = subtotal + serviceFee;

  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep(3); // Confirmation step

      // Find if there's an existing matching job or create/update job
      const matchingJob = jobs.find(j => j.category === worker.category && j.status === 'Open');
      if (matchingJob) {
        hireWorkerForJob(matchingJob.id, worker.id, total);
      } else {
        showToast(`Reserva completada con ${worker.name}`);
      }
    }, 1200);
  };

  const handleDone = () => {
    const convId = getOrCreateConversation(worker.id);
    setActiveConversationId(convId);
    setSelectedJobForBooking(null);
    setActiveTab('messages');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-[92vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
        
        {/* Modal Header */}
        <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={() => setSelectedJobForBooking(null)}
            className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="text-sm font-bold text-slate-900">Payment</h2>
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>Secure Payment</span>
            </div>
          </div>

          <div className="w-8" />
        </div>

        {/* Stepper Bar */}
        <div className="bg-slate-50 border-b border-slate-100 py-3 px-6 shrink-0">
          <div className="flex items-center justify-between relative max-w-xs mx-auto">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 -z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 -z-0 transition-all duration-300"
              style={{ width: paymentStep === 1 ? '0%' : paymentStep === 2 ? '50%' : '100%' }}
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center z-10">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-semibold text-slate-600 mt-1">Service Details</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                paymentStep >= 2 ? 'bg-blue-600 text-white ring-4 ring-blue-100' : 'bg-slate-200 text-slate-500'
              }`}>
                {paymentStep > 2 ? <Check className="w-3.5 h-3.5" /> : '2'}
              </div>
              <span className={`text-[9px] font-bold mt-1 ${paymentStep >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
                Payment
              </span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center z-10">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                paymentStep === 3 ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </div>
              <span className={`text-[9px] font-semibold mt-1 ${paymentStep === 3 ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* STEP 2: PAYMENT FORM */}
          {paymentStep === 2 && (
            <>
              {/* Worker & Service Card (Matches exact user image!) */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-800">Worker & Service</span>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Edit</button>
                </div>

                <div className="flex items-center gap-3">
                  <img
                    src={worker.avatar}
                    alt={worker.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shrink-0"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{worker.name}</h3>
                    <p className="text-[11px] text-slate-500">{worker.category} Specialist</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[9px] font-semibold flex items-center gap-0.5">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Verified
                      </span>
                      <span className="px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[9px] font-semibold flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" /> Background Checked
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-1.5 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] font-medium block">Service</span>
                    <p className="font-semibold text-slate-800">{jobTitle}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400 text-[10px] font-medium block">Date & Time</span>
                      <p className="font-semibold text-slate-800 text-[11px]">{selectedDate}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] font-medium block">Estimated Time</span>
                      <p className="font-semibold text-slate-800 text-[11px]">{hours} hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Summary Box */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
                <h3 className="text-xs font-bold text-slate-800">Payment Summary</h3>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Hourly rate</span>
                    <span className="font-medium text-slate-800">L {hourlyRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated time</span>
                    <span className="font-medium text-slate-800">{hours} hours</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-100">
                    <span>Subtotal</span>
                    <span className="font-medium text-slate-800">L {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="flex items-center gap-1">
                      Service fee <Info className="w-3 h-3 text-slate-400" />
                    </span>
                    <span>L {serviceFee.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-900">Total</span>
                  <span className="text-base font-extrabold text-blue-600">L {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-800">Payment Method</h3>

                <div className="space-y-2">
                  {/* Credit / Debit Card option */}
                  <label
                    onClick={() => setSelectedMethod('card')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedMethod === 'card'
                        ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={selectedMethod === 'card'}
                        onChange={() => setSelectedMethod('card')}
                        className="accent-blue-600"
                      />
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-bold text-slate-800">Credit / Debit Card</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-extrabold text-slate-400 uppercase">
                      <span className="text-blue-800">VISA</span>
                      <span className="text-rose-600">MC</span>
                      <span className="text-indigo-600">AMEX</span>
                    </div>
                  </label>

                  {/* Tigo Money Mobile Wallet */}
                  <label
                    onClick={() => setSelectedMethod('tigo')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedMethod === 'tigo'
                        ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={selectedMethod === 'tigo'}
                        onChange={() => setSelectedMethod('tigo')}
                        className="accent-blue-600"
                      />
                      <Smartphone className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-800">Mobile Money (Tigo Money)</span>
                    </div>
                    <span className="text-[10px] font-bold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded">
                      tigo money
                    </span>
                  </label>

                  {/* Cash Option */}
                  <label
                    onClick={() => setSelectedMethod('cash')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedMethod === 'cash'
                        ? 'bg-blue-50/50 border-blue-600 ring-2 ring-blue-600/20'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="pm"
                        checked={selectedMethod === 'cash'}
                        onChange={() => setSelectedMethod('cash')}
                        className="accent-blue-600"
                      />
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-800">Cash</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Pay in cash after service</span>
                  </label>
                </div>
              </div>

              {/* Security Shield Callout */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-blue-900">Your payment is secure</p>
                  <p className="text-blue-700/80">We use industry-standard encryption to protect your information.</p>
                </div>
              </div>
            </>
          )}

          {/* STEP 3: CONFIRMATION SUCCESS */}
          {paymentStep === 3 && (
            <div className="text-center py-8 space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 fill-emerald-600 text-white" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Your job request has been scheduled with <strong className="text-slate-800">{worker.name}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Worker</span>
                  <strong className="text-slate-900">{worker.name}</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Scheduled Time</span>
                  <strong className="text-slate-900">{selectedDate}</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Total Paid</span>
                  <strong className="text-blue-600 font-extrabold">L {total.toFixed(2)}</strong>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Payment Method</span>
                  <strong className="text-slate-900 uppercase">{selectedMethod}</strong>
                </div>
              </div>

              <button
                onClick={handleDone}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Go to Chat & Coordinate Service
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Fixed Action */}
        {paymentStep === 2 && (
          <div className="p-4 bg-white border-t border-slate-100 space-y-2 shrink-0">
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Pay L {total.toFixed(2)}</span>
                  <Lock className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400 font-semibold flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure Payment</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
