export default function Abstract({
  inverted_index,
}: {
  inverted_index: { [key: string]: number[] };
}) {
  let text: string[] = [];
  Object.keys(inverted_index).forEach((k) =>
    inverted_index[k].forEach((a) => (text[a] = k)),
  );

  return (
    <div className="flex w-full flex-col md:col-span-6">
      <h2 className={`m-2 text-xl md:text-2xl`}>Abstract</h2>
      <div className="flex flex-col rounded-xl bg-gray-50 p-2">
        <div className="bg-white p-4 text-sm">{text.join(' ')}</div>
      </div>
    </div>
  );
}
