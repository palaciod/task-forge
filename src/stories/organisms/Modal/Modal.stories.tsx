import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/app/components/organisms/Modal/Modal";
import { Button } from "@/app/components/atoms/Button/Button";
import { ThemeProvider } from "@/app/context/ThemeProvider/ThemeProvider";

const meta: Meta<typeof Modal> = {
  title: "Organisms/Modal",
  component: Modal,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is a description of the modal content.
          </ModalDescription>
        </ModalHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Modal body content goes here.
          </p>
        </div>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Create Project</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Create New Project</ModalTitle>
          <ModalDescription>
            Add a new project to your workspace.
          </ModalDescription>
        </ModalHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              Project Name
            </label>
            <input
              id="name"
              placeholder="Enter project name"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter project description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Project</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">Delete Project</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalDescription>
            This action cannot be undone. This will permanently delete your
            project and all associated data.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Open Modal</Button>
      </ModalTrigger>
      <ModalContent showCloseButton={false}>
        <ModalHeader>
          <ModalTitle>No Close Button</ModalTitle>
          <ModalDescription>
            This modal doesn&apos;t have a close button in the corner.
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button variant="outline">Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
