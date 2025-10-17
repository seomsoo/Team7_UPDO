'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import Icon from './Icon';
import { Calendar } from './Calendar';
import { Input } from './Input';

interface DatetimeInputProps {
  value: string;
  onChange: (nextValue: string | null) => void;
  blockPast?: boolean;
}

export default function DatetimeInput({ value, onChange, blockPast = false }: DatetimeInputProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  const updatePanelPosition = () => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();
    setPanelPos({
      top: Math.round(rect.bottom + 2),
      left: Math.round(rect.left),
    });
  };

  const formatToDisplay = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h24 = date.getHours();
    const ampm = h24 >= 12 ? 'PM' : 'AM';
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12; // 0 또는 24시는 12로
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${y}-${m}-${d} ${h12}:${min} ${ampm}`;
  };

  const formatDateOnly = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const parseFromDisplay = (s: string): Date | undefined => {
    if (!s) return undefined;
    const m = s.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{1,2}):(\d{2}) (AM|PM)$/);
    if (!m) return undefined;
    const [, yy, mm, dd, hh, mi, ap] = m;
    let h = parseInt(hh, 10) % 12;
    if (ap === 'PM') h += 12;
    const d = new Date();
    d.setFullYear(parseInt(yy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10));
    d.setHours(h, parseInt(mi, 10), 0, 0);
    return d;
  };

  const selectedDate = parseFromDisplay(value);

  useEffect(() => {
    if (!open) return;
    updatePanelPosition();
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!rootRef.current) return;
      if (panelRef.current?.contains(t) || rootRef.current.contains(t)) return;
      setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', updatePanelPosition, { passive: true });
    window.addEventListener('scroll', updatePanelPosition, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', updatePanelPosition);
      window.removeEventListener('scroll', updatePanelPosition);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <Input
        value={value}
        rightSlot={<Icon name="calendar" onClick={() => setOpen(prev => !prev)} />}
        className="typo-base"
        readOnly
        disableFocusStyle
      />
      {open &&
        panelPos &&
        createPortal(
          <div
            ref={panelRef}
            className="z-[9999] max-h-[80vh] rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            style={
              window.matchMedia('(min-width: 768px)').matches
                ? {
                    position: 'absolute',
                    top: (() => {
                      const host = document.getElementById('create-group-modal');
                      if (!host) return panelPos.top;
                      const hostTop = host.getBoundingClientRect().top;
                      return panelPos.top - hostTop + 34;
                    })(),
                    left: panelPos.left,
                  }
                : { position: 'fixed', bottom: 0, left: 0, right: 0 }
            }
            role="dialog"
            aria-modal="true">
            <Calendar
              value={selectedDate}
              variant="datetime"
              blockPast={blockPast}
              onNext={dateOnly => {
                if (dateOnly) onChange(formatDateOnly(dateOnly));
              }}
              onConfirm={finalDate => {
                if (finalDate) onChange(formatToDisplay(finalDate));
                setOpen(false);
              }}
              onCancel={() => setOpen(false)}
            />
          </div>,
          document.getElementById('create-group-modal') ?? document.body,
        )}
    </div>
  );
}
