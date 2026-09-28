import "./digit-counter.css";

export function DigitCounter({ value }: { value: string }) {
  const numeric = /^-?\d+(?:\.\d+)?$/.test(value) && Number.isFinite(Number(value));
  if (!numeric) return <span aria-hidden="true">{value}</span>;
  return <span aria-hidden="true" data-counter-value={value}>
    <span data-counter-static>{value}+</span>
    <span className="counter-roll" data-counter-roll>
      {[...value].map((character, index) => /\d/.test(character) ? (
        <span className="counter-digit" key={index}>
          <span className="counter-strip" data-counter-strip data-counter-target={20 + Number(character)}>
            {Array.from({ length: 21 + Number(character) }, (_, row) => <span key={row}>{row % 10}</span>)}
          </span>
        </span>
      ) : <span key={index}>{character}</span>)}
      <span>+</span>
    </span>
  </span>;
}
