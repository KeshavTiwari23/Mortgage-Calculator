import React, { useState, useEffect } from "react";

export default function MortgageWireframe() {
  // Stepper: 0=Inputs,1=Options,2=Review+Results
  const [step, setStep] = useState(0);

  // Form state (auto-saved to localStorage)
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("mortgageForm");
      return saved
        ? JSON.parse(saved)
        : {
            purchasePrice: "",
            deposit: "",
            mortgageTermYears: 25,
            interestRate: 3.5,
            income: "",
            repaymentType: "repayment",
            showGlossary: false,
          };
    } catch (e) {
      return {
        purchasePrice: "",
        deposit: "",
        mortgageTermYears: 25,
        interestRate: 3.5,
        income: "",
        repaymentType: "repayment",
        showGlossary: false,
      };
    }
  });

  // Simple validation/errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Auto-save on change
    localStorage.setItem("mortgageForm", JSON.stringify(form));
  }, [form]);

  // Basic monthly payment calc (placeholder for production logic)
  function calculateMonthlyPayment() {
    const P = Number(form.purchasePrice) - Number(form.deposit || 0);
    const annualRate = Number(form.interestRate) / 100;
    const n = Number(form.mortgageTermYears) * 12;
    if (!P || !annualRate || !n) return null;
    const r = annualRate / 12;
    const payment = (P * r) / (1 - Math.pow(1 + r, -n));
    return Number.isFinite(payment) ? payment : null;
  }

  const monthly = calculateMonthlyPayment();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function nextStep() {
    const validation = {};
    // Simple required checks for step 0
    if (step === 0) {
      if (!form.purchasePrice) validation.purchasePrice = "Enter purchase price";
      if (!form.deposit && form.deposit !== 0) validation.deposit = "Enter deposit";
    }
    setErrors(validation);
    if (Object.keys(validation).length === 0) setStep((s) => Math.min(s + 1, 2));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 0));
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <header className="p-6 border-b">
          <h1 className="text-2xl font-semibold">Mortgage Calculator — Wireframe</h1>
          <p className="text-sm text-slate-500 mt-1">Guided workflow, improved clarity, mobile-ready</p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Left column: Stepper + Form (spans 2 cols on desktop) */}
          <section className="md:col-span-2">
            {/* Stepper */}
            <nav className="flex items-center gap-4 mb-6">
              {[
                { id: 0, label: "Your details" },
                { id: 1, label: "Mortgage options" },
                { id: 2, label: "Review & results" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStep(s.id)}
                  className={`flex-1 text-left p-3 rounded-md border ${
                    step === s.id ? "bg-sky-600 text-white" : "bg-white text-slate-700"
                  }`}
                  aria-current={step === s.id}
                >
                  <div className="text-sm font-medium">{s.label}</div>
                </button>
              ))}
            </nav>

            {/* Form content */}
            <div className="bg-slate-50 p-4 rounded-lg">
              {step === 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Enter your details</h2>
                  <p className="text-sm text-slate-500 mb-4">We’ll guide you step-by-step. You can save progress automatically.</p>

                  <label className="block mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Purchase price</span>
                      <button
                        type="button"
                        className="text-xs underline"
                        onClick={() => setForm((s) => ({ ...s, showGlossary: true }))}
                      >
                        What’s this?
                      </button>
                    </div>
                    <input
                      name="purchasePrice"
                      value={form.purchasePrice}
                      onChange={handleChange}
                      inputMode="numeric"
                      aria-invalid={errors.purchasePrice ? true : false}
                      className="mt-2 block w-full rounded-md border p-2"
                      placeholder="e.g. 350000"
                    />
                    {errors.purchasePrice && <div className="text-sm text-red-600">{errors.purchasePrice}</div>}
                  </label>

                  <label className="block mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Deposit</span>
                      <span className="text-xs text-slate-500">Amount or %</span>
                    </div>
                    <input
                      name="deposit"
                      value={form.deposit}
                      onChange={handleChange}
                      inputMode="numeric"
                      className="mt-2 block w-full rounded-md border p-2"
                      placeholder="e.g. 35000"
                    />
                  </label>

                  <label className="block mb-3">
                    <span className="text-sm font-medium">Your annual income (optional)</span>
                    <input
                      name="income"
                      value={form.income}
                      onChange={handleChange}
                      inputMode="numeric"
                      className="mt-2 block w-full rounded-md border p-2"
                      placeholder="e.g. 45000"
                    />
                  </label>

                  <div className="flex gap-2 mt-4">
                    <button onClick={nextStep} className="px-4 py-2 rounded-md bg-sky-600 text-white">Next</button>
                    <button onClick={() => { setForm({ ...form, purchasePrice: "", deposit: "" }); }} className="px-4 py-2 rounded-md border">Clear</button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Mortgage options</h2>
                  <label className="block mb-3">
                    <span className="text-sm font-medium">Mortgage term (years)</span>
                    <select name="mortgageTermYears" value={form.mortgageTermYears} onChange={handleChange} className="mt-2 block w-full rounded-md border p-2">
                      {[15, 20, 25, 30].map((y) => (
                        <option key={y} value={y}>{y} years</option>
                      ))}
                    </select>
                  </label>

                  <label className="block mb-3">
                    <span className="text-sm font-medium">Interest rate (annual %)</span>
                    <input name="interestRate" value={form.interestRate} onChange={handleChange} inputMode="numeric" className="mt-2 block w-full rounded-md border p-2" />
                  </label>

                  <label className="block mb-3">
                    <span className="text-sm font-medium">Repayment type</span>
                    <div className="mt-2 flex gap-2">
                      <label className={`p-2 border rounded-md ${form.repaymentType === 'repayment' ? 'bg-white' : 'bg-slate-100'}`}>
                        <input type="radio" name="repaymentType" value="repayment" checked={form.repaymentType === 'repayment'} onChange={handleChange} /> Repayment
                      </label>
                      <label className={`p-2 border rounded-md ${form.repaymentType === 'interest-only' ? 'bg-white' : 'bg-slate-100'}`}>
                        <input type="radio" name="repaymentType" value="interest-only" checked={form.repaymentType === 'interest-only'} onChange={handleChange} /> Interest-only
                      </label>
                    </div>
                  </label>

                  <div className="flex gap-2 mt-4">
                    <button onClick={prevStep} className="px-4 py-2 rounded-md border">Back</button>
                    <button onClick={nextStep} className="px-4 py-2 rounded-md bg-sky-600 text-white">Next</button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Review & results</h2>
                  <p className="text-sm text-slate-600 mb-4">Quick summary of your inputs and an easy-to-interpret result.</p>

                  <div className="bg-white rounded-md border p-4 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><strong>Purchase price</strong><div>{form.purchasePrice || '-'} </div></div>
                      <div><strong>Deposit</strong><div>{form.deposit || '-'} </div></div>
                      <div><strong>Term</strong><div>{form.mortgageTermYears} years</div></div>
                      <div><strong>Interest rate</strong><div>{form.interestRate}%</div></div>
                    </div>
                  </div>

                  <div className="bg-white rounded-md border p-4 mb-4">
                    <h3 className="font-medium mb-2">Estimated monthly payment</h3>
                    {monthly ? (
                      <div className="text-2xl font-semibold">£{monthly.toFixed(2)}</div>
                    ) : (
                      <div className="text-sm text-slate-500">Please complete the required fields.</div>
                    )}
                    <p className="text-xs text-slate-500 mt-2">This estimate shows the core repayment only and excludes fees and insurance. Use the slider or "what-if" to test scenarios.</p>
                  </div>

                  {/* Placeholder for interactive chart */}
                  <div className="bg-slate-50 rounded-md border p-4 mb-4">
                    <div className="h-40 flex items-center justify-center text-sm text-slate-400">[Interactive amortisation chart placeholder]</div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={prevStep} className="px-4 py-2 rounded-md border">Back</button>
                    <button onClick={() => alert('Add CTA to apply or save scenario')} className="px-4 py-2 rounded-md bg-emerald-600 text-white">Save scenario</button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Right column: Help, glossary, tips, mobile view preview */}
          <aside className="md:col-span-1">
            <div className="sticky top-6 space-y-4">
              <div className="bg-sky-50 p-4 rounded-md border">
                <h3 className="font-medium">Need help?</h3>
                <p className="text-sm text-slate-600">Short tips and quick links to glossary. Tooltips available next to each input.</p>
                <button onClick={() => setForm((s) => ({ ...s, showGlossary: true }))} className="mt-3 text-sm underline">Open glossary</button>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <h4 className="font-medium">Mobile preview</h4>
                <p className="text-xs text-slate-500 mt-2">Design is mobile-first and responsive.</p>
                <div className="mt-3 border rounded-md p-2 text-xs text-slate-400">[Compact layout preview]</div>
              </div>

              <div className="bg-white p-4 rounded-md border">
                <h4 className="font-medium">Usability checklist</h4>
                <ul className="text-sm mt-2 space-y-1">
                  <li>- Step-by-step flow</li>
                  <li>- Plain-language tooltips</li>
                  <li>- Auto-save on input</li>
                  <li>- Mobile & keyboard accessible</li>
                </ul>
              </div>
            </div>
          </aside>
        </main>

        {/* Glossary modal */}
        {form.showGlossary && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
            <div className="bg-white max-w-xl w-full rounded-lg p-6">
              <h3 className="text-lg font-semibold">Glossary — key terms</h3>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm">
                <div>
                  <dt className="font-medium">Purchase price</dt>
                  <dd className="text-slate-600">The total price of the property you plan to buy.</dd>
                </div>
                <div>
                  <dt className="font-medium">Deposit</dt>
                  <dd className="text-slate-600">The amount you pay upfront which reduces the loan amount.</dd>
                </div>
                <div>
                  <dt className="font-medium">Interest rate</dt>
                  <dd className="text-slate-600">Annual rate charged on the mortgage. Use the field to model different scenarios.</dd>
                </div>
              </dl>

              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setForm((s) => ({ ...s, showGlossary: false }))} className="px-4 py-2 border rounded-md">Close</button>
              </div>
            </div>
          </div>
        )}

        <footer className="p-4 border-t text-xs text-slate-500">Wireframe — not final product. Accessibility checks and cross-browser testing recommended.</footer>
      </div>
    </div>
  );
}
