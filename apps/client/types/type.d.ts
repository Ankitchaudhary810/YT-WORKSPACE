export interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface VideoCardProps {
  id: string;
  aws_s3_url: string;
  title: string;
  description: string;
  status: string;
  dateTime: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  videoName: string;
  aws_s3_url: string;
  createdAt: string;
  updatedAt: string;
}
