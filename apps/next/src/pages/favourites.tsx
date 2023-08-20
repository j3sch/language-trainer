import { trpc } from 'src/utils/trpc';
import Footer from 'src/components/Footer';
import SidebarNavigation from 'src/components/SidebarNavigation';

export default function Favourites() {
  const { data, refetch } = trpc.translations.getHistories.useQuery();

  return (
    <div className="overflow-x-hidden h-full">
      <div className="fixed flex-1 h-full">
        <SidebarNavigation />
      </div>
      <div className="flex flex-col items-center my-20 mx-64">
        <div className="w-4/5  space-y-8 flex flex-col ">
          {/* {data && data.map((history: History) => <SolutionBox key={history.id} historyItem={history} />)} */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
