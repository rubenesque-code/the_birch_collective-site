export type OrgDetails = {
  contact: Contact;
  socialMedia: SocialMedia;
};

type Contact = {
  address: string;
  phoneNumber: string;
  email: string;
};

type SocialMediaItem = {
  id: string;
  name?: string;
  link: string;
};

type SocialMedia = {
  facebook: SocialMediaItem;
  instagram: SocialMediaItem;
  linkedIn: SocialMediaItem;
};
