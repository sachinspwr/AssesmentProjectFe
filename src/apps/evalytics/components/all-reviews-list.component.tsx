import { VImage, VInput, VStatus } from "@components/atoms";
import { VTableColumn } from "@components/organisms";
import VTable from "@components/organisms/table/v-table.organism";
import { useNavigate } from "react-router-dom";

function AllReviewsList () {
    const navigate = useNavigate();
    type Review = 
    {
        id?: string;
        candidateName: string;
        reviewStatus: string;
        score?: number;
        lastActivity: Date;
        assessmentDate: Date;
    };
      
    const reviews: Review[] = [
        { candidateName: 'Jon Doe', reviewStatus: '3 questions pending', lastActivity: new Date("06/09/2024"), assessmentDate: new Date("01/09/2024")},
        { candidateName: 'William Morgan', reviewStatus: '2 questions pending', lastActivity: new Date("06/09/2024"), assessmentDate: new Date("01/09/2024")},
        { candidateName: 'Steve', reviewStatus: 'Completed', score: 90, lastActivity: new Date("06/09/2024"), assessmentDate: new Date("01/09/2024")},
        { candidateName: 'Jennifer Thomson', reviewStatus: 'Not started', lastActivity: new Date("06/09/2024"), assessmentDate: new Date("01/09/2024")},
        { candidateName: 'Jane Smith', reviewStatus: 'Completed', score: 80, lastActivity: new Date("06/09/2024"), assessmentDate: new Date("01/09/2024")},
    ];

    const columns: VTableColumn<Review>[] = [
        { 
            key: 'candidateName', 
            label: 'Candidate Name', 
            sortable: true, 
            searchable: true,
            className: 'w-[250px]',
            customRender: (row) => (<div className='flex gap-2'>
                <VImage className={'w-4 h-4 rounded-full'} src='https://placehold.co/30x30.png'/>
                <p className="font-[500] text-theme-primary">{row.candidateName}</p>
            </div>), 
        },
        {
            key: "reviewStatus",
            label: "Review Status",
            sortable: true,
            searchable: true,
            customRender: (row) => {
                const status = row.reviewStatus;
                let type: 'positive' | 'warning' | 'negative' | 'default' | 'primary' | undefined = 'default';
              
                if (status === 'Completed') type = 'positive';
                else if (status === 'Not started') type = 'negative';
                else if (status.toLowerCase().includes('pending')) type = 'warning';
              
                return (
                  <VStatus
                    label={status}
                    type={type}
                  />
                );
            }
                            
          },
          {
            key: "score",
            label: "Score",
            sortable: true,
            searchable: true,
            customRender: (row) => <span>{row.score ?? '_'}</span>
          },
          {
            key: "lastActivity",
            label: "Last Activity",
            sortable: true,
            searchable: true,
            customRender: (row) => row.lastActivity.toLocaleDateString(),
          },
          {
            key: "assessmentDate",
            label: "Assessment Date",
            sortable: true,
            searchable: true,
            customRender: (row) => row.assessmentDate.toLocaleDateString(),
          },    
    ];
    
    return(
        <>
            <VTable
                title="Reviews"
                data={reviews ?? []}
                columns={columns}
                itemsPerviewMode={8}
                emptyState={<div>No Questions Found!</div>}
                getId={(x) => x.id}
                actionsConfig={[
                    {
                        action: 'edit',
                        responder: (id?: string) => {
                          navigate('../result/detailed-result');
                        },
                    },
                    {
                        action: 'delete',
                        responder: (id?: string) => {
                          alert(id);
                        },
                    }
                ]}
                tableClassName="table-fixed w-full"
            />   
            
            </>
    )
}

export default AllReviewsList;