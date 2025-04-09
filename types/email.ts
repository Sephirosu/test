export interface EmailStat {
  email: string;
  count: number;
}

export interface EmailSelectorProps {
  emails: string[];
  selected: string[];
  onSelect: (email: string) => void;
  onRemove: (email: string) => void;
  onSend: () => Promise<void>;
  isSending: boolean;
}

export interface SelectedEmailsListProps {
  selected: string[];
  showAllSelected: boolean;
  onRemove: (email: string) => void;
  onToggleShow: () => void;
}

export interface SendButtonProps {
  onSend: () => Promise<void>;
  isSending: boolean;
  disabled: boolean;
  minRequired: number;
}

export interface EmailInputProps {
  onAddEmail: (email: string) => Promise<boolean>;
}

export interface EmailDropdownProps {
  emails: string[];
  selected: string[];
  onChange: (email: string, checked: boolean) => void;
  onClose: () => void;
}

export interface ResultsTableProps {
  results: EmailStat[];
}
