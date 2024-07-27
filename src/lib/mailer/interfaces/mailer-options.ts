type SESCredentials = {
  type: "SES";
  sesKey: string;
  sesAccessKey: string;
  sesRegion: string;
};

type SMTPCredentials = {
  type: "SMTP";
  host: string;
  port: number;
  password: string;
  username: string;
};

export interface MailerModuleOptions {
  credentials: SESCredentials | SMTPCredentials;
  previewEmail: boolean;
  retryAttempts?: number;
  templateDir: string;
  templateEngine: "ETA" | "PUG" | "HANDLEBARS";
}
