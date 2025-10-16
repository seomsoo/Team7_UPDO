export interface SelectboxProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function Selectbox({ title, subtitle, isSelected, onSelect }: SelectboxProps) {
  return (
    <label
      className={`flex h-[70px] w-full cursor-pointer gap-2 rounded-sm p-2 transition-colors md:pt-3 md:pr-5 md:pb-4 md:pl-4 ${
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
