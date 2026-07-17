export function LocalityPostcodeLabel({ name, postcode }: { name: string; postcode: string }) {
  return (
    <>
      <span>{name}</span>
      <span className="whitespace-nowrap text-xs font-normal text-muted">{" · "}{postcode}</span>
    </>
  );
}
