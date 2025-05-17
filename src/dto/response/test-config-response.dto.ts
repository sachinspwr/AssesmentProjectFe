export class TestConfigResponseDTO {
    testId: string;
    settingsUpdate: {
        createdRecords: number;
        deletedRecord: string[];
    };
    instructionsUpdate: {
        createdRecords: number;
        deletedRecord: string[];
    };
    registrationFieldsUpdate: {
        createdRecords: number;
        deletedRecord: string[];
    };
}