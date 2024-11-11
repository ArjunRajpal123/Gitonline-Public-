import Footer from "@/components/footer";
import DefaultNavbar from "@/components/generalNav";
import Hero from "@/components/hero";

export default async function Home() {
  return (
    <main>
      <div className="bg-gradient-to-b from-zinc-200 bg-radial-gradient">
        <DefaultNavbar />
        <Hero
          title="Time to Git Online!"
          text="Introducing GitOnline, the innovative web app that not only seamlessly integrates with your GitHub repositories but also spins up a virtual machine for you to code on, all within your browser. Say goodbye to complex setup processes and hello to instant access to a fully functional coding environment."
        />
        <Footer />
      </div>
    </main>
  );
}
