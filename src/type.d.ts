// Auth
interface iSignupInput {
  name: string;
  email: string;
  password: string;
  country: string;
  gender: string;
}

interface iSignUpForm extends iSignupInput {
  isTermsAccepted: boolean;
}

//UI
interface iButtonProps {
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

interface iCheckboxProps {
  containerClass?: string;
  checkboxClass?: string;
  className?: string;
  checked?: boolean;
  onCheckStateChange?: (value: boolean) => void;
  children: React.ReactNode;
  error?: string;
}

interface iFont {
  name: string;
  variants: number[];
}

interface iFormProps {
  className?: string;
  buttonClass?: string;
  title?: string;
  actionTitle?: string;
  onAction?: () => void;
  isValid?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

interface iNotificationProps {
  type: "success" | "error";
  title: string;
  message?: string;
  closeable?: boolean;
  onClose?: () => void;
}

interface iNotificationItem extends iNotificationProps {
  id: number;
}

interface iNotificationContext {
  items: iNotificationItem[];
  addNotification: (
    itemProps: iNotificationProps,
    activeTime?: number
  ) => number;
  removeNotification: (id: number) => void;
}

interface iPageProps {
  className?: string;
  children: React.ReactNode;
}

interface iRadioGroupProps {
  className?: string;
  containerClass?: string;
  items?: iRadioItem[];
  checked?: string;
  error?: string;
  onItemSelect: (value: string) => void;
}

interface iRadioItem {
  label: string;
  value: string;
}

interface iSelectItem {
  label: string;
  value: string;
}

interface iSelectProps {
  containerClass?: string;
  className?: string;
  itemsContainerClass?: string;
  itemClass?: string;
  placeholder: string;
  selected?: string;
  items: iSelectItem[];
  onItemSelect?: (value: string) => void;
  error?: string;
}

interface iTextFieldProps {
  containerClass?: string;
  className?: string;
  icon?: string;
  error?: string;
  onBlur?: () => void;
}
