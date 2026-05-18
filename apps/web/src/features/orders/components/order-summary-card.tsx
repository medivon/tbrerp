import { SurfaceCard } from "@thaiboran/ui";

export function OrderSummaryCard({
  label,
  value,
  helper,
}: {
  helper?: string;
  label: string;
  value: string;
}) {
  return (
    <SurfaceCard className="min-h-[96px]" padding="md">
      <p className="text-xs font-bold text-muted-foreground">{label}</p>
      <p className="mt-2 text-xl font-extrabold leading-tight text-foreground">
        {value}
      </p>
      {helper ? (
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{helper}</p>
      ) : null}
    </SurfaceCard>
  );
}
