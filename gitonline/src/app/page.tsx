import Footer from "@/components/footer";
import DefaultNavbar from "@/components/generalNav";
import Hero from "@/components/hero";

export default async function Home() {
  return (
    <main>
      <div className="bg-gradient-to-b from-zinc-200 bg-radial-gradient">
        <DefaultNavbar />
        <Hero
          title="GitOnline"
          text="VM Powered Development Environment for GitHub Repositories."
        />
        <Footer />
      </div>
    </main>
  );
}
