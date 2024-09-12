import Card from '@/components/card';
import { useParams } from '@/router/hooks';

export default function TaskAssignDetail() {
  const { id } = useParams();
  return (
    <Card>
      <p>Procedure details</p>
    </Card>
  );
}
