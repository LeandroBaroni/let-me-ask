import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

type GetRoomsResponse = Array<{
  id: string;
  name: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3333/rooms');

      const result: GetRoomsResponse = await response.json();

      return result;
    },
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Create Room</h1>

      <div>
        {isLoading && <p>Carregando</p>}
        <div className="flex flex-col gap-1">
          {data?.map((room) => {
            return (
              <Link key={room.id} to={`/room/${room.id}`}>
                {room.name}
              </Link>
            );
          })}
        </div>
      </div>

      <Link className="my-6 underline" to="/room">
        Acessar sala
      </Link>
    </div>
  );
}
