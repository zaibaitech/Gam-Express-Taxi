interface SummaryStatCardProps {
  title: string;
  value: string;
  helper?: string;
  icon?: string;
}

export default function SummaryStatCard({ title, value, helper, icon }: SummaryStatCardProps) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {helper ? <p className="mt-1 text-xs text-gray-500">{helper}</p> : null}
        </div>
        {icon ? (
          <span className="rounded-xl bg-gray-100 px-3 py-2 text-lg" aria-hidden>
            {icon}
          </span>
        ) : null}
      </div>
    </article>
  );
}
