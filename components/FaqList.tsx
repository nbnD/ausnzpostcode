export function FaqList({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group overflow-hidden rounded-[10px] border border-border bg-white open:shadow-sm"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-navy transition hover:text-coral">
            {item.question}
            <span className="text-xs text-muted transition group-open:rotate-180">v</span>
          </summary>
          <div className="border-t border-border px-5 pb-4 pt-3 text-sm leading-6 text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
