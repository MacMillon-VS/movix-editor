import { useEffect } from "react";

// Define a type for keyboard shortcuts
type Shortcut = {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
};

// Custom hook for handling keyboard shortcuts
function useKeyboardShortcuts(shortcuts: Record<string, Shortcut>) {
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      for (const shortcutKey in shortcuts) {
        const shortcut = shortcuts[shortcutKey];

        if (
          event.key === shortcut.key &&
          (!shortcut.ctrlKey || event.ctrlKey) &&
          (!shortcut.altKey || event.altKey) &&
          (!shortcut.shiftKey || event.shiftKey)
        ) {
          shortcut.action();
          event.preventDefault();
        }
      }
    }

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [shortcuts]);

  return null; // This hook doesn't render anything
}

export default useKeyboardShortcuts;
