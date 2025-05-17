class CodeEvaluateRequestDTO {
  language!: string;
  stdin!: string;
  files!: File[];
}

class File {
  name!: string;
  content!: string;
}

export { CodeEvaluateRequestDTO, File };
