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
import { useBoardContext } from "@/app/context/BoardContext/BoardContext";

type TicketFormModalProps = {
  projectId: string;
  sprintId?: string;
};

const TicketFormModal = ({ projectId, sprintId }: TicketFormModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refetchTickets } = useBoardContext();

  const handleSuccess = async () => {
    setIsModalOpen(false);
    await refetchTickets();
  };

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
          onSuccess={handleSuccess}
        />
      </ModalContent>
    </Modal>
  );
};

export default TicketFormModal;
