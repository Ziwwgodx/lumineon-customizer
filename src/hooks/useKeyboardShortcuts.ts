import { useEffect } from 'react';

interface KeyboardShortcuts {
  onUndo?: () => void;
  onRedo?: () => void;
  onSave?: () => void;
  onFullscreen?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              shortcuts.onRedo?.();
            } else {
              e.preventDefault();
              shortcuts.onUndo?.();
            }
            break;
          case 'y':
            e.preventDefault();
            shortcuts.onRedo?.();
            break;
          case 's':
            e.preventDefault();
            shortcuts.onSave?.();
            break;
          case 'f':
            e.preventDefault();
            shortcuts.onFullscreen?.();
            break;
          case '=':
          case '+':
            e.preventDefault();
            shortcuts.onZoomIn?.();
            break;
          case '-':
            e.preventDefault();
            shortcuts.onZoomOut?.();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};