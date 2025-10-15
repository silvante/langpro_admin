import EmptyLottie from "../lottie/Empty";
import Heading from "./Heading";

export default function PageMessage({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="w-full flex flex-col justify-between items-center space-y-5">
      <EmptyLottie />
      <div className="space-y-2 text-center text_color">
        <Heading>{title}</Heading>
        <p>{message}</p>
      </div>
    </div>
  );
}
