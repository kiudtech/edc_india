import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { API_BASE } from '../config'

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    userId,
    founderId,
    amount: stateAmount,
    type: stateType,
    planName: statePlanName,
    successSubtitle,
  } = location.state || {}
  const amount = Number(stateAmount) || 2500
  const paymentType = stateType || 'membership'
  const planName = statePlanName || 'Startup Membership'
  const successText = successSubtitle || 'Your startup membership is now active.'
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [txnData, setTxnData] = useState(null)
  const [error, setError] = useState('')
  const [razorpayReady, setRazorpayReady] = useState(false)

  if (!userId) return <Navigate to="/join" replace />

  useEffect(() => {
    if (window.Razorpay) {
      setRazorpayReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setRazorpayReady(true)
    script.onerror = () => setError('Failed to load Razorpay SDK. Please refresh and try again.')
    document.body.appendChild(script)
  }, [])

  const handlePay = async () => {
    setError('')
    setProcessing(true)

    try {
      const createOrderRes = await fetch(`${API_BASE}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, amount, type: paymentType, planName }),
      })
      const orderData = await createOrderRes.json()
      if (!createOrderRes.ok) throw new Error(orderData.message || 'Failed to create payment order.')

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK is not ready. Please refresh and try again.')
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'EDC India',
        description: planName,
        order_id: orderData.orderId,
        prefill: {
          name: orderData.user?.name || '',
          email: orderData.user?.email || '',
          contact: orderData.user?.phone || '',
        },
        notes: {
          founderId: founderId || '',
          userId,
          paymentType,
        },
        theme: {
          color: '#0f4c81',
        },
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId,
                amount,
                type: paymentType,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()
            if (!verifyRes.ok) throw new Error(verifyData.message || 'Payment verification failed.')

            setTxnData(verifyData)
            setSuccess(true)
          } catch (verifyErr) {
            setError(verifyErr.message || 'Payment verification failed.')
          } finally {
            setProcessing(false)
          }
        },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      })

      razorpay.on('payment.failed', (response) => {
        setError(response?.error?.description || 'Payment failed. Please try again.')
        setProcessing(false)
      })

      razorpay.open()
    } catch (err) {
      setError(err.message)
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="EDC India" className="h-11 w-11 rounded-full object-contain bg-white" />
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
              <p className="mt-2 text-sm text-slate-500">Secure payment powered by Razorpay</p>
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-2xl border border-secondary/40 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-800">{planName}</div>
                  <div className="mt-1 text-xs text-slate-500">Founder ID: {founderId}</div>
                </div>
                <div className="text-xl font-semibold text-primary">₹{amount.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-secondary/40 bg-white p-6 shadow-xl sm:p-8">
              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Razorpay Checkout</div>
              <p className="mb-6 text-[11px] text-slate-400">You will be redirected to secure Razorpay payment.</p>

              {error && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
              )}

              <button
                type="button"
                onClick={handlePay}
                disabled={processing || !razorpayReady}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Opening Checkout...
                  </>
                ) : !razorpayReady ? (
                  'Loading Razorpay...'
                ) : (
                  `Pay with Razorpay ₹${amount.toLocaleString('en-IN')}`
                )}
              </button>

              <p className="mt-4 text-center text-[11px] text-slate-400">
                Razorpay supports cards, UPI, netbanking and wallets.
              </p>
            </div>
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
            <p className="mt-2 text-sm text-slate-500">{successText}</p>

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
