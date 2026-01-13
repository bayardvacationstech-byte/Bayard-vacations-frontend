"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import useModal from "@/hooks/useModal";
import dynamic from "next/dynamic";

import ConfirmationDialog from "./ConfirmationDialog";
import useToggleState from "@/hooks/useToggleState";
import EnquiryFormFields from "./EnquiryFormFields";

function LeadFormComponent() {
  const { isOpen, closeModal, region } = useModal();
  const confirmationDialogControls = useToggleState();

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
        
        <div className="overflow-y-scroll">
          <ConfirmationDialog
            controls={confirmationDialogControls}
            closeModal={closeAllModals}
          />
          <EnquiryFormFields 
            variant="modal"
            initialData={{ destination: region }} 
            onSuccess={() => confirmationDialogControls.open()} 
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Wrap the component with dynamic import
const LeadForm = dynamic(() => Promise.resolve(LeadFormComponent), {
  ssr: false,
});

export default LeadForm;
