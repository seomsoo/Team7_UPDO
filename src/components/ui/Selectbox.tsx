export interface SelectboxProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Selectbox({ title, subtitle, isSelected, onSelect }: SelectboxProps) {
  return (
    <label
      className={`flex h-[70px] w-[149px] cursor-pointer gap-2 rounded-sm pt-3 pr-5 pb-4 pl-4 transition-colors ${
        isSelected ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
      <input type="checkbox" checked={isSelected} onChange={onSelect} className="checkbox" />

      <div className="flex flex-col">
        <div className="typo-body-bold">{title}</div>
        <div className="typo-xs">{subtitle}</div>
      </div>
    </label>
  );
}
