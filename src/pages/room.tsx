import { Navigate, useParams } from 'react-router-dom';

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  if (!params.id) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="font-bold text-2xl">Room</h1>
        <p className="text-gray-600">This feature is coming soon!</p>
      </div>
    </div>
  );
}
