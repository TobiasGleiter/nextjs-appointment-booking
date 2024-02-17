import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { getDayForHumans } from '@/src/lib/helper/date-helper';
import NavigationLink from '../navigation/link-navigation';

export default function OpeningTimeCard({ openingTime }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <NavigationLink
            lang={'en'}
            path={`/editor/opening-time/${openingTime._id}`}
            className="hover:underline"
          >
            {getDayForHumans(openingTime.day)}
          </NavigationLink>
        </CardTitle>
        <CardDescription>
          {openingTime.open ? 'Open' : 'Closed'}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
