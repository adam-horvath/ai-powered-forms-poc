import { ChangeEvent, FormEvent, useState } from 'react';
import { z } from 'zod';
import { fetchEmailResponse } from '../utils/api';
import { CarInsurance } from './CarInsurance';
import { processEmails, processResponse } from '../utils/responseProcessor';

const nameSchema = z.string().min(2, { message: 'Enter at least 2 characters' });

export default function EmailPredictor() {
  const [name, setName] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [error, setError] = useState('');
  const [showInsurance, setShowInsurance] = useState<boolean>(false);

  const generateEmails = async (fullName: string) => {
    const [firstName, lastName] = fullName.toLowerCase().split(' ');
    if (!firstName || !lastName) return [];

    const response = await fetchEmailResponse(fullName);
    const mails = processResponse(response);
    const separateEmails = processEmails(mails);

    setEmails(separateEmails);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generateEmails(name);
    setShowInsurance(true);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowInsurance(false);
    const input = e.target.value;

    setName(input);

    const validation = nameSchema.safeParse(input);

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setEmails([]);
    } else {
      setError('');
    }
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedEmail(e.target.value);
  };

  return (
    <>
      <div className={'p-4 bg-white rounded shadow mx-5 my-3'}>
        <form onSubmit={handleSubmit}>
          <h2 className={'text-lg font-bold mb-2'}>Email Predictor</h2>
          <label>Name</label>
          <br />
          <input
            type={'text'}
            placeholder={'Enter full name'}
            value={name}
            className={'w-full p-2 border rounded'}
            onChange={onNameChange}
          />
          {error && <p className={'text-red-500 text-sm mt-1'}>{error}</p>}
        </form>
        <div className={'mt-2'}>
          <label>Email</label>
          <br />
          <input
            type={'text'}
            placeholder={'Email'}
            value={selectedEmail}
            className={'w-full p-2 border rounded'}
            onChange={onEmailChange}
          />
          <br />
          {emails
            .filter((email) => email !== selectedEmail)
            .map((email) => (
              <button
                key={email}
                className={'text-gray-700 rounded shadow p-2 cursor-pointer me-2 mt-2'}
                onClick={() => setSelectedEmail(email)}
              >
                {email}
              </button>
            ))}
        </div>
      </div>
      {showInsurance && selectedEmail && <CarInsurance name={name} />}
    </>
  );
}
