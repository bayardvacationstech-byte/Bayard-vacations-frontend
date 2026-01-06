"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/custom/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Minus, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import useModal from "@/hooks/useModal";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useState, useEffect } from "react";
import { storeLead } from "@/utils/firebase";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { formatDateTime } from "@/utils/itinerary";
import { trackLeadFormConversion } from "@/utils/conversion";

import { Button } from "../../ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import useToggleState from "@/hooks/useToggleState";

const LeadFormComponent = () => {
  const { isOpen, closeModal, region, setRegion } = useModal();
  const pathname = usePathname();

  const confirmationDialogControls = useToggleState();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    departureDate: "",
    numTravellers: "1",
    destination: region || "",
    departureCity: "",
    message: "",
    numDays: "1",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contactNumber: "",
    departureDate: "",
    numTravellers: "",
    destination: "",
    departureCity: "",
    numDays: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    contactNumber: false,
    departureDate: false,
    numTravellers: false,
    destination: false,
    departureCity: false,
    numDays: false,
  });

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/");
      const packageIndex = segments.findIndex(
        (segment) => segment === "packages"
      );
      if (packageIndex !== -1 && segments[packageIndex + 1]) {
        setRegion(segments[packageIndex + 1]);
      }
    }
  }, [pathname, setRegion, isOpen]);

  const validateField = (name, value) => {
    let numValue;

    switch (name) {
      case "name":
        return !value.trim() ? "Full name is required" : "";
      case "email":
        return !/^\S+@\S+\.\S+$/.test(value) ? "Valid email is required" : "";
      case "contactNumber":
        return !/^[0-9]{10}$/.test(value)
          ? "Valid 10-digit phone number is required"
          : "";
      case "departureDate":
        return !value ? "Departure date is required" : "";
      case "numTravellers":
        numValue = parseInt(value);
        return !value || numValue < 1 || numValue > 20
          ? "Number of travellers should be between 1 and 20"
          : "";
      case "numDays":
        numValue = parseInt(value);
        return !value || numValue < 1 || numValue > 25
          ? "Number of days should be between 1 and 25"
          : "";
      case "destination":
        return !value.trim() ? "Destination city is required" : "";
      case "departureCity":
        return !value.trim() ? "Departure city is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Handle number-only inputs
    if (name === "contactNumber") {
      finalValue = value.replace(/[^0-9]/g, "");
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: finalValue,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, finalValue),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name]),
    }));
  };

  const handleIncrement = (field) => {
    const currentValue = parseInt(formData[field]) || 0;
    const maxValue = field === "numTravellers" ? 20 : 25;

    if (currentValue < maxValue) {
      setFormData((prev) => ({
        ...prev,
        [field]: (currentValue + 1).toString(),
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, (currentValue + 1).toString()),
      }));
    }
  };

  const handleDecrement = (field) => {
    const currentValue = parseInt(formData[field]) || 0;

    if (currentValue > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: (currentValue - 1).toString(),
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, (currentValue - 1).toString()),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "message") {
        // Skip message validation as it's optional
        newErrors[key] = validateField(key, formData[key]);
      }
    });

    setErrors(newErrors);
    setTouched(
      Object.keys(touched).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    try {
      const response = await storeLead({
        ...formData,
        departureDate: formatDateTime(formData.departureDate),
      });

      if (response) {
        // Track Google Ads conversion
        trackLeadFormConversion();
        confirmationDialogControls.open();
      }
    } catch (error) {
      toast("Failed", {
        description: "Form submission failed. Try after sometime",
      });
    }
  };

  const closeAllModals = () => {
    confirmationDialogControls.close();
    closeModal();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeAllModals}>
      <AlertDialogContent className="h-[calc(100dvh-40px)] max-h-[660px] w-[calc(100vw-40px)] max-w-[800px] !rounded-3xl bg-[#F8F8F8] p-0">
        <AlertDialogHeader>
          <div className="flex items-center justify-between pt-4">
            <AlertDialogTitle className="text-left font-nord text-lg font-medium text-brand-blue c-md:text-2xl px-8">
              Submit an enquiry
            </AlertDialogTitle>
            <span className="flex items-center justify-center">
              <AlertDialogCancel type="button" onClick={closeAllModals}>
                <X className="!size-5 text-brand-green c-md:!size-7" />
              </AlertDialogCancel>
            </span>
          </div>
        </AlertDialogHeader>
        <form
          onSubmit={handleSubmit}
          className="text-sm overflow-y-scroll px-8 pb-6 pt-4"
        >
          <ConfirmationDialog
            controls={confirmationDialogControls}
            closeModal={closeAllModals}
          />

          <div className="mb-6 grid gap-6">
            <div className="grid gap-6 c-md:grid-cols-2">
              <div>
                <span className="mb-2 block">Full Name *</span>
                <Input
                  className="rounded-2xl border-[#B0B0B0] bg-white !p-3 text-sm shadow-none"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John Doe"
                  required
                />
                {touched.name && errors.name && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.name}
                  </small>
                )}
              </div>
              <div>
                <span className="mb-2 block">Email *</span>
                <Input
                  className="rounded-2xl border-[#B0B0B0] bg-white !p-3 text-sm shadow-none"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="johndoe@example.com"
                  required
                />
                {touched.email && errors.email && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.email}
                  </small>
                )}
              </div>
            </div>
            <div className="grid gap-6 c-md:grid-cols-2">
              <div>
                <span className="mb-2 block">Contact Number *</span>
                <div className="flex">
                  <div className="rounded-l-2xl rounded-r-none border border-r-0 border-solid border-[#B0B0B0] bg-[#F8F8F8] p-3 text-sm text-[#616161]">
                    +91
                  </div>
                  <Input
                    className="rounded-l-none rounded-r-2xl border-[#B0B0B0] bg-white !p-3 text-sm shadow-none"
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="9991110000"
                    required
                  />
                </div>
                {touched.contactNumber && errors.contactNumber && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.contactNumber}
                  </small>
                )}
              </div>
              <div>
                <span className="mb-2 block">Departure Date *</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left border-solid border border-[#B0B0B0] font-normal w-full bg-white text-[#5C5C5C] rounded-2xl text-base py-[22px]",
                        touched.departureDate &&
                          errors.departureDate &&
                          "border-red-500"
                      )}
                    >
                      {formData.departureDate ? (
                        format(new Date(formData.departureDate), "PPP")
                      ) : (
                        <span className="text-sm">Please select</span>
                      )}
                      <CalendarIcon
                        className="ml-auto !size-5"
                        strokeWidth={1.5}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="rounded-2xl p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formData.departureDate
                          ? new Date(formData.departureDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        if (date) {
                          // Adjust for timezone offset
                          const adjustedDate = new Date(
                            date.getTime() - date.getTimezoneOffset() * 60000
                          );
                          const dateStr = adjustedDate
                            .toISOString()
                            .split("T")[0];
                          setFormData((prev) => ({
                            ...prev,
                            departureDate: dateStr,
                          }));
                          setTouched((prev) => ({
                            ...prev,
                            departureDate: true,
                          }));
                          setErrors((prev) => ({
                            ...prev,
                            departureDate: validateField(
                              "departureDate",
                              dateStr
                            ),
                          }));
                        }
                      }}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
                {touched.departureDate && errors.departureDate && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.departureDate}
                  </small>
                )}
              </div>
            </div>
            <div className="grid gap-6 c-md:grid-cols-2">
              <div>
                <div className="mb-2">Number of Travellers</div>
                <div className="flex items-start">
                  <Button
                    className="h-[37.6px] rounded-l-lg rounded-r-none bg-brand-green hover:bg-brand-green-hovered c-md:h-[45.6px] c-md:rounded-l-2xl"
                    type="button"
                    onClick={() => handleDecrement("numTravellers")}
                  >
                    <Minus className="!size-4" />
                  </Button>
                  <Input
                    className="rounded-none border-[#B0B0B0] bg-white p-2 text-center text-sm shadow-none c-md:p-3"
                    type="number"
                    name="numTravellers"
                    value={formData.numTravellers}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Number of Travellers *"
                    required
                    min="1"
                    max="20"
                  />
                  <Button
                    className="h-[37.6px] rounded-l-none rounded-r-lg bg-brand-green hover:bg-brand-green-hovered c-md:h-[45.6px] c-md:rounded-r-2xl"
                    type="button"
                    onClick={() => handleIncrement("numTravellers")}
                  >
                    <Plus className="!size-4" />
                  </Button>
                </div>
                {touched.numTravellers && errors.numTravellers && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.numTravellers}
                  </small>
                )}
              </div>
              <div>
                <div className="mb-2">Number of Days</div>
                <div className="flex">
                  <Button
                    className="h-[37.6px] rounded-l-lg rounded-r-none bg-brand-green hover:bg-brand-green-hovered c-md:h-[45.6px] c-md:rounded-l-2xl"
                    type="button"
                    onClick={() => handleDecrement("numDays")}
                  >
                    <Minus className="!size-4" />
                  </Button>
                  <Input
                    className="rounded-none border-[#B0B0B0] bg-white p-2 text-center text-sm shadow-none c-md:p-3"
                    type="number"
                    name="numDays"
                    value={formData.numDays}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Number of Days *"
                    required
                    min="1"
                    max="25"
                  />
                  <Button
                    className="h-[37.6px] rounded-l-none rounded-r-lg bg-brand-green hover:bg-brand-green-hovered c-md:h-[45.6px] c-md:rounded-r-2xl"
                    type="button"
                    onClick={() => handleIncrement("numDays")}
                  >
                    <Plus className="!size-4" />
                  </Button>
                </div>
                {touched.numDays && errors.numDays && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.numDays}
                  </small>
                )}
              </div>
            </div>
            <div className="grid gap-6 c-md:grid-cols-2">
              <div>
                <span className="mb-2 block">
                  Place you&apos;re traveling to
                </span>
                <Input
                  className="rounded-2xl border-[#B0B0B0] bg-white !p-3 text-sm capitalize shadow-none"
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Destination *"
                  required
                />
                {touched.destination && errors.destination && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.destination}
                  </small>
                )}
              </div>
              <div>
                <span className="mb-2 block">Departure City *</span>
                <Input
                  className="rounded-2xl border-[#B0B0B0] bg-white !p-3 text-sm shadow-none"
                  type="text"
                  name="departureCity"
                  value={formData.departureCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="City you're leaving from"
                  required
                />
                {touched.departureCity && errors.departureCity && (
                  <small className="ml-4 mt-2 block text-red-600">
                    {errors.departureCity}
                  </small>
                )}
              </div>
            </div>
            <div>
              <span className="mb-2 block">Message (optional)</span>
              <Textarea
                className="rounded-2xl border-[#B0B0B0] bg-white !p-3 text-sm shadow-none"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Let us know more about what you want?"
              />
            </div>
          </div>
          <div className="text-center">
            <Button
              className="mt-4 rounded-full bg-brand-green px-10 py-6 text-[18px] font-medium hover:bg-brand-green-hovered"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Wrap the component with dynamic import
const LeadForm = dynamic(() => Promise.resolve(LeadFormComponent), {
  ssr: false,
});

export default LeadForm;
