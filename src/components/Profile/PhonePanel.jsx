"use client";
import { Loader2, PenLine, Phone, X } from "lucide-react";
import { Input } from "../ui/input";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

function removeFirstThree(str) {
  return str.slice(3);
}

const PhonePanel = () => {
  const { user } = useAuth();
   
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oldOtp, setOldOtp] = useState("");
  const [newOtp, setNewOtp] = useState("");
  const [step, setStep] = useState("view"); // "view" | "phone" | "old-otp" | "new-otp" | "completed"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oldVerificationId, setOldVerificationId] = useState(null);
  const [newVerificationId, setNewVerificationId] = useState(null);
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
      console.error("Error generating reCAPTCHA:", err);
      setError("Error setting up verification. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error setting up verification. Please try again.",
      });
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
      const now = Date.now();
      const isFresh = now - lastSignIn <= 5 * 60 * 1000;
      const formattedPhoneNumber = `+91${phoneNumber}`;

      if (isFresh) {
        if (!window.recaptchaVerifier) {
          generateRecaptcha();
        }

        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          formattedPhoneNumber,
          window.recaptchaVerifier
        );

        setNewVerificationId(verificationId);
        setStep("new-otp");
        toast({
          title: "OTP Sent",
          description: "Check your new phone number for the verification code.",
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

        setOldVerificationId(verificationId);
        setStep("old-otp");
        toast({
          title: "OTP Sent",
          description:
            "Check your current phone number for the verification code.",
        });
      }
    } catch (error) {
      console.error("Error in phone submission:", error);
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

  const handleOldOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(
        oldVerificationId,
        oldOtp
      );
      await reauthenticateWithCredential(user, credential);

      if (!window.recaptchaVerifier) {
        generateRecaptcha();
      }

      const formattedPhoneNumber = `+91${phoneNumber}`;
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedPhoneNumber,
        window.recaptchaVerifier
      );

      setNewVerificationId(verificationId);
      setStep("new-otp");
      toast({
        title: "OTP Sent",
        description: "Check your new phone number for the verification code.",
      });
    } catch (error) {
      console.error("Error in old OTP verification:", error);
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

  const handleNewOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = PhoneAuthProvider.credential(
        newVerificationId,
        newOtp
      );
      await updatePhoneNumber(user, credential);

      setStep("completed");
      toast({
        title: "Success",
        description: "Your phone number has been updated successfully.",
      });
    } catch (error) {
      console.error("Error in new OTP verification:", error);
      setError(
        error.message || "Failed to update phone number. Please try again."
      );
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to update phone number. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    setPhoneNumber("");
    setIsEditing(false);
    setStep("view");
  };

  const handleCancel = () => {
    setPhoneNumber("");
    setOldOtp("");
    setNewOtp("");
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
    setStep("phone");
  };

  return (
    <div className="relative flex-1 rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
      <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-nord font-bold uppercase text-brand-blue">
        phone number
      </h5>

      {step === "view" && (
        <div className="flex flex-col items-start justify-start gap-4">
          <div>
            <h3 className="text-lg font-semibold">
              (+91){" "}
              {user?.phoneNumber
                ? removeFirstThree(user.phoneNumber)
                : "Not set"}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Your registered phone number
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

      {step === "phone" && (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">New Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              className="rounded-2xl border-[#B0B0B0] p-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your new phone number"
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
                  <Phone className="mr-2 size-4" />
                  Continue
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {step === "old-otp" && (
        <form onSubmit={handleOldOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="old-otp">Verification Code</Label>
            <Input
              id="old-otp"
              type="text"
              className="rounded-2xl border-[#B0B0B0] p-4"
              value={oldOtp}
              onChange={(e) => setOldOtp(e.target.value)}
              placeholder="Enter verification code sent to your current number"
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
                "Verify Current Number"
              )}
            </Button>
          </div>
        </form>
      )}

      {step === "new-otp" && (
        <form onSubmit={handleNewOtpSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-otp">Verification Code</Label>
            <Input
              id="new-otp"
              type="text"
              className="rounded-2xl border-[#B0B0B0] p-4"
              value={newOtp}
              onChange={(e) => setNewOtp(e.target.value)}
              placeholder="Enter verification code sent to your new number"
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
                  Updating...
                </>
              ) : (
                "Update Phone Number"
              )}
            </Button>
          </div>
        </form>
      )}

      {step === "completed" && (
        <div className="py-4 text-center">
          <p className="font-medium text-green-600">
            Phone number updated successfully!
          </p>
          <p className="mb-8 mt-2 text-sm text-gray-500">
            Your new phone number is now associated with your account.
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

export default PhonePanel;
