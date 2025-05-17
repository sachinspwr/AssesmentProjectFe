import { Button, Label } from "@components/atoms";
import { useEffect, useState } from "react";
import { apiService } from "@services/api.service";
import { MatchOn, Operator } from "@utils/enums";
import { SearchRequestDTO, TestLinkRequestDTO } from "@dto/request";
import { useSearch } from "@hooks";
import { TestLinkResponseDTO } from "@dto/response";
import ExcelSelectPreview from "../select-file-model/select-file-model.organism";
import { Alert } from "@components/molecules/alert/alert.mol";
import { TestLinkType } from '@utils/enums';
import { getOptionsFromEnum } from "@utils/functions";

// Define the props interface
interface BulkUserInviteProps {
    testId: string;
}

const BulkUserInvite: React.FC<BulkUserInviteProps> = ({ testId }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [fileData, setFileData] = useState<Record<string, string>[]>([]);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [selectedTestLinkId, setSelectedTestLinkId] = useState<string | undefined>(undefined);
    const [selectedLinkType, setSelectedLinkType] = useState<string | undefined>(undefined); // State for selected link type

    // Fetch test links
    const { mutate: loadLinks, data: testLinks } = useSearch<TestLinkRequestDTO, TestLinkResponseDTO[]>('/tests/links/search');

    useEffect(() => {
        const criteria = {
            criteria: [{
                field: 'testId',
                operator: Operator.OR,
                matchOn: MatchOn.EQUAL,
                value: testId
            }],
            limit: 100,
            offset: 0,
            order: []
        } as SearchRequestDTO<TestLinkRequestDTO>;

        loadLinks(criteria);
    }, [loadLinks, testId]);

    const inviteBtn = async (): Promise<void> => {
        try {
            console.log("Invited Data : ", fileData);
            const inviteData = fileData.map((row) => ({
                testLinkId: selectedTestLinkId,
                email: row['UserEmail']?.trim(),
                firstName: row['UserFname']?.trim(),
                lastName: row['UserLname']?.trim(),
            }));
            console.log("InviteData : ", inviteData);

            // Call the API
            await apiService.post2('tests/links/invite/bulk', inviteData);
            setUploadStatus('Invitations sent successfully!');
            setShowAlert(true);
        } catch (error: any) {
            setUploadStatus(`Error sending invitations: ${error.message}`);
            console.log(`Error in sending invitation: ${error.message}`);
            setShowAlert(true);
        }
    };

    useEffect(() => {
        if (showAlert) {
            const timeoutId = setTimeout(() => {
                setShowAlert(false);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    }, [showAlert]);

    // Filter test links based on selected link type
    const filteredTestLinks = selectedLinkType 
        ? (testLinks ?? []).filter(link => link.linkType === selectedLinkType) 
        : [];

    // Filter out private test link types for the dropdown
    const linkTypeOptions = getOptionsFromEnum(TestLinkType).filter(option => option.value !== TestLinkType.Private);

    return (
        <div>
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-1/2 max-w-md">
                {showAlert && (
                    <Alert type={uploadStatus.includes('Error') ? 'error' : 'success'}>
                        {uploadStatus}
                    </Alert>
                )}
            </div>

            <div className="flex space-x-4">
                <div className="px-8 w-1/2">
                    <Label>Test Link Type</Label>
                    <select
                        className="w-full placeholder-gray-400 text-skin-theme text-md bg-skin-theme border border-gray-300 
                        focus:ring-skin-theme focus:border-skin-theme rounded-lg mt-4"
                        onChange={(e) => {
                            setSelectedLinkType(e.target.value);
                            setSelectedTestLinkId(undefined); // Reset selected test link when link type changes
                        }}
                    >
                        <option>Select an option</option>
                        {linkTypeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="px-8 w-1/2">
                    <Label>Test Links</Label>
                    <select
                        value={selectedTestLinkId}
                        className="w-full placeholder-gray-400 text-skin-theme text-md bg-skin-theme border border-gray-300 
                        focus:ring-skin-theme focus:border-skin-theme rounded-lg mb-4 mt-4"
                        onChange={(e) => {
                            setSelectedTestLinkId(e.target.value);
                            console.log(`Selected test link ID: ${e.target.value}`);
                        }}
                    >
                        <option>Select an option</option>
                        {filteredTestLinks.length > 0 ? (
                            filteredTestLinks.map((link) => (
                                <option key={link.id} value={link.id}>
                                    {link.testLinkName}
                                </option>
                            ))
                        ) : (
                            <option disabled>No options available</option>
                        )}
                    </select>
                </div>
                
            </div>

            <ExcelSelectPreview onFileChange={function (file: File): void {
                console.log('File uploaded:', file);
            }} setFileData={setFileData}/>

            <Button onClick={inviteBtn} className='w-full mt-8' label="INVITE USERS"/>
        </div>
    );
}

export default BulkUserInvite;