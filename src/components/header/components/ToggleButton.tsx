import { FC } from "react";

interface ToggleButtonProps {
  toggleBTNRef: React.RefObject<HTMLButtonElement>;
  handleToggleNav: () => void;
  isOpen: boolean;
}

const styles = {
    toggleButton: `block sm:hidden`,
}

const ToggleButton: FC<ToggleButtonProps> = ({ toggleBTNRef, handleToggleNav, isOpen }) => (
  <button
    ref={toggleBTNRef}
    onClick={handleToggleNav}
    className={`toggle_button ${styles.toggleButton}`}
  >
    {isOpen ? (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <line x1="4" y1="4" x2="20" y2="20" stroke="black" strokeWidth="2" />
        <line x1="20" y1="4" x2="4" y2="20" stroke="black" strokeWidth="2" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" width="24" height="24">
        <rect x="3" y="5" width="18" height="2" />
        <rect x="3" y="11" width="18" height="2" />
        <rect x="3" y="17" width="18" height="2" />
      </svg>
    )}
  </button>
);

export default ToggleButton;
