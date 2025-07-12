import { UseRoomQuestions } from '@/http/use-room-questions';
import { QuestionItem } from './question-item';

interface QuestionListProps {
  roomId: string;
}

export function QuestionList({ roomId }: QuestionListProps) {
  const { data } = UseRoomQuestions(roomId);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semmibold text-2xl text-foreground">
          Perguntas e respotas
        </h2>
      </div>

      {data?.map((question) => {
        return <QuestionItem key={question.id} question={question} />;
      })}
    </div>
  );
}
