import Icon from "../components/Icon.jsx";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Field, Select, inputClass } from "../components/ui.jsx";
import { routers } from "../data/mock.js";

export default function NewTicketModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} size="md">
      <ModalHeader icon="ticket" title="New ticket" subtitle="We usually reply within 2 hours." onClose={onClose} />
      <ModalBody className="space-y-4">
        <Field label="Subject" required>
          <input className={inputClass} placeholder="Short summary of the problem" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Department">
            <Select defaultValue="Technical">
              <option>Technical</option>
              <option>Billing</option>
              <option>General</option>
            </Select>
          </Field>
          <Field label="Priority">
            <Select defaultValue="Medium">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </Select>
          </Field>
        </div>
        <Field label="Related router">
          <Select defaultValue="">
            <option value="">None</option>
            {routers.map((r) => (
              <option key={r.id} value={r.id}>{r.name} — {r.id}</option>
            ))}
          </Select>
        </Field>
        <Field label="Message" required>
          <div className="overflow-hidden rounded-lg border border-slate-300 dark:border-slate-700 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
            <textarea rows={5} className="block w-full resize-none px-3 py-2 text-sm outline-none placeholder:text-slate-400" placeholder="What happened? What have you tried? Any error message?" />
            <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2 py-1.5">
              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">
                <Icon name="clip" className="h-3.5 w-3.5" />
                Attach
                <input type="file" multiple className="hidden" />
              </label>
              <span className="ml-auto text-[11px] text-slate-400 dark:text-slate-500">0/2000</span>
            </div>
          </div>
        </Field>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button icon="send" onClick={onClose}>Submit ticket</Button>
      </ModalFooter>
    </Modal>
  );
}
