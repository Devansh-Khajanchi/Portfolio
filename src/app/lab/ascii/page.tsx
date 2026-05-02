import AsciiScene from "@/components/lab/AsciiScene";
import ScrollPrompt from "@/components/lab/ScrollPrompt";

export default function LabAsciiPage() {
  return (
    <div className="pt-[var(--height-nav)]">
      <AsciiScene />
      <ScrollPrompt />
    </div>
  );
}
