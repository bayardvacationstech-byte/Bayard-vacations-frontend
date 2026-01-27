"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2, Mail, PenLine, X } from "lucide-react";
import {
  verifyBeforeUpdateEmail,
  PhoneAuthProvider,
  reauthenticateWithCredential,
  RecaptchaVerifier,
} from "firebase/auth";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase/firebaseConfig";

const EmailPanel = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("view"); // "view" | "email" | "otp" | "completed"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const generateRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please try again.");
            toast({
              variant: "destructive",
              title: "Error",
              description: "reCAPTCHA expired. Please try again.",
            });
          },
        }
      );
    } catch (err) {
      setError("Error setting up verification. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error setting up verification. Please try again.",
      });
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
      const now = Date.now();
      const isFresh = now - lastSignIn <= 5 * 60 * 1000;

      if (isFresh) {
        await verifyBeforeUpdateEmail(user, email, {
          url: "http://127.0.0.1:3000/checkout",
        });

        setStep("completed");
        toast({
          title: "Success",
          description: "Verification link sent to your email.",
        });
      } else {
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }

        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          user.phoneNumber,
          window.recaptchaVerifier
        );

        setVerificationId(verificationId);
        setStep("otp");
        toast({
          title: "OTP Sent",
          description: "Check your phone for the verification code.",
        });
      }
    } catch (error) {
      setError(error.message || "Failed to proceed. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to proceed. Please try again later.",
      });

      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      await reauthenticateWithCredential(user, credential);

      await verifyBeforeUpdateEmail(user, email, {
        url: "http://127.0.0.1:3000/checkout",
      });

      setStep("completed");
      toast({
        title: "Success",
        description: "Verification link sent to your email.",
      });
    } catch (error) {
      setError(error.message || "Failed to verify OTP. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to verify OTP. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    setEmail("");
    setIsEditing(false);
    setStep("view");
  };

  const handleCancel = () => {
    setEmail("");
    setOtp("");
    setError("");
    setIsEditing(false);
    setStep("view");

    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  const startEdit = () => {
    setIsEditing(true);
    setStep("email");
  };

  return (
    <div className="relative flex-1 rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
      <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-nord font-bold uppercase text-brand-blue">
        email id
      </h5>

      {isEditing && false}

      {step === "view" && (
        <div className="flex flex-col items-start justify-start gap-4">
          <div>
            <h3 className="text-lg font-semibold">
              {user?.email || "Not set"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your registered email address
            </p>
          </div>
          <Button
            onClick={startEdit}
            variant="outline"
            className="rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            <span className="mr-2">Edit</span>
            <PenLine className="size-4" />
          </Button>
        </div>
      )}

      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">New Email Address</Label>
            <Input
              id="email"
              type="email"
              className="rounded-2xl border-[#B0B0B0] p-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johndoe@example.com"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl p-5"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="mr-2 size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Mail className="mr-2 size-4" />
                  Continue
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              className="rounded-2xl border-[#B0B0B0] p-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter verification code sent to your phone"
              required
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl p-5"
              onClick={handleCancel}
              disabled={loading}
            >
              <X className="mr-2 size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
          </div>
        </form>
      )}

      {step === "completed" && (
        <div className="py-4 text-center">
          <p className="font-medium text-green-600">
            Verification link has been sent to your email!
          </p>
          <p className="mb-8 mt-2 text-sm text-gray-500">
            Please check your email and click the verification link to complete
            the process.
          </p>
          <Button
            className="rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={handleComplete}
          >
            Done
          </Button>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
};

export default EmailPanel;
