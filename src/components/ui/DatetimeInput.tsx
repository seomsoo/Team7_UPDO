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

  const PANEL_GAP = 8; // px gap between input and panel
  const PANEL_WIDTH = 344; // assumed panel width to clamp within viewport

  const [panelPos, setPanelPos] = useState<{ top: number; left: number } | null>(null);

  const updatePanelPosition = () => {
    if (!rootRef.current) return;
    const rect = rootRef.current.getBoundingClientRect();

    const desiredTop = Math.round(rect.bottom + PANEL_GAP);
    const maxLeft = Math.max(8, window.innerWidth - PANEL_WIDTH - 8);
    const left = Math.round(Math.min(rect.left, maxLeft));

    // Clamp bottom edge to viewport when panel height is known
    const viewportH = window.innerHeight;
    const panelH = panelRef.current?.offsetHeight ?? 0;
    let top = desiredTop;
    if (panelH > 0) {
      // ensure we keep an 8px margin from bottom/top
      top = Math.min(desiredTop, Math.max(8, viewportH - panelH - 8));
    }

    setPanelPos({ top, left });
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
    // re-measure on next frame to use actual panel height
    requestAnimationFrame(updatePanelPosition);
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
    // capture 단계에서 리스닝하여 내부 스크롤 컨테이너에서도 위치 갱신
    window.addEventListener('resize', updatePanelPosition, { passive: true });
    window.addEventListener('scroll', updatePanelPosition, { passive: true, capture: true });
    document.addEventListener('scroll', updatePanelPosition, { passive: true, capture: true });
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', updatePanelPosition as EventListener);
      window.removeEventListener('scroll', updatePanelPosition as EventListener, true);
      document.removeEventListener('scroll', updatePanelPosition as EventListener, true);
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
            className="z-[9999] max-h-[80vh] w-full rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:w-[344px]"
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
            }}
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
          document.body,
        )}
    </div>
  );
}
