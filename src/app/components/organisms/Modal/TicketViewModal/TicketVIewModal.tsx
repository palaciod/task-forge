"use client";

import React, { useState, useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/app/components/organisms/Modal/Modal";
import { Button } from "@/app/components/atoms/Button/Button";
import TicketDetails, { type TicketDetailsHandle } from "@/app/components/organisms/Ticket/TicketDetails";

type TicketViewModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string;
  onTicketUpdated?: () => void;
};

const TicketViewModal = ({
  open,
  onOpenChange,
  ticketId,
  onTicketUpdated,
}: TicketViewModalProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const ticketDetailsRef = useRef<TicketDetailsHandle>(null);

  const handleSaveSuccess = () => {
    setIsEditMode(false);
    onTicketUpdated?.();
  };

  const handleDeleteSuccess = () => {
    onTicketUpdated?.();
    onOpenChange(false);
  };

  const handleDelete = async () => {
    await ticketDetailsRef.current?.delete();
  };

  const handleSave = async () => {
    await ticketDetailsRef.current?.save();
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    ticketDetailsRef.current?.cancelEdit();
    setIsEditMode(false);
  };

  const ticket = ticketDetailsRef.current?.ticket;
  const isDeleting = ticketDetailsRef.current?.isDeleting ?? false;
  const isSaving = ticketDetailsRef.current?.isSaving ?? false;

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <ModalHeader>
          <ModalTitle>{isEditMode ? "Edit Ticket" : "Ticket Details"}</ModalTitle>
          {ticket && !isEditMode && (
            <ModalDescription>
              Ticket #{ticket.ticketNumber} • Created{" "}
              {new Date(ticket.createdAt).toLocaleDateString()}
            </ModalDescription>
          )}
        </ModalHeader>

        <div className="py-4">
          <TicketDetails
            ref={ticketDetailsRef}
            ticketId={ticketId}
            isEditMode={isEditMode}
            onEditModeChange={setIsEditMode}
            onSaveSuccess={handleSaveSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>

        <ModalFooter className="flex justify-between">
          {isEditMode ? (
            <>
              <div />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => onOpenChange(false)}
                >
                  Close
                </Button>
                <Button onClick={handleEdit}>
                  Edit
                </Button>
              </div>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TicketViewModal;
