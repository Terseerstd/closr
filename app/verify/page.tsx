"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Read email from query parameters or session storage
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      const storedEmail = sessionStorage.getItem("verify_email");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        setError("Missing email context. Please register first.");
      }
    }
  }, [searchParams]);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return; // only allow numbers
    
    const newCode = [...code];
    // take only the last character if pasted/multiple
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);
    setError("");

    // Automatically focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Focus previous input on Backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && !isNaN(Number(pasteData))) {
      const codeArray = pasteData.split("");
      setCode(codeArray);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendStatus("");

    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: fullCode }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Verification failed");
      }

      setSuccess(true);
      // Remove email from session storage
      sessionStorage.removeItem("verify_email");
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Email address is missing.");
      return;
    }

    setError("");
    setResending(true);
    setResendStatus("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "User", password: "resend_code_placeholder" }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to resend code");
      }

      setResendStatus("A new 6-digit verification code has been sent!");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-brand-dark px-6 py-12 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-radial from-brand-pink/15 via-brand-purple/5 to-transparent blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-radial from-brand-purple/10 to-transparent blur-[80px] pointer-events-none" />

      {/* Back button */}
      <Link
        href="/register"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-lilac hover:text-white transition-colors py-2 px-4 rounded-full border border-white/5 bg-white/2 hover:bg-white/5"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to sign up</span>
      </Link>

      <div className="w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-3xl font-bold tracking-tight text-white mb-2">
            <span>Closr</span>
            <span className="text-brand-pink font-extrabold text-4xl leading-none">.</span>
          </Link>
          <p className="text-xs text-brand-lilac/70">AI Revenue Intelligence Platform</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-brand-purple/20 bg-brand-lowest/60 backdrop-blur-md p-8 sm:p-10 shadow-2xl">
          {success ? (
            <div className="text-center py-6 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold text-white">Verification successful!</h2>
              <p className="text-xs text-brand-lilac/80 max-w-xs">
                Your account is activated. Entering your revenue dashboard...
              </p>
              <div className="h-1 w-24 bg-white/10 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-brand-pink w-1/2 animate-infinite-loading rounded-full" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-brand-pink/10 text-brand-pink">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Verify Account</h2>
                </div>
                <p className="text-xs text-brand-lilac/70 leading-relaxed">
                  We sent a 6-digit confirmation code to <span className="text-white font-bold">{email || "your email"}</span>. Enter it below to activate.
                </p>
              </div>

              {error && (
                <div className="p-3 text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg font-medium">
                  {error}
                </div>
              )}

              {resendStatus && (
                <div className="p-3 text-xs bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg font-medium">
                  {resendStatus}
                </div>
              )}

              {/* 6 digits input fields */}
              <div className="flex justify-between items-center gap-2 sm:gap-3 py-2">
                {code.map((num, idx) => (
                  <input
                    key={idx}
                    type="text"
                    required
                    value={num}
                    maxLength={1}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    onPaste={handlePaste}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    className="w-12 h-14 text-center bg-brand-low border border-brand-purple/10 text-white focus:border-brand-pink focus:ring-1 focus:ring-brand-pink rounded-xl text-lg font-bold transition-all outline-none"
                  />
                ))}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3.5 px-6 rounded-full bg-brand-pink text-xs font-bold text-white transition-all hover:bg-opacity-95 hover:scale-[1.01] shadow-[0_0_20px_rgba(255,6,109,0.3)] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="h-4.5 w-4.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Verify Code</span>
                )}
              </button>

              {/* Resend actions */}
              <div className="text-center mt-2">
                <span className="text-xs text-brand-lilac/70">Didn't receive the code? </span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending || !email}
                  className="text-xs text-brand-pink font-bold hover:underline inline-flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                >
                  {resending && <RefreshCw className="h-3 w-3 animate-spin" />}
                  <span>Resend Code</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <div className="h-8 w-8 border-2 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <VerifyForm />
    </Suspense>
  );
}
