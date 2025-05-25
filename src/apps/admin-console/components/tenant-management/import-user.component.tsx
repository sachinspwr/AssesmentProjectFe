import DownloadTemplateFile from '@components/organisms/bulk-user-upload/download-template-file.organisms';
import SelectFileModal from '@components/organisms/select-file-model/select-file-model.organism';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { useState } from 'react';
import { MdDownload } from 'react-icons/md';
import * as XLSX from 'xlsx';
import { UserResponseDTO } from '@dto/response/user-response.dto';

interface ImportUsersProps {
    isOpen: boolean;
    onClose: () => void;
    onFileChange: (parsedUsers: UserResponseDTO[]) => void;
    tenantId: string;
}

function ImportUsers({ onFileChange, isOpen, onClose }: ImportUsersProps) {
    const [bulkUsersFile, setBulkUsersFile] = useState<File | null>(null);

    const headers = [
        { header: 'First Name', prop: 'firstName', required: true },
        { header: 'Last Name', prop: 'lastName', required: true },
        { header: 'Email', prop: 'email', required: true },
        { header: 'Mobile', prop: 'mobile', required: true },
        { header: 'Date of Birth', prop: 'dateOfBirth', required: true },
        { header: 'Gender', prop: 'gender', required: true },
        { header: 'Company', prop: 'company', required: true },
        { header: 'Company Role', prop: 'companyRole', required: true },
    ];

    const getCol = (prop: string) => headers.findIndex((h) => h.prop === prop) + 1;
    // const colToLetter = (col: number) => String.fromCharCode(64 + ((col - 1) % 26) + 1);

    const downloadSampleXLSX = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Users Template');

        sheet.columns = headers.map((h) => ({
            header: h.header,
            key: h.prop,
            width: 25,
        }));

        // Add sample row
        sheet.addRow({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            mobile: '+1234567890',
            dateOfBirth: '1990-01-01',
            gender: 'Male',
            company: 'Acme Inc',
            companyRole: 'Manager'
        });

        // Add data validation for gender
        for (let row = 2; row <= 100; row++) {
            const genderCol = getCol('gender');
            sheet.getCell(row, genderCol).dataValidation = {
                type: 'list',
                formulae: ['"Male,Female,Other"'],
                showErrorMessage: true,
                error: 'Invalid gender value',
            };
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        saveAs(blob, 'sample_users_template.xlsx');
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
                        const parsed = results.data as UserResponseDTO[];
                        onFileChange(parsed);
                    },
                });
            } else if (fileExtension === 'xlsx') {
                const workbook = XLSX.read(result, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet) as UserResponseDTO[];
                onFileChange(jsonData);
            } else {
                console.error('Unsupported file format');
            }
        };

        if (fileExtension === 'csv') {
            reader.readAsText(bulkUsersFile);
        } else if (fileExtension === 'xlsx') {
            reader.readAsBinaryString(bulkUsersFile);
        }

        onClose();
    };

    const handleFileChange = (file: File) => {
        setBulkUsersFile(file);
        onFileChange(file);
    };

    return (
        <div>
            <SelectFileModal
                onChangeFile={handleFileChange}
                name="usersFile"
                isOpen={isOpen}
                onClose={onClose}
                okButtonLabel="Preview"
                accept=".xlsx, .csv"
                okButtonDisabled={!bulkUsersFile}
                onSubmit={handleBulkSubmit}
                modalTitle="Import Users"
                showPreview={false}
            >
                <div className="flex justify-end">
                    <DownloadTemplateFile
                        icon={MdDownload}
                        label="Download Template"
                        onDownload={downloadSampleXLSX}
                        isLoading={false}
                        disabled={false}
                    />
                </div>
            </SelectFileModal>
        </div>
    );
}

export default ImportUsers;