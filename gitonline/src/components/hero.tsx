import FeedbackModal from "./feedback/feedbackModal";

export default function Hero(props: { text: string; title: string }) {
  return (
    <div className="hero min-h-screen bg-transparent">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl text-base-100 font-bold transition-opacity ease-in duration-700 opacity-100">{props.title}</h1>
          <p className="py-6 text-base-100 transition-opacity ease-in duration-700 opacity-100">{props.text}</p>
          <div className="flex flex-row justify-center space-x-4">
            <a href="https://forms.gle/og4hjUHiGL7DTRhn6">
              <button className="btn">Request Demo</button>
            </a>
            <FeedbackModal/>
            <a href="/api/auth/login">
              <button className="btn "> Getting Started</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
