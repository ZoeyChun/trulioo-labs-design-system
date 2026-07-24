import { RelationshipGraph } from '../components/Graph/RelationshipGraph';
import { EntityDrawer } from '../components/Drawer/EntityDrawer';
import { useGraphStore } from '../store/graphStore';

export function Investigation() {
  const drawerOpen = useGraphStore((s) => s.drawerOpen);

  return (
    <div className="flex h-screen w-screen bg-surface overflow-hidden relative">
      <div className="pointer-events-none absolute inset-0 page-glow" />
      <div
        className={`relative flex-1 transition-all duration-300 ${drawerOpen ? 'mr-[420px]' : ''}`}
      >
        <RelationshipGraph />
      </div>
      <EntityDrawer />
    </div>
  );
}
