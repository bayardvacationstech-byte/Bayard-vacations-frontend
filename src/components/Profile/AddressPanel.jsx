"use client";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PenLine, Loader2, MapPin } from "lucide-react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { COLLECTIONS } from "@/config";

const initialAddress = {
  street: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
};

const AddressPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [address, setAddress] = useState(initialAddress);
  const [isEditing, setIsEditing] = useState(false);
  const hasAddress =
    address.street && address.city && address.state && address.pincode;

  // Fetch existing address when component mounts and user is authenticated
  useEffect(() => {
    const fetchAddress = async () => {
      if (!user) return;

      setLoading(true);
      try {
        const userDocRef = doc(db, COLLECTIONS.USERS, user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists() && userDoc.data().address) {
          setAddress(userDoc.data().address);
          setIsEditing(false); // Ensure edit mode is off when loading existing address
        } else {
          setAddress(initialAddress);
          setIsEditing(true); // Show form if no address exists
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        if (error.code !== "not-found") {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load address information",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
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
          address,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await setDoc(userDocRef, {
          address,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          phoneNumber: user.phoneNumber,
        });
      }

      toast({
        title: "Success",
        description: "Your address has been updated successfully.",
      });
      setIsEditing(false); // Exit edit mode after successful save
    } catch (error) {
      console.error("Error updating address:", error);
      setError("Failed to update address. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update address. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-solid border-[#D9D9D9]">
        <Loader2 className="size-8 animate-spin text-brand-blue" />
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
      <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-nord font-bold uppercase text-brand-blue">
        address
      </h5>

      {hasAddress && !isEditing ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-sm text-gray-500">Street Address</Label>
            <p className="text-lg">{address.street}</p>
          </div>

          {address.landmark && (
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">Landmark</Label>
              <p className="text-lg">{address.landmark}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">City</Label>
              <p className="text-lg">{address.city}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-gray-500">State</Label>
              <p className="text-lg">{address.state}</p>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-gray-500">PIN Code</Label>
            <p className="text-lg">{address.pincode}</p>
          </div>

          <Button
            onClick={() => setIsEditing(true)}
            className="rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
          >
            <PenLine className="mr-2 size-4" />
            Edit Address
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Textarea
              id="street"
              name="street"
              className="rounded-2xl border-[#B0B0B0] p-4"
              value={address.street}
              onChange={handleChange}
              placeholder="Enter your street address"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input
              id="landmark"
              name="landmark"
              value={address.landmark}
              className="rounded-2xl border-[#B0B0B0] p-4"
              onChange={handleChange}
              placeholder="Enter a nearby landmark"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                value={address.city}
                className="rounded-2xl border-[#B0B0B0] p-4"
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                value={address.state}
                className="rounded-2xl border-[#B0B0B0] p-4"
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pincode">PIN Code</Label>
            <Input
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Enter PIN code"
              required
              className="rounded-2xl border-[#B0B0B0] p-4"
            />
          </div>

          <div className="flex gap-4">
            {hasAddress && (
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 rounded-xl border-2 border-solid border-gray-300 bg-transparent p-5 text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              className="rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 size-4" />
                  Save Address
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default AddressPanel;
