import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon, faApple, faUber } from '@fortawesome/free-brands-svg-icons';
import { faBullseye, faMugHot, faStore } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const iconMap: Record<string, IconDefinition> = {
  amazon: faAmazon,
  apple: faApple,
  bullseye: faBullseye,
  mug: faMugHot,
  store: faStore,
  uber: faUber,
};

type TransactionIconProps = {
  icon: string;
  background: string;
  label: string;
};

export function TransactionIcon({ icon, background, label }: TransactionIconProps) {
  return (
    <span className="transaction-icon" style={{ background }} aria-label={`${label} icon`}>
      <FontAwesomeIcon icon={iconMap[icon] ?? faStore} />
    </span>
  );
}
