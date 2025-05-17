import { useLocation, useNavigate } from 'react-router-dom';
import { VTableColumn } from '../table/v-table.organism';
import { useEffect, useState } from 'react';
import { UserRequestDTO } from '@dto/request';
import { Gender } from '@utils/enums';
import Preview from '../preview/preview.organism';
import { VButton } from '@components/atoms';
import { useCreateBulkUsersMutation } from 'store/slices/user.slice';

interface Users {
  'First Name': string;
  'Last Name': string;
  Email: string;
  'Mobile No': string;
  'Date of Birth': Date;
  Gender: Gender;
  Company: string;
  'Company Role': string;
  Password: string;
}

function PreviewAndSelectUsers() {
  const location = useLocation();
  const navigate = useNavigate();
  const rawUsersData = (location.state?.users_data_from_file ?? []) as Users[];
  const [userErrors, setUserErrors] = useState<Record<string, Record<string, string>>>({});
  const [, setValidUsers] = useState<UserRequestDTO[]>([]);
  const [, setSelectedUserIds] = useState<string[]>([]);
  const [selectedUsers, setSelectedUser] = useState<UserRequestDTO[]>([]);
  const [createBulkUsers, { isLoading }] = useCreateBulkUsersMutation();

  const users_data_from_file = rawUsersData.filter((u) =>
    Object.values(u).some((val) => val !== null && val !== undefined && String(val).trim() !== '')
  );

  const columns: VTableColumn<Users>[] = [
    {
      key: 'First Name',
      label: 'First Name',
      sortable: true,
      searchable: true,
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
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Last Name'];
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
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Email'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row.Email;
      },
    },
    {
      key: 'Mobile No',
      label: 'Mobile No',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Mobile No'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Mobile No'];
      },
    },
    {
      key: 'Date of Birth',
      label: 'Date of Birth',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Date of Birth'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }

        // Check if 'Date of Birth' is a Date object
        const dobValue = row['Date of Birth'];
        let dob: Date | null = null;

        if (dobValue instanceof Date) {
          dob = dobValue; // Use the Date object directly
        } else if (typeof dobValue === 'string') {
          const [day, month, year] = dobValue.split('/').map(Number);
          dob = new Date(year, month - 1, day); // month is 0-indexed
        } else if (typeof dobValue === 'number') {
          dob = new Date((dobValue - 25569) * 86400 * 1000); // Convert Excel date to JavaScript Date
        }

        // If we have a valid date, format it
        if (dob && !isNaN(dob.getTime())) {
          const displayDay = String(dob.getDate()).padStart(2, '0');
          const displayMonth = String(dob.getMonth() + 1).padStart(2, '0'); // 1-indexed
          const displayYear = dob.getFullYear();
          return `${displayDay}/${displayMonth}/${displayYear}`;
        }

        return ''; // Return nothing if the date is invalid
      },
    },
    {
      key: 'Gender',
      label: 'Gender',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Gender'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row.Gender;
      },
    },
    {
      key: 'Company',
      label: 'Company',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Company'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row.Company;
      },
    },
    {
      key: 'Company Role',
      label: 'Company Role',
      sortable: true,
      searchable: true,
      customRender: (row) => {
        const errorMessage = userErrors[row['First Name']]?.['Company Role'];
        if (errorMessage) {
          return <div className="text-theme-negative">{errorMessage}</div>;
        }
        return row['Company Role'];
      },
    },
    {
      key: 'Password',
      label: 'Password',
      sortable: false,
      searchable: false,
      hidden: true,
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requiredFields: (keyof Users)[] = [
    'First Name',
    'Last Name',
    'Email',
    // 'Password'
  ];

  // Modify the data passed to the table to mark rows with errors
  const dataWithErrors = users_data_from_file.map((user) => {
    const errorMessage = userErrors[user['First Name']];
    if (errorMessage) {
      return {
        ...user,
        isErrorRow: true,
        errorMessage,
      };
    }
    return user;
  });

  const visibleColumns = columns.filter((col) => !col.hidden);

  const expectedHeaders = visibleColumns.map((col) => ({
    key: col.key,
    label: col.label,
  }));

  useEffect(() => {
    const errorsPerUser: Record<string, Record<string, string>> = {};
    const validUr: UserRequestDTO[] = [];

    users_data_from_file.forEach((user, index) => {
      const fieldErrors: Record<string, string> = {};

      requiredFields.forEach((key) => {
        const label = expectedHeaders.find((h) => h.key === key)?.label || key;
        const value = user[key];
        const isEmpty = value === undefined || value === null || String(value).trim() === '';
        if (isEmpty) {
          fieldErrors[key] = `${label} is required`;
        }
      });

      if (Object.keys(fieldErrors).length > 0) {
        errorsPerUser[user['First Name']] = fieldErrors;
      } else {
        validUr.push({
          id: `tmp-${index}`,
          firstName: user['First Name'],
          lastName: user['Last Name'] ?? '',
          gender: user['Gender'] as Gender,
          dateOfBirth: user['Date of Birth'] ?? '',
          email: user.Email ?? '',
          mobile: user['Mobile No'] ?? '',
          company: user.Company,
          companyRole: user['Company Role'] ?? '',
          password: user.Password,
        });
      }
    });

    setUserErrors(errorsPerUser);
    setValidUsers(validUr);
  }, [expectedHeaders, users_data_from_file, requiredFields]);

  const handleUpload = async () => {
    try {
      if (selectedUsers.length === 0) return;
      await createBulkUsers(selectedUsers).unwrap();
      navigate('/dashboard');
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      {users_data_from_file.length > 0 ? (
        <>
          <Preview<Users>
            title="Bulk Users Preview"
            data={dataWithErrors}
            columns={visibleColumns}
            getId={(u) => String(u['First Name'])}
            cellErrors={userErrors}
            isRowInvalid={(user) => {
              const key = user['First Name']; // Or your row identifier
              return !!userErrors[key]; // disable if error exists
            }}
            onSelect={(selectedIds) => {
              setSelectedUserIds(selectedIds);
              const selected = dataWithErrors.filter((u) => selectedIds.includes(String(u['First Name'])));

              const mapped: UserRequestDTO[] = selected.map((u, index) => ({
                id: `tmp-${index}`,
                firstName: u['First Name'],
                lastName: u['Last Name'] ?? '',
                gender: u.Gender ?? '',
                dateOfBirth: u['Date of Birth'] ?? '',
                email: u.Email ?? '',
                mobile: u['Mobile No'] ?? '',
                company: u.Company,
                companyRole: u['Company Role'],
                password: u.Password,
              }));

              setSelectedUser(mapped);
            }}
          />
          <div className="flex flex-row gap-5">
            <VButton variant="secondary" size="md" className="!w-[73px]" onClick={() => navigate('/dashboard')}>
              Cancel
            </VButton>
            <VButton variant="primary" size="md" className="!w-[280px]" onClick={handleUpload} isLoading={isLoading}>
              Upload Selected Users
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
