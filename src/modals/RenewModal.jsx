import { Modal, ModalHeader, ModalBody, ModalFooter, Button, StatusBadge, InfoPanel } from "../components/ui.jsx";

export default function RenewModal({ router, onClose }) {
  if (!router) return null;
  return (
    <Modal open onClose={onClose} size="md">
      <ModalHeader icon="renew" title="Renew account" subtitle="Confirm the extension details below." onClose={onClose} />
      <ModalBody className="space-y-3">
        <div className="mb-2 grid grid-cols-2 gap-4">
          <div>
            <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">User account</div>
            <div className="font-mono text-[15px] font-bold text-slate-900 dark:text-slate-100">{router.id}</div>
          </div>
          <div>
            <div className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Current status</div>
            <StatusBadge status={router.status} size="md" />
          </div>
        </div>
        <InfoPanel icon="calendar" label="Renewal period" title="Access extension" value={router.day ?? 30} unit="days" />
        <InfoPanel icon="money" label="Price" title="Charged from balance" value={router.price ?? 180} unit="BDT" />
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button icon="renew" onClick={onClose}>Renew for {router.day ?? 30} days</Button>
      </ModalFooter>
    </Modal>
  );
}
