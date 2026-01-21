import { MetalPanel } from '@/components/ui/MetalPanel';
import { RivetButton } from '@/components/ui/RivetButton';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="font-label text-4xl uppercase tracking-wider text-metal-highlight mb-8">
        RT Lofi Immersive Interface
      </h1>

      <div className="grid gap-6 max-w-4xl">
        <MetalPanel variant="raised">
          <h2 className="font-label text-2xl uppercase text-warning-amber mb-4">
            Industrial Panel - Raised
          </h2>
          <p className="text-text-secondary mb-4">
            Panel with beveled edges and 3D depth effect
          </p>
          <div className="flex gap-4">
            <RivetButton size="sm">Small Button</RivetButton>
            <RivetButton size="md">Medium Button</RivetButton>
            <RivetButton size="lg">Large Button</RivetButton>
          </div>
        </MetalPanel>

        <MetalPanel variant="inset">
          <h2 className="font-label text-2xl uppercase text-info-cyan mb-4">
            Inset Panel
          </h2>
          <p className="text-text-secondary mb-4">
            Recessed panel with inner shadow
          </p>
          <div className="flex gap-4">
            <RivetButton variant="primary">Primary</RivetButton>
            <RivetButton variant="secondary">Secondary</RivetButton>
            <RivetButton variant="danger">Danger</RivetButton>
          </div>
        </MetalPanel>

        <MetalPanel variant="flat">
          <h2 className="font-label text-2xl uppercase text-success-green mb-4">
            Flat Panel
          </h2>
          <p className="text-text-secondary">
            Simple panel with minimal shadow
          </p>
        </MetalPanel>
      </div>
    </main>
  );
}
