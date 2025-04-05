import Flow from "@/components/flow";
import MainFrame from "@/components/flowComponents/mainFrame";
import GroupedTable from "@/components/groupedTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-[#101013]">
      <h1 className="text-2xl font-bold mb-5 text-white">Grouped Table Example</h1>
      <MainFrame />
    </main>
  );
}