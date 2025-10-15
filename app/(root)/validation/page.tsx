import Logo from "@/app/(global_components)/Logo";
import ValidationForm from "./ValidationForm";

export default function ValidationPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Logo link="/validation" />
        <ValidationForm />
      </div>
    </div>
  );
}
