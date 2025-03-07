import {DashboardEmployees} from "@/app/_components/dashboard-employees";
import {getQueryClient} from "@/lib/react-query/client";
import {queryEmployees} from "@/data/query/query-employees";
import {queryDepartments} from "@/data/query/query-departments";

export default async function Home() {

  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(queryEmployees());
  void queryClient.prefetchQuery(queryDepartments());

  return (
    <DashboardEmployees/>
  );
}
