export type AccordianContent = {
  title: string;
  content: string;
};

function SingleAccordian({ data }: { data: AccordianContent }) {
  return (
    <div className="collapse collapse-arrow bg-base-100">
      <input type="radio" name={`accordian-1`} />
      <div className="collapse-title text-xl font-medium">{data.title}</div>
      <div className="collapse-content">
        <p>{data.content}</p>
      </div>
    </div>
  );
}
export default function Accordian({
  content,
}: {
  content: AccordianContent[];
}) {
  return (
    <div className="flex flex-col gap-4">
      {content.map((data, index) => (
        <SingleAccordian data={data} key={index} />
      ))}
    </div>
  );
}
