import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  link?: string;
}

export default function Logo({ link }: LogoProps) {
  return (
    <Link href={link ? link : "/"}>
      <Image
        src={"/icons/logo.svg"}
        alt="Logotype svolve"
        width={140}
        height={38.5}
      />
    </Link>
  );
}
