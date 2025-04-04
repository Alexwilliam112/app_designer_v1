import GroupedTable from "@/components/groupedTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold mb-5">Grouped Table Example</h1>
      <GroupedTable />
    </main>
  );
}
