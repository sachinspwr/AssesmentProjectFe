import { AuditResponseDTO } from "./audit-response.dto";

export interface SupportDocResponseDTO extends AuditResponseDTO{
  isPublic: boolean;
  id: string;
  title: string;
  content: string;
  tags: string;
  slug: string;
  link: string;
  status:string;
  subDocs:SupportSubDocDTO[];
}

export interface SupportSubDocDTO {
  id: string;
  isPublic: boolean;
  supportDocId: string;
  title: string;
  content: string;
  tags: string;
  link: string;
  status:string;
  slug: string;
}
