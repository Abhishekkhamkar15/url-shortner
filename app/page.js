import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="bg-amber-200">
      <section className="grid grid-cols-2 h-[90vh]">
        <div className="flex flex-col gap-4 items-center justify-center">
          <p className="text-4xl font-bold ">Easy and best URL shortner</p>
          <p className="px-20">Shrink is a fast and reliable URL shortener that makes sharing links simple, smart, and efficient. Help you to fast short your Url </p>
          <div className="flex gap-2">
          <Link href="/shorten"><button className='bg-amber-700 rounded-lg shadow-lg p-4 py-1 font-bold'>Try Now</button></Link>
          <Link href="/github"><button className='bg-amber-700 rounded-lg shadow-lg p-4 py-1 font-bold'>Github</button></Link>
        </div>
        </div>
        <div className="flex justify-start relative">
          <img className="mix-blend-darken" src="best-url-shortener.png"/>
        </div>
      </section>
    </main>
  );
}
