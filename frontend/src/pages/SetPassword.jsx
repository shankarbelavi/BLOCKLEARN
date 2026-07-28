import React, { useState, useEffect } from "react";

export default function SetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(false);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const key = "appPassword:" + (email || "").toLowerCase().trim();
    if (!email) { alert("Enter your email"); return; }
    if (password.length < 6) { alert("Password must be at least 6 characters"); return; }
    if (password !== confirm) { alert("Passwords do not match"); return; }
    localStorage.setItem(key, password);
    setSaved(true);
    alert("Password set for " + email + ". You can now log in.");
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <h1 className="text-xl font-semibold mb-2">Set Password</h1>
          <p className="text-sm text-gray-600 mb-4">Create a password for your email to log in.</p>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">New password</label>
              <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Confirm password</label>
              <input type="password" className="input-field" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn-primary w-full">{saved ? "Update" : "Set Password"}</button>
          </form>
        </div>
      </main>
    </div>
  );
}
