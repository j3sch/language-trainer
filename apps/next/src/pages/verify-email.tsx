import { InboxArrowDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Button from 'src/components/Button';

export default function VerifyEmail() {
  const { query } = useRouter();

  return (
    <div className="h-full w-full flex justify-center items-center flex-col space-y-5">
      <InboxArrowDownIcon className="h-28 w-28 text-blue-500" />
      <h1 className="text-4xl font-bold">Verify your email address</h1>
      <div className="flex items-center flex-col space-y-1">
        <p>We have sent a verification link to {query.email}.</p>
        <p>Click on the link to complete the verification process.</p>
      </div>
    </div>
  );
}
