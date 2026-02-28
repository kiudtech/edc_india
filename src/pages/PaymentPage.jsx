import { useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userId, founderId } = location.state || {}
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [txnData, setTxnData] = useState(null)
  const [error, setError] = useState('')

  // Fake card form state
  const [card, setCard] = useState({
    number: '4111 1111 1111 1111',
    expiry: '12/28',
    cvv: '123',
    name: '',
  })

  if (!userId) return <Navigate to="/join" replace />

  const handlePay = async (e) => {
    e.preventDefault()
    setError('')
    setProcessing(true)

    try {
      // Simulate a 2-second payment processing delay
      await new Promise((r) => setTimeout(r, 2000))

      const res = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount: 2500, type: 'membership' }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)

      setTxnData(data)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-orange-500 text-sm font-semibold text-white">
              E
            </div>
            <div className="text-sm font-semibold text-slate-800">EDC India</div>
          </Link>
          <div className="text-xs font-semibold text-slate-400">Secure Payment</div>
        </div>
      </nav>

      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6 sm:py-16">
        {!success ? (
          <>
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Complete Your Payment</h1>
              <p className="mt-2 text-sm text-slate-500">Secure demo payment gateway</p>
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-2xl border border-secondary/40 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-800">Startup Membership</div>
                  <div className="mt-1 text-xs text-slate-500">Founder ID: {founderId}</div>
                </div>
                <div className="text-xl font-semibold text-primary">₹2,500</div>
              </div>
            </div>

            {/* Card Form */}
            <form onSubmit={handlePay} className="mt-6 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Card Details</div>
              <p className="mb-6 text-[11px] text-slate-400">This is a demo — no real charge will be made.</p>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              <div className="grid gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Card Number</label>
                  <input
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm tracking-wider text-slate-800"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">Expiry</label>
                    <input
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-800"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">CVV</label>
                    <input
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-sm text-slate-800"
                      readOnly
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-slate-600">Name on Card</label>
                  <input
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Processing Payment...
                  </>
                ) : (
                  'Pay ₹2,500'
                )}
              </button>

              <p className="mt-4 text-center text-[11px] text-slate-400">
                🔒 Secure demo payment — no real card is charged
              </p>
            </form>
          </>
        ) : (
          /* ─── Success Screen ─── */
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Payment Successful!</h2>
            <p className="mt-2 text-sm text-slate-500">Your startup membership is now active.</p>

            <div className="mt-8 rounded-3xl border border-secondary/40 bg-white p-6 text-left shadow-lg sm:p-8">
              <div className="grid gap-4">
                <div className="rounded-2xl bg-blue-50 p-4">
                  <div className="text-xs font-semibold text-blue-600">Founder ID</div>
                  <div className="mt-1 text-lg font-semibold text-primary">{txnData?.founderId}</div>
                </div>
                <div className="rounded-2xl bg-green-50 p-4">
                  <div className="text-xs font-semibold text-green-600">Transaction ID</div>
                  <div className="mt-1 text-sm font-mono text-slate-700">{txnData?.payment?.transactionId}</div>
                </div>
                <div className="flex justify-between rounded-2xl bg-slate-50 p-4 text-sm">
                  <span className="text-slate-500">Amount Paid</span>
                  <span className="font-semibold text-slate-800">₹{txnData?.payment?.amount}</span>
                </div>
                <div className="flex justify-between rounded-2xl bg-slate-50 p-4 text-sm">
                  <span className="text-slate-500">Status</span>
                  <span className="font-semibold text-green-600">✓ Success</span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={() => navigate('/login')}
                className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Go to Login →
              </button>
              <Link to="/" className="block text-sm font-semibold text-slate-500 hover:text-slate-700">
                ← Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
