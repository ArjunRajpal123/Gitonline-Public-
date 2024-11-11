export default function breadCrumbs(props: { path: string }) {
  return (
    <div className="text-sm breadcrumbs justify-center my-auto">
      <ul>
        {props.path.split("/").map((path, index) => (
          <li key={index}>{path}</li>
        ))}
      </ul>
    </div>
  );
}
