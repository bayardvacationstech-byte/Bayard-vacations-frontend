"use client";

import React, { useState } from "react";
import { PenLine, Loader2, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

const NamePanel = () => {
  const { userInfo, refreshUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditClick = () => {
    if (!isEditing) {
      const [currentFirst, currentLast] = userInfo.displayName?.split(" ") || [
        "",
        "",
      ];
      setFirstName(currentFirst);
      setLastName(currentLast);
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName("");
    setLastName("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!firstName.trim() || !lastName.trim()) {
        throw new Error("Both first name and last name are required");
      }

      const displayName = `${firstName.trim()} ${lastName.trim()}`;
      await updateProfile(auth.currentUser, {
        displayName,
      });

      await refreshUserInfo();
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      setIsEditing(false);
      setFirstName("");
      setLastName("");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message || "Error updating profile. Please try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="relative rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
      <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-nord font-bold uppercase text-brand-blue">
        your name
      </h5>

      {!isEditing ? (
        <>
          <h3 className="mb-5 text-lg font-semibold">{userInfo.displayName}</h3>
          <div className="mb-5">
            <Button
              onClick={handleEditClick}
              className="rounded-xl border-2 border-solid border-brand-blue bg-transparent p-5 text-brand-blue hover:bg-brand-blue hover:text-white"
              type="button"
            >
              <span className="mr-2">Edit</span>
              <PenLine className="size-4" />
            </Button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-8 flex gap-5">
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-2xl border-[#B0B0B0] p-4"
              placeholder="John"
              disabled={updating}
            />
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-2xl border-[#B0B0B0] p-4"
              placeholder="Doe"
              disabled={updating}
            />
          </div>
          <div className="mb-5 flex gap-4">
            <Button
              className="rounded-xl border-2 border-solid border-brand-blue bg-brand-blue p-5 text-white hover:bg-brand-blue/90"
              type="submit"
              disabled={updating}
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span className="mr-2">Save Changes</span>
                  <PenLine className="size-4" />
                </>
              )}
            </Button>
            <Button
              onClick={handleCancel}
              className="rounded-xl border-2 border-solid border-gray-300 bg-transparent p-5 text-gray-700 hover:bg-gray-100"
              type="button"
              disabled={updating}
            >
              <span className="mr-2">Cancel</span>
              <X className="size-4" />
            </Button>
          </div>
        </form>
      )}

      <div>
        <span className="text-xs text-[#696969]">
          (Note: Name needs to be provided as per official documents)
        </span>
      </div>
    </div>
  );
};

export default NamePanel;
