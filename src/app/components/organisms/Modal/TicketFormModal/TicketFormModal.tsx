'use client';
import React, { useState } from "react";
import { Button } from "@/app/components/atoms/Button/Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/app/components/organisms/Modal/Modal";
import TicketForm from "@/app/components/organisms/Forms/Ticket/TicketForm";

type TicketFormModalProps = {
  projectId: string;
  sprintId?: string;
};

const TicketFormModal = ({ projectId, sprintId }: TicketFormModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
      <ModalTrigger asChild>
        <Button>New Ticket</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create New Ticket</ModalTitle>
        </ModalHeader>
        <TicketForm
          projectId={projectId}
          sprintId={sprintId || ""}
          onSuccess={() => setIsModalOpen(false)}
        />
      </ModalContent>
    </Modal>
  );
};

export default TicketFormModal;
