import { VButton } from '@components/atoms';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { VTableColumn } from '@components/organisms';
import Preview from '@components/organisms/preview/preview.organism';
import { useCreateBulkUsersMutation } from 'store/slices/user.slice';
import { UserResponseDTO } from '@dto/response';

export interface ImportedUser {
    id?: string;
    'First Name': string;
    'Last Name': string;
    Email: string;
    Mobile: string;
   'Date of Birth': string;
    Gender: string;
    Company: string;
    'Company Role': string;
}
interface PreviewAndSelectUsersProps {
    users: UserResponseDTO[];
    tenantId: string;
    onImportSuccess: () => void;
    onCancel: () => void;
}

function PreviewAndSelectUsers({ users, tenantId, onImportSuccess, onCancel }: PreviewAndSelectUsersProps) {
    // const navigate = useNavigate();
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [userErrors, setUserErrors] = useState<Record<string, Record<string, string>>>({});
    const [createBulkUsers, { isLoading: isUploading }] = useCreateBulkUsersMutation();

    // Populate users after location.state is available
    const usersFromFile = useMemo(
        () =>
            users.map((user, index) => ({
                ...user,
                id: user.id ?? `tmp-${index}`,
            })),
        [users]
    );

    console.log('Received users:', users);
    console.log('Processed usersFromFile:', usersFromFile);
    console.log(usersFromFile.map(u => u.id));

    const columns: VTableColumn<ImportedUser>[] = [
        {
            key: 'First Name',
            label: 'First Name',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['First Name']]?.['First Name'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['First Name'];
            },
        },
        {
            key: 'Last Name',
            label: 'Last Name',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Last Name']]?.['Last Name'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Last Name'];
            },
        },
        {
            key: 'Email',
            label: 'Email',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Email']]?.['Email'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Email'];
            },
        },
        {
            key: 'Mobile',
            label: 'Mobile',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Mobile']]?.['Mobile'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Mobile'];
            },
        },
        {
            key: 'Date of Birth',
            label: 'Date of Birth',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Date of Birth']]?.['Date of Birth'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Date of Birth'];
            },
        },
        {
            key: 'Gender',
            label: 'Gender',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Gender']]?.['Gender'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Gender'];
            },
        },
        {
            key: 'Company',
            label: 'Company',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Company']]?.['Company'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Company'];
            },
        },
        {
            key: 'Company Role',
            label: 'Company Role',
            sortable: true,
            customRender: (row) => {
                const errorMessage = userErrors[row['Company Role']]?.['Company Role'];
                if (errorMessage) {
                    return <div className="text-theme-negative">{errorMessage}</div>;
                }
                return row['Company Role'];
            },
        },
    ];

    const requiredFields: (keyof UserResponseDTO)[] = [
        'firstName',
        'lastName',
        'email',
        'mobile',
        'dateOfBirth',
        'gender',
        'company',
        'companyRole'
    ];

    // Validate users data
    useEffect(() => {
        const errorsPerUser: Record<string, Record<string, string>> = {};

        usersFromFile.forEach((user) => {
            const fieldErrors: Record<string, string> = {};

            requiredFields.forEach((key) => {
                const value = user[key];
                const isEmpty = value === undefined || value === null || String(value).trim() === '';
                if (isEmpty) {
                    fieldErrors[key] = `${key} is required`;
                }
                if (key === 'email' && !isEmpty && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
                    fieldErrors[key] = 'Invalid email format';
                }
            });

            if (Object.keys(fieldErrors).length > 0) {
                // 🔁 Change key from email to user.id
                errorsPerUser[user.id!] = fieldErrors;
            }
        });

        setUserErrors(errorsPerUser);
    }, [usersFromFile]);


    const handleUpload = async () => {
        try {
            if (selectedUserIds.length === 0) {
                toast.error('Please select at least one user to import');
                return;
            }

            const usersToImport = usersFromFile
                .filter(user => selectedUserIds.includes(user.id!))
                .map(user => ({ ...user, tenantId }));

            await createBulkUsers(usersToImport).unwrap();
            toast.success('Users imported successfully');
            onImportSuccess();
        } catch (error) {
            toast.error((error as Error).message);
            console.error('Upload failed:', error);
        }
    };

    return (
        <div>
            {usersFromFile.length > 0 ? (
                <>
                    <Preview<UserResponseDTO>
                        title="Users Preview"
                        data={usersFromFile}
                        columns={columns}
                        getId={(u) => u.id!} 
                        cellErrors={userErrors}
                        isRowInvalid={(user) => !!userErrors[user.email!]} 
                        onSelect={(selectedIds) => {
                            setSelectedUserIds(selectedIds);

                            // Optional: Debug
                            console.log('Selected IDs:', selectedIds);

                            const selected = usersFromFile.filter((u) =>
                                selectedIds.includes(u.id!)
                            );

                            // Optional: Preview selected
                            console.log('Selected Users:', selected);
                        }}
                    />

                    <div className="w-3/12 flex flex-row gap-5 mt-4">
                        <VButton variant="secondary" className="!w-2/6" onClick={onCancel}>
                            Cancel
                        </VButton>
                        <VButton
                            variant="primary"
                            size="md"
                            onClick={handleUpload}
                            isLoading={isUploading}
                        >
                            Import Users
                        </VButton>
                    </div>
                </>
            ) : (
                <div>No Data Found.</div>
            )}
        </div>
    );
}

export default PreviewAndSelectUsers;