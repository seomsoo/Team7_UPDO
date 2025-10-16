import GroupCard from '@/components/feature/group/GroupCard';
import { mockGatherings } from '@/mocks/gatherings';

export default function GatheringPage() {
  return (
    <div className="">
      <div className="mx-auto flex flex-col items-center gap-6 md:grid md:grid-cols-2">
        {mockGatherings.map(item => (
          <GroupCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}
