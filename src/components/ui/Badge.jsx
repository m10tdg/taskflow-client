export default function Badge({ text, textClass, bgClass }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${textClass} ${bgClass}`}>
      {text}
    </span>
  );
}
