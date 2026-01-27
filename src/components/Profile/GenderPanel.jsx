"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, UserCircle2, PenLine, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { COLLECTIONS } from "@/config";

const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const GenderPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch existing gender when component mounts and user is authenticated
  useEffect(() => {
    const fetchGender = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().gender) {
          setGender(userDoc.data().gender);
        }
      } catch (error) {
        if (error.code !== "not-found") {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load gender information",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGender();
  }, [user, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (!user) {
      setError("User not authenticated");
      setSaving(false);
      return;
    }

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          gender,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await setDoc(userDocRef, {
          gender,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          phoneNumber: user.phoneNumber,
        });
      }

      toast({
        title: "Success",
        description: "Your gender has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      setError("Failed to update gender. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update gender. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Loading gender information...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative flex-1 rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
      <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-nord font-bold uppercase text-brand-blue">
        gender
      </h5>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <UserCircle2 className="size-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {gender
                  ? GENDER_OPTIONS.find((g) => g.value === gender)?.label ||
                    gender
                  : "Not specified"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
            onClick={() => setIsEditing(!isEditing)}
            disabled={saving}
          >
            {isEditing ? "Cancel" : "Edit"}
            {isEditing ? (
              <X className="size-4" />
            ) : (
              <PenLine className="size-4" />
            )}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup
            value={gender}
            onValueChange={setGender}
            className="flex flex-col items-start justify-between gap-4 c-lg:flex-row c-lg:items-center"
            disabled={!isEditing}
          >
            {GENDER_OPTIONS.map((option) => (
              <div
                key={option.value}
                className={`flex items-center gap-2 rounded-xl bg-neutral-200 p-4 ${!isEditing ? "opacity-70" : ""}`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className={!isEditing ? "cursor-not-allowed" : ""}
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {isEditing && (
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default GenderPanel;
