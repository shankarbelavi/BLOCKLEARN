import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState("enterEmail"); // enterEmail -> enterOtp -> setNew
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const sendOtp = () => {
    if (!email) { setMessage("Enter your email"); return; }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem("resetOtp:" + email, code);
    setStep("enterOtp");
    setMessage(`OTP sent to ${email}. (Demo: ${code})`);
  };

  const verifyOtp = () => {
    const saved = localStorage.getItem("resetOtp:" + email);
    if (!otp || otp !== saved) { setMessage("Invalid OTP"); return; }
    setStep("setNew");
    setMessage("OTP verified. Set a new password.");
  };

  const savePassword = () => {
    if (password.length < 6) { setMessage("Password must be at least 6 characters"); return; }
    if (password !== confirm) { setMessage("Passwords do not match"); return; }
    localStorage.setItem("appPassword", password);
    localStorage.removeItem("resetOtp:" + email);
    setMessage("Password reset. You can now log in.");
    setTimeout(() => navigate("/login"), 800);
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <h1 className="text-xl font-semibold mb-2">Forgot Password</h1>
          {message && <div className="mb-4 text-sm text-gray-700">{message}</div>}

          {step === "enterEmail" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <button className="btn-primary w-full" onClick={sendOtp}>Send OTP</button>
            </div>
          )}

          {step === "enterOtp" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Enter OTP</label>
                <input className="input-field text-center tracking-widest" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="______" />
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary flex-1" onClick={() => setStep("enterEmail")}>Back</button>
                <button className="btn-primary flex-1" onClick={verifyOtp}>Verify</button>
              </div>
            </div>
          )}

          {step === "setNew" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">New password</label>
                <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Confirm password</label>
                <input className="input-field" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary flex-1" onClick={() => setStep("enterEmail")}>Cancel</button>
                <button className="btn-primary flex-1" onClick={savePassword}>Save Password</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}












