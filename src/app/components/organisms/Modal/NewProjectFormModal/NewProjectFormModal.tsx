"use client";

import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/app/components/organisms/Modal/Modal";
import { Button } from "@/app/components/atoms/Button/Button";
import NewProject from "@/app/components/organisms/Forms/Project/NewProject";

type NewProjectFormModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewProjectFormModal = ({ open, onOpenChange }: NewProjectFormModalProps) => {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="w-full max-w-3xl max-h-[90vh] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <ModalHeader>
          <ModalTitle>Create new project</ModalTitle>
          <ModalDescription>
            Set up a new project with its first sprint.
          </ModalDescription>
        </ModalHeader>

        <NewProject isModal onSuccess={handleSuccess} />

        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="new-project-form">
            Create project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewProjectFormModal;
