import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import SelectFileModal from '../select-file-model/select-file-model.organism';
import { VButton } from '@components/atoms';
import DownloadTemplateFile from './download-template-file.organisms';
import { MdDownload } from 'react-icons/md';
import { Gender } from '@utils/enums';
import { saveAs } from 'file-saver';

type Props = {
  onFileChange: (file: File) => void;
};

function BulkUserUpload({ onFileChange }: Props) {
  const [isBulkUserUploadModelOpen, setIsBulkUserUploadModelOpen] = useState(false);
  const [bulkUsersFile, setBulkUsersFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const headers = [
    { header: 'First Name', prop: 'firstName', required: true },
    { header: 'Last Name', prop: 'lastName', required: true },
    { header: 'Email', prop: 'email', required: true },
    { header: 'Mobile No', prop: 'mobile', required: false },
    { header: 'Date of Birth', prop: 'dateOfBirth', required: false },
    { header: 'Gender', prop: 'gender', required: false },
    { header: 'Company', prop: 'company', required: false },
    { header: 'Company Role', prop: 'companyRole', required: false },
  ];

  const getCol = (prop: string) => headers.findIndex((h) => h.prop === prop) + 1;

  const downloadSampleUserTemplate = async () => {
    setLoading(true);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('User Template');
    const lookupSheet = workbook.addWorksheet('Mapping');
    lookupSheet.state = 'veryHidden';
    lookupSheet.getRow(1).values = ['Type', 'Name', 'ID'];

    // Add header row
    sheet.addRow(headers.map((h) => h.header));

    // Add sample row
    const dob = new Date('1990-05-15');
    sheet.addRow([
      'John',
      'Doe',
      'john.doe@example.com',
      '1234567890',
      dob,
      'Male',
      'Tech Solutions Ltd',
      'Software Engineer',
    ]);

    // Format Date of Birth column as date
    const dobCol = getCol('dateOfBirth');
    for (let i = 2; i <= 100; i++) {
      sheet.getCell(i, dobCol).numFmt = 'mm/dd/yyyy';
    }

    // Data validation: Gender
    const genderList = ['Select...', ...Object.values(Gender)].join(',');

    for (let row = 3; row <= 100; row++) {
      const col = getCol('gender');
      sheet.getCell(row, col).dataValidation = {
        type: 'list',
        formulae: [`"${genderList}"`],
        showErrorMessage: true,
        error: 'Invalid gender',
      };

      const dobCell = sheet.getCell(row, dobCol);
      dobCell.numFmt = 'dd/mm/yyyy'; // Visually show as dd/mm/yyyy
      dobCell.dataValidation = {
        type: 'date',
        operator: 'between',
        formulae: ['DATE(1900,1,1)'],
        showErrorMessage: true,
        errorTitle: 'Invalid Date Format',
        error: 'Please enter a valid date in dd/mm/yyyy format',
      };
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'sample_users_template.xlsx');
    setLoading(false);
  };

  const handleFileChange = (file: File) => {
    setBulkUsersFile(file);
    onFileChange(file);
  };

  const handleBulkSubmit = async () => {
    if (!bulkUsersFile) {
      console.error('No file selected');
      return;
    }

    const fileExtension = bulkUsersFile.name.split('.').pop()?.toLowerCase();

    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result;

      if (!result) {
        console.error('Failed to read file');
        return;
      }

      if (fileExtension === 'csv') {
        Papa.parse(result as string, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            console.log('Parsed CSV Data:', results.data);
            navigate('/preview-and-select-user', {
              state: {
                users_data_from_file: results.data,
              },
            });
          },
        });
      } else if (fileExtension === 'xlsx') {
        const workbook = XLSX.read(result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log('Parsed XLSX Data:', jsonData);
        navigate('/preview-and-select-user', {
          state: {
            users_data_from_file: jsonData,
          },
        });
      } else {
        console.error('Unsupported file format');
      }
    };

    if (fileExtension === 'csv') {
      reader.readAsText(bulkUsersFile);
    } else if (fileExtension === 'xlsx') {
      reader.readAsBinaryString(bulkUsersFile);
    }

    setIsBulkUserUploadModelOpen(false);
  };

  return (
    <div>
      <VButton variant="secondary" size="md" onClick={() => setIsBulkUserUploadModelOpen(true)}>
        Upload Bulk Users
      </VButton>

      <SelectFileModal
        onChangeFile={handleFileChange}
        name="BulkUsersFile"
        isOpen={isBulkUserUploadModelOpen}
        onClose={() => setIsBulkUserUploadModelOpen(false)}
        okButtonLabel="Preview"
        accept=".xlsx, .csv"
        okButtonDisabled={!bulkUsersFile}
        onSubmit={handleBulkSubmit}
        modalTitle="Upload Users Sheet"
        showPreview={false}
      >
        <div className="flex justify-end">
          <DownloadTemplateFile
            icon={MdDownload}
            label="Download User Template"
            onDownload={downloadSampleUserTemplate}
            isLoading={loading}
            disabled={false}
          />
        </div>
      </SelectFileModal>
    </div>
  );
}

export default BulkUserUpload;
