import {Dashboard} from "@/app/_components/dashboard/dashboard-employees";
import {getQueryClient} from "@/lib/react-query/client";
import {queryEmployees} from "@/data/query/query-employees";
import {queryDepartments} from "@/data/query/query-departments";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(queryEmployees());
  void queryClient.prefetchQuery(queryDepartments());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard/>
    </HydrationBoundary>
  );
}
