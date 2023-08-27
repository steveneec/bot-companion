export type funcType = {
  _id: string;
  action: string;
  icon: string;
  color: string;
  goTo: string;
  description: string;
  command: string[];
  example: string[];
  extraConfig?: boolean;
  goToExtraConfig?: string;
  noConfigFoundMessage?: string;
  configFoundMessage?: string;
};

export type contactType = {
  _id?: string;
  name: string;
  email: string;
};

export type settingsType = {
  _id?: string;
  email?: string;
  emailKey?: string;
};
