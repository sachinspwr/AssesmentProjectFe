import { Icon } from '@components/atoms';
import { Card, ProgressBar } from '@components/molecules/index';
import { formatTime } from '@utils/functions';
import { BsClock } from 'react-icons/bs';



function ResultTimeCard(){
    return( <Card className="flex-1">
    <div>
      <h3 className="font-bold text-base">TIMER</h3>
      <div className="flex items-center mb-4 gap-2">
        <Icon icon={BsClock} className="w-5 h-5 text-black" />
        <span className="text-2xl font-bold text-gray-700">Total time</span>
      </div>
      <div className="text-3xl font-bold text-gray-700 mb-4">
      {formatTime(100)} <span className="text-gray-400 text-2xl">{`/ ${formatTime(120)}`}</span>
      </div>
      <ProgressBar title="" progress={100/130*100} completed={10} outOf={130} isShowCompleted={false} />
      <div className="flex gap-40 items-center mt-3">
        {' '}
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-lg">Start time</span>
          <span className="text-black font-semibold text-xl">{formatDateTime('2024-10-01T15:36:42.000Z',"TIME")}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-lg">Date</span>
          <span className="text-black font-semibold text-xl">{formatDateTime('2024-10-01T15:36:42.000Z',"DATE")}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <span className="text-gray-400 text-lg">End time</span>
        <span className="text-black font-semibold text-xl">{formatDateTime('2024-10-01T15:36:42.000Z',"TIME")}</span>
      </div>
    </div>
  </Card>);
}


export { ResultTimeCard}



function formatDateTime(dateString: string, returnType: 'DATE' | 'TIME' | 'DATETIME'): string {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  // const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  switch (returnType) {
    case 'DATE':
      return `${year}-${month}-${day}`; // Return YYYY-MM-DD format
    case 'TIME':
      return `${hours}:${minutes}`; // Return HH:mm:ss format
    case 'DATETIME':
      return `${year}-${month}-${day} ${hours}:${minutes}`; // Return YYYY-MM-DD HH:mm:ss format
    default:
      throw new Error('Invalid returnType provided');
  }
}



