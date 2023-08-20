import { useNavigation } from 'src/atoms/navigation';
import Settings from 'src/components/Settings';
import SidebarNavigation from 'src/components/SidebarNavigation';

interface Props {
  children: React.ReactNode;
}

export default function SidebarLayout(props: Props) {
  const [navigation] = useNavigation();

  return (
    <div className="w-full h-full flex">
      <div className="shrink-0 pr-8">
        <SidebarNavigation />
      </div>
      {props.children}
      {navigation === 'learning' && (
        <div className="shrink-0 w-96 flex justify-center">
          <Settings />
        </div>
      )}
    </div>
  );
}
