import Link from "next/link";

const links = [
  { link: "/reveal-img-on-link-hover", title: "reveal-img-on-link-hover" },
  { link: "/reveal-on-scroll", title: "reveal-on-scroll" },
  { link: "/loading-page-reveal", title: "loading-page-reveal" },
  { link: "/simple-counter", title: "simple-counter" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          {links.map((item) => (
            <Link key={item.title} className="underline" href={item.link}>
              {item.title}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
