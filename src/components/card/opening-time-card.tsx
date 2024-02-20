import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { getDayForHumans } from '@/src/lib/helper/date-helper';
import { OpeningTime } from '@/src/types/database/opening-time-database';
import NavigationLink from '../navigation/link-navigation';

interface OpeningTimeCardProps {
  openingTime: OpeningTime;
  sections: any;
}

export default function OpeningTimeCard({
  openingTime,
  sections,
}: OpeningTimeCardProps) {
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
          {openingTime.open ? sections.open.headline : sections.closed.headline}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
