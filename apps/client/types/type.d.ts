interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

interface VideoCardProps {
  aws_s3_url: string;
  title: string;
  description: string;
  status: string;
  dateTime: Date;
}
