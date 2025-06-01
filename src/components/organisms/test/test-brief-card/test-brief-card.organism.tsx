import { Chip, Icon, Label } from '@components/atoms';
import { IConWithLabel } from '@components/molecules/index';
import { TestResponseDTO } from '@dto/response';
import { formatReadableTime, tryParseJson } from '@utils/functions';
import { FaRegClock } from 'react-icons/fa';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { BsArrowRightCircle } from 'react-icons/bs'; // Import navigation icon
import { Link, useNavigate } from 'react-router-dom';
import { MdRestartAlt, MdScore } from 'react-icons/md';
import { FaGlobe, FaUserTie } from 'react-icons/fa6';
import { useLoggedInUser } from '@hooks';
import { ToolTip } from '@components/molecules/tool-tip/tool-tip.mol';
import { ImUser } from 'react-icons/im';

type TestBriefCardProps = DefaultProps & {
  test: TestResponseDTO;
  onClick?: (testId: string) => void;
};

function TestBriefCard({ test, className, onClick }: TestBriefCardProps) {
  const navigate = useNavigate();
  const { id: userId } = useLoggedInUser();
  const {
    id,
    title,
    testQuestionFormat,
    description,
    durationInMinutes,
    cutoffScore,
    maxScore,
    tags,
    isPublic,
    createdById,
  } = test;
  const isTrending = tryParseJson<string[]>(tags!)?.includes('trending');

  return (
    <div
      className={`w-full p-4 flex flex-col justify-around h-[145px] bg-skin-theme shadow-sm border border-skin-theme rounded-md 
                hover:bg-skin-theme-hover hover:cursor-pointer ${className}`}
      onClick={() => onClick && onClick(id)}
    >
      <div className="flex justify-between items-center">
        <Label className="flex items-center gap-2 text-lg text-skin-theme flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </Label>
        {isTrending && <Chip type="success" label="trending" className="ml-2" />}

        {isPublic ? (
          createdById === userId ? (
              <Icon icon={FaGlobe} size={16} className="opacity-50" title="Public Test" />
          ) : (
            <Icon icon={FaGlobe} size={16} className="opacity-50" title="Public Test" />
          )
        ) : (
          <Icon icon={FaUserTie} size={14} className="opacity-50" title="Created by You" />
        )}
        <Link to={`${id}/details`} className="flex">
          <ToolTip content="View Details">
            <Icon icon={BsArrowRightCircle} className="text-skin-theme text-lg ml-2" />
          </ToolTip>
        </Link>
      </div>

      <p className="pt-3 text-skin-theme-dark text-sm overflow-hidden whitespace-nowrap text-ellipsis tracking-wide">
        {description}
      </p>

      <div className=" flex justify-start items-center text-md gap-5 mt-auto">
        <IConWithLabel icon={FaRegClock} size={15} label={formatReadableTime(durationInMinutes)} />
        <IConWithLabel icon={VscTypeHierarchySub} size={15} label={testQuestionFormat} />
        <IConWithLabel icon={MdScore} size={15} label={`${cutoffScore}/${maxScore}`} />
        {/* <IConWithLabel icon={IoPricetagsOutline} size={15} label={tags ? tryParseJson<string[]>(tags)?.join(', ') : 'No Tags'} /> */}
        <ToolTip content="Give Test">
          <IConWithLabel icon={MdRestartAlt} className=" text-lg" onClick={() => navigate(`/test-runner/test/${id}`)} />
        </ToolTip>
        <ToolTip content="Invite">
          <IConWithLabel icon={ImUser} size={22} className=" text-lg " onClick={() => {}} />
        </ToolTip>
      </div>
    </div>
  );
}

export { TestBriefCard };
