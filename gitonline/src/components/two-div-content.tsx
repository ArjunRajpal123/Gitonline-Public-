export default function TwoContentBlock(props: {
    color: string;
    content1: { text: string; title: string };
    content2: { text: string; title: string };
  }) {
    return (
      <div className={"hero justify-center h-[500px] animate-fade-in" + props.color}>
        <div
          className="hero-content flex text-center w-full justify-between"
        >
          <article className="prose max-w-lg rounded-lg bg-base-200 p-4 text-primary text-left delay-[300ms] duration-[600ms] taos:translate-x-[200px] taos:opacity-0" data-taos-offset="400">
              <h2>{props.content1.title}</h2>
              <p>{props.content1.text}</p>
          </article>
          <article className="prose max-w-lg text-left rounded-lg bg-base-200 p-4 text-primary delay-[300ms] duration-[600ms] taos:translate-x-[-200px] taos:opacity-0" data-taos-offset="400">
              <h2>{props.content2.title}</h2>
              <p>{props.content2.text}</p>
          </article>
        </div>
      </div>
    );
  }
  