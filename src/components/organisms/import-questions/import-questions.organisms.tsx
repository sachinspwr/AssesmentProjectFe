import { MdDownload } from 'react-icons/md';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { DifficultyLevel, QuestionType } from '../../../utils/enums';
import { useFetchSubjectsQuery } from 'store/slices/subject.slice';
import { useFetchExperienceLevelQuery } from 'store/slices/experience-level.slice';
import SelectFileModal from '../select-file-model/select-file-model.organism';
import DownloadTemplateFile from '../bulk-user-upload/download-template-file.organisms';
import { useState } from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

type Props = {
  onFileChange: (file: File) => void;
  isOpen: boolean;
  onClose: () => void;
};

function ImportQuestions({ onFileChange, isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const [bulkQuestionsFile, setBulkQuestionsFile] = useState<File | null>(null);

  const { data: subjects = [] } = useFetchSubjectsQuery();
  const { data: experience_level = [] } = useFetchExperienceLevelQuery();

  const allLoaded = subjects.length && experience_level.length;

  const headers = [
    { header: 'Question Text', prop: 'questionText', required: true },
    { header: 'Subject', prop: 'subject', required: true },
    { header: 'Subject ID', prop: 'subjectId', required: true },
    { header: 'Topic', prop: 'topic', required: true },
    { header: 'Difficulty Level', prop: 'difficultyLevel', required: true },
    { header: 'Question Type', prop: 'questionType', required: true },
    { header: 'Time Limit', prop: 'timeLimit', required: true },
    { header: 'Experience Level', prop: 'experienceLevel', required: true },
    { header: 'Experience Level ID', prop: 'experienceLevelId', required: true },
    { header: 'Marks', prop: 'marks', required: true },
    { header: 'Answer Options', prop: 'answerOptions', required: true },
    { header: 'Correct Answer', prop: 'correctAnswer', required: true },
    { header: 'Question Explanation', prop: 'questionExplanation', required: false },
    { header: 'Answer Explanation', prop: 'answerExplanation', required: false },
    { header: 'Tags', prop: 'tags', required: false },
    { header: 'Is Public', prop: 'isPublic', required: false },
  ];

  const getCol = (prop: string) => headers.findIndex((h) => h.prop === prop) + 1;

  const colToLetter = (col: number) => String.fromCharCode(64 + ((col - 1) % 26) + 1); // Supports A-Z

  const downloadSampleXLSX = async () => {
    if (!allLoaded) {
      alert('Template data is incomplete. Please wait for all data to load.');
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Questions Template');
    const lookupSheet = workbook.addWorksheet('Mapping');
    lookupSheet.state = 'veryHidden';
    lookupSheet.getRow(1).values = ['Type', 'Name', 'ID'];

    const subjectStart = 2;
    const experienceStart = subjectStart + subjects.length;

    // Fill mapping sheet
    subjects.forEach((subject, i) => {
      lookupSheet.getRow(subjectStart + i).values = ['Subject', subject.name, subject.id];
    });

    experience_level.forEach((exp, i) => {
      lookupSheet.getRow(experienceStart + i).values = ['ExperienceLevel', exp.name, exp.id];
    });

    // Define worksheet columns with ID fields hidden
    sheet.columns = headers.map((h) => ({
      header: h.header,
      key: h.prop,
      width: 25,
      hidden: h.prop.toLowerCase().endsWith('id'),
    }));

    const subjectRange = `Mapping!B${subjectStart}:C${subjectStart + subjects.length - 1}`;
    const experienceRange = `Mapping!B${experienceStart}:C${experienceStart + experience_level.length - 1}`;

    const subjectList = ['Select...', ...subjects.map((s) => s.name)].join(',');
    const difficultyList = ['Select...', ...Object.values(DifficultyLevel)].join(',');
    const typeList = ['Select...', ...Object.values(QuestionType)].join(',');
    const experienceList = ['Select...', ...experience_level.map((e) => e.name)].join(',');

    for (let row = 2; row <= 100; row++) {
      const applyValidation = (prop: string, list: string, error: string) => {
        const col = getCol(prop);
        sheet.getCell(row, col).dataValidation = {
          type: 'list',
          formulae: [`"${list}"`],
          showErrorMessage: true,
          error,
        };
      };

      const applyLookup = (fromProp: string, toProp: string, range: string) => {
        const fromCol = getCol(fromProp);
        const toCol = getCol(toProp);
        const fromLetter = colToLetter(fromCol);
        sheet.getCell(row, toCol).value = {
          formula: `=IFERROR(VLOOKUP(${fromLetter}${row},${range},2,FALSE),"")`,
        };
      };

      applyValidation('subject', subjectList, 'Invalid subject');
      applyLookup('subject', 'subjectId', subjectRange);

      applyValidation('difficultyLevel', difficultyList, 'Invalid difficulty level');
      applyValidation('questionType', typeList, 'Invalid question type');

      applyValidation('experienceLevel', experienceList, 'Invalid experience level');
      applyLookup('experienceLevel', 'experienceLevelId', experienceRange);

      applyValidation('isPublic', 'True,False', 'Invalid value for Is Public');
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, 'sample_questions_template.xlsx');
  };

  const handleBulkSubmit = async () => {
    if (!bulkQuestionsFile) {
      console.error('No file selected');
      return;
    }

    const fileExtension = bulkQuestionsFile.name.split('.').pop()?.toLowerCase();

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
            console.log('Parsed CSV Data:', results.data);
            navigate('/questions', {
              state: {
                questionsFromFile: results.data,
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
        console.log('Parsed XLSX Data:', jsonData);
        navigate('/questions', {
          state: {
            questionsFromFile: jsonData,
          },
        });
      } else {
        console.error('Unsupported file format');
      }
    };

    if (fileExtension === 'csv') {
      reader.readAsText(bulkQuestionsFile);
    } else if (fileExtension === 'xlsx') {
      reader.readAsBinaryString(bulkQuestionsFile);
    }

    onClose();
  };

  const handleFileChange = (file: File) => {
    setBulkQuestionsFile(file);
    onFileChange(file);
  };

  return (
    <div>
      <SelectFileModal
        onChangeFile={handleFileChange}
        name="questionsFile"
        isOpen={isOpen}
        onClose={onClose}
        okButtonLabel="Preview"
        accept=".xlsx, .csv"
        okButtonDisabled={!bulkQuestionsFile}
        onSubmit={handleBulkSubmit}
        modalTitle="Import Questions"
        showPreview={false}
      >
        <div className="flex justify-end">
          <DownloadTemplateFile
            icon={MdDownload}
            label="Download Template"
            onDownload={() => {
              if (!allLoaded) {
                alert('Template data is still loading. Please wait.');
                return;
              }
              downloadSampleXLSX();
            }}
            isLoading={!allLoaded}
            disabled={!allLoaded}
          />
        </div>
      </SelectFileModal>
    </div>
  );
}

export default ImportQuestions;
