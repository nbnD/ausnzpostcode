import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

type PageIntroProps = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ breadcrumbs, eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-8 max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-coast">{eyebrow}</p>
          ) : null}
          <h1 className="mt-3 text-4xl font-black tracking-normal text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-muted">{description}</p>
        </div>
      </div>
    </section>
  );
}
